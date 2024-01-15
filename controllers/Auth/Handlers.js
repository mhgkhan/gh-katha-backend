import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


import UserAccountModel from "../../Models/UserAccount.js";
import { checkIfuserExists, postDataValidation } from "../../middlewares/utilityFunctions.js";
class handleAuthRoutes {


    /************
     * HANDLER-1
     * * SIGNUP HANDLER 
     * *** CHECKING THE USER CREDIENTIALS VALID OR NOT 
     * *** CHECKING IF USER IS ALREADY EXISTS OR NOT 
     * *** CHECKING THE USER VALUES ARE ALREADY EXISTS OR NEW
     * *** CONVERT THE USER PASSWORD FROM TEXT TO ENCRYPT USING BCRYPTJS
     * *** CREATING TOKEN FROM JSONWEBTOKEN
     * *** SAVING NEW USER CREDIENTIALS TO MONGO DATABASE
     * SEND RESPONSE *
     */
    static handleSignup = async (req, res) => {
        try {
            let { cnic, email, phone, password, confirmpassword } = req.body;
            const checkValidation = postDataValidation([cnic, email, password]);
            const cryptoRandom = crypto.randomBytes(2).toString("hex");

            if (password === confirmpassword) {
                if (!checkValidation) return res.status(400).json({ success: false, message: "All fields are required.." })
                else {
                    const checkUserExists = await checkIfuserExists(cnic);
                    // console.log(checkUserExists);

                    if (!checkUserExists.status) {
                        // console.log("1")
                        let newPassword = await bcrypt.hash(req.body.password, 10);
                        const username = `${email.substring(0, email.indexOf("@"))}-${cryptoRandom}`;
                        // console.log("username", username, "password = ", password)

                        const addingData = new UserAccountModel({ username, cnic, phone, email, password:newPassword })
                        try {
                            await addingData.save();
                        } catch (error) {
                            if (error.message?.substring(0, 26) == "E11000 duplicate key error") {
                                return res.status(401).json({ success: false, message: "your values is already exists try to use different one.." })
                            }
                            else {
                                return res.status(401).json({ success: false, message: `Error: ${error.message}` })
                            }
                        }
                        const cnicToken = { cnic: cnic, password: newPassword }

                        const token = JWT.sign(cnicToken, process.env.SECRET_KEY_LOCAL)
                        return res.status(200).json({ success: true, message: "Singup sucessfull", token: token });
                    }
                    else {
                        return res.status(400).json({ success: false, message: "user already exists" })
                    }
                }
            }
            else return res.status(400).json({ success: false, message: "confirm password not matched.." })

        } catch (error) {
            return res.status(500).json({ success: false, message: JSON.stringify(error) })
        }
    }




    /************
    * HANDLER-2
    * * SIGNIN (LOGIN) HANDLER 
    * *** CHECKING THE USER CREDIENTIALS VALID OR NOT 
    * *** CHECKING IF USER IS EXISTS OR NOT 
    * *** COMPARING THE USER TEXT PASSWORD WITH BCRYPTJS (DECRYPTING)
    * *** CREATING TOKEN FROM JSONWEBTOKEN
    * SEND RESPONSE *
    */

    static handleSignin = async (req, res) => {
        try {

            const { cnic, password } = req.body;

            const checkValidation = postDataValidation([cnic, password]);
            if (!checkValidation) return res.status(400).json({ success: false, message: "All fields are required.." })
            else {

                const checkUserExists = await checkIfuserExists(cnic);

                if (checkUserExists.status) {
                    const decryptPassword = await bcrypt.compare(password, checkUserExists.user.password);
                    // console.log('the password is ', decryptPassword);

                    if (decryptPassword) {
                        const cnicToken = {
                            cnic: checkUserExists.user.cnic,
                            password: checkUserExists.password
                        }
                        const token = JWT.sign(cnicToken, process.env.SECRET_KEY_LOCAL)
                        return res.status(200).json({ success: true, message: "Signin sucessfull", token: token });
                    }
                    else return res.status(401).json({ success: false, message: "Incorrect password" })
                }

                else return res.status(401).json({ success: false, message: "User not exists" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: JSON.stringify(error) });
        }
    }




    static handleCheck = async (req, res) => {
        try {
            let token;
            req.headers['token'] ? token = req.headers['token'] : res.status(401).json({ success: false })
            // console.log(token)
            const checKingToken = JWT.verify(token, process.env.SECRET_KEY_LOCAL);
            const {cnic} = checKingToken;

            const checkingCnic = await checkIfuserExists(cnic);


            if(checkingCnic.status) return res.status(200).json({success:true,cnic:cnic});
            else{
                return res.status(401).json({success:false})
            }





        } catch (error) {
            return res.status(500).json({ success: false })
        }
    }






}
export default handleAuthRoutes