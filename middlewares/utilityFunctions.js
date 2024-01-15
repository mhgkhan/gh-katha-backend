import UserAccountModel from "../Models/UserAccount.js";

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





