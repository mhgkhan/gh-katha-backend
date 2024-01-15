import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


import UserAccountModel from "../../Models/UserAccount.js";
import { checkIfuserExists, postDataValidation } from "../../middlewares/utilityFunctions.js";
class handleAuthRoutes {

    static handleSignup = async (req, res) => {
        try {
            let { cnic, email, phone, password, confirmpassword } = req.body;
            const checkValidation = postDataValidation([cnic, email, password]);
            const cryptoRandom = crypto.randomBytes(2).toString("hex");

            if (password === confirmpassword) {
                if (!checkValidation) return res.status(401).json({ success: false, message: "All fields are required.." })
                else {
                    const checkUserExists = await checkIfuserExists(cnic);
                    // console.log(checkUserExists);

                    if (!checkUserExists.status) {
                        // console.log("1")
                        let password = await bcrypt.hash(req.body.password, 10);
                        const username = `${email.substring(0, email.indexOf("@"))}-${cryptoRandom}`;
                        // console.log("username", username, "password = ", password)

                        const addingData = new UserAccountModel({ username, cnic, phone, email, password })
                        await addingData.save();
                        const cnicToken = { cnic: cnic }

                        const token = JWT.sign(cnicToken, process.env.SECRET_KEY_LOCAL)
                        return res.status(200).json({ success: true, message: "Singup sucessfull", token: token });
                    }
                    else {
                        return res.status(400).json({ success: false, message: "user already exists" })
                    }
                }
            }
            else return res.status(401).json({ success: false, message: "confirm password not matched.." })

        } catch (error) {
            return res.status(500).json({ success: false, message: JSON.stringify(error) })
        }
    }



    static handleSignin = async (req, res) => {
        try {

            const { cnic, password } = req.body;

            const checkValidation = postDataValidation([cnic, password]);
            if (!checkValidation) return res.status(401).json({ success: false, message: "All fields are required.." })
            else {

                const checkUserExists = await checkIfuserExists(cnic);
                // console.log("the response is ", checkUserExists);
                // console.log(checkUserExists.status)
                if (checkUserExists.status) {
                    const decryptPassword = await bcrypt.compare(password, checkUserExists.user.password);
                    // console.log('the password is ', decryptPassword);

                    if (decryptPassword) {
                        const cnicToken = {
                            cnic: checkUserExists.user.cnic
                        }
                        const token = JWT.sign(cnicToken, process.env.SECRET_KEY_LOCAL)
                        return res.status(200).json({ success: true, message: "Signin sucessfull", token: token });
                    }
                    else return res.status(401).json({ success: false, message: "Incorrect password" })
                }

                else return res.status(200).json({ success: false, message: "User not exists" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: JSON.stringify(error) });
        }
    }

}
export default handleAuthRoutes