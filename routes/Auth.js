import express from 'express';
import handleAuthRoutes from '../controllers/Auth/Handlers.js';
import { checkIsUserAuthorized } from '../middlewares/MiddleWareFunctions.js';
const AuthRouter = express.Router();


AuthRouter.get("/check", handleAuthRoutes.handleCheck);
AuthRouter.get("/checkprofile/", checkIsUserAuthorized, handleAuthRoutes.checkProfile)
AuthRouter.put("/updateuserinfo/", checkIsUserAuthorized, handleAuthRoutes.updateUserInfo)

AuthRouter.post("/signup", handleAuthRoutes.handleSignup);
AuthRouter.post("/signin", handleAuthRoutes.handleSignin);





export default AuthRouter;