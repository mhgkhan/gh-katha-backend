import UserAccountModel from "../Models/UserAccount.js";
import JWT from 'jsonwebtoken';


export const postDataValidation = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length < 1) {
            return false
        }
        else {
            return true
        }
    }
}


export const checkIfuserExists = async (cnic) => {
    try {
        // console.log(cnic)
        const checkIng = await UserAccountModel.findOne({ cnic: cnic });
        // console.log(checkIng)
        if (checkIng == null || checkIng == "null" || checkIng.cnic.length < 5) return false
        else {
            return {
                status: true,
                user: checkIng
            }
        }
    } catch (error) {
        return {
            status: false,
            user: null
        }
    }
}




export const checkJWTandeCheckIsValid = async (token) => {
    try {
        
        const checKingToken = JWT.verify(token, process.env.SECRET_KEY_LOCAL);
        const { cnic } = checKingToken;

        const checkingCnic = await checkIfuserExists(cnic);

        if (checkingCnic.status) {
            if (cnic == checkingCnic.user.cnic) {
                return {
                    status: true,
                    cnic: cnic
                };
            }
            else {
                return {
                    status: false
                }
            }
        }
        else {
            return { status: false }
        }

    } catch (error) {
        return { status: false }
    }
}

