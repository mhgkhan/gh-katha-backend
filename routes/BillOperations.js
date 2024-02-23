import express from 'express';
import { checkIsUserAuthorized } from '../middlewares/MiddleWareFunctions.js';
import BillOperations from '../controllers/BillOperations/BillOperationsHandlers.js';
const BillOperationRouter = express.Router();

BillOperationRouter.get("/open/:billid", checkIsUserAuthorized , BillOperations.openBill)


export default BillOperationRouter;