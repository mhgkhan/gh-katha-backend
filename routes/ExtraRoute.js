import express from 'express';
import ExtraRoutesHanlders from '../controllers/ExtraRoutesHandlers.js';
const ExtraRouter = express.Router();


ExtraRouter.post("/postcontactus/", ExtraRoutesHanlders.handleContacts);


export default ExtraRouter;
