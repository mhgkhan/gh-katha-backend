import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();

// imports 
import connectToDb from './db/ConnectionDB.js';
import SMH from './controllers/StartMiddleWareHandler.js';

// imported routes 
import getApiRoutes from './routes/getApiRoutes.js';
import AuthRouter from './routes/Auth.js';
import ExtraRouter from './routes/ExtraRoute.js';


const PORT = process.env.PORT || 4000;

const DBURI = app.get("env") == "development" ? process.env.DBURILOCAL : process.env.DBURIPROD;



app.use(express.json());
app.use(cors())
connectToDb(DBURI);


app.use((req, res, next) => SMH(req, res, next));


// ROUTES 
app.use("/api/get/", getApiRoutes);
app.use("/api/auth", AuthRouter);
app.use("/api/extra/", ExtraRouter);




app.listen(PORT, () => console.log(`ON LOCAL SERVER CHECK :  http://localhost:${PORT}/api/get\nON PRODUCTION SERVER  :  https://commingsoon.com/don'tclickit`))