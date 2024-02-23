import express from 'express';
import KathasPostHandlers from '../controllers/kathaOperattions/PostHandler.js';
import { checkIsUserAuthorized } from '../middlewares/MiddleWareFunctions.js';
import GetKatha from '../controllers/kathaOperattions/GetKathas.js';
import DeleteInKhatas from '../controllers/kathaOperattions/DeleteKathas.js';
import UpdateKathas from '../controllers/kathaOperattions/UpdateKathas.js';

const KathaOperationssRouter = express.Router();

KathaOperationssRouter.get("/katha/:id", checkIsUserAuthorized, GetKatha.getKathaInfo);

KathaOperationssRouter.post("/createkatha/", checkIsUserAuthorized, KathasPostHandlers.createKathaHandler);

KathaOperationssRouter.post("/addnewbill/", checkIsUserAuthorized, KathasPostHandlers.addNewBill)

KathaOperationssRouter.delete("/del/katha/:kathaid", checkIsUserAuthorized, DeleteInKhatas.delKatha );

KathaOperationssRouter.put("/edit/katha/:kathaid", checkIsUserAuthorized, UpdateKathas.updateKatha );


export default KathaOperationssRouter;