import { checkJWTandeCheckIsValid } from './utilityFunctions.js';

export const checkIsUserAuthorized = async (req, res, next) => {
    try {

        let token;
        try {
            req.headers['token'] ? token = req.headers['token'] : res.status(401).json({ succcess: false, message: "user is unauthorized." })
        } catch (error) {
            return res.status(401).json({succcess:false,message:"user is unauthorized.."})
        }

        if (token.length < 30) return res.status(401).json({ succcess: false, message: "invilid token" })
        else {
            const checkingUserToken = await checkJWTandeCheckIsValid(token);
            if (checkingUserToken.status) {
                req.userCnic = checkingUserToken.cnic
                next();
            }
            else return res.status(401).json({ succcess: false, message: "User is not authorized.." })
        }
    } catch (error) {
        return res.status(500).json({ succcess: false, message: "Internal Server Error #JWT MIDDLEWARE" })
    }
}
