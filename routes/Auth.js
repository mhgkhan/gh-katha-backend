import express from 'express';
import handleAuthRoutes from '../controllers/Auth/Handlers.js';
const AuthRouter = express.Router();

AuthRouter.post("/signup", handleAuthRoutes.handleSignup);
AuthRouter.post("/signin", handleAuthRoutes.handleSignin);

AuthRouter.get("/check", handleAuthRoutes.handleCheck);




export default AuthRouter;