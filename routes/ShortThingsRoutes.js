import expresss from 'express';
import fetchShorts from '../controllers/getInfo/FetchShorts.js';
import { checkIsUserAuthorized } from '../middlewares/MiddleWareFunctions.js';

const ShortThingsRouter = expresss.Router()

ShortThingsRouter.get("/fetchuserareas", checkIsUserAuthorized,fetchShorts.handleFetchUniqueAreas)

export default ShortThingsRouter;