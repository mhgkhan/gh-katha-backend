import express from 'express';
import handleAuthRoutes from '../controllers/Auth/Handlers.js';
const AuthRouter = express.Router();


AuthRouter.get("/check", handleAuthRoutes.handleCheck);

AuthRouter.post("/signup", handleAuthRoutes.handleSignup);
AuthRouter.post("/signin", handleAuthRoutes.handleSignin);





export default AuthRouter;