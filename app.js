import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

// imports 
import getApiRoutes from './routes/getApiRoutes.js';
import connectToDb from './db/ConnectionDB.js';
import SMH from './controllers/StartMiddleWareHandler.js';



const PORT = process.env.PORT || 4000;

const DBURI = app.get("env") == "development" ? process.env.DBURILOCAL : process.env.DBURIPROD;



app.use(express.json());
connectToDb(DBURI);


app.use((req, res, next) => SMH(req, res, next));



app.use("/api/get/", getApiRoutes)



app.listen(PORT, () => console.log(`ON LOCAL SERVER CHECK :  http://localhost:${PORT}/api/get
ON PRODUCTION SERVER  :  https://commingsoon.com/don'tclickit
`))