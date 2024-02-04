import express from 'express';
import { checkIsUserAuthorized } from '../middlewares/MiddleWareFunctions.js';
import sendInfoHandlers from '../controllers/getInfo/SendInfoHandlers.js';
const getApiRoutes = express.Router();



getApiRoutes.get("/getkathas/", checkIsUserAuthorized, sendInfoHandlers.getKathasHandler);

getApiRoutes.get("/gethistory/:id", checkIsUserAuthorized, sendInfoHandlers.getKathasHistory)








export default getApiRoutes;