import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

export const app = express();

// imports 
import connectToDb from './db/ConnectionDB.js';
import SMH from './middlewares/StartMiddleWareHandler.js';

// imported routes 
import getApiRoutes from './routes/getApiRoutes.js';
import AuthRouter from './routes/Auth.js';
import ExtraRouter from './routes/ExtraRoute.js';
import KathaOperationssRouter from './routes/KathaOperationosRoute.js';
import ShortThingsRouter from './routes/ShortThingsRoutes.js';
import BillOperationRouter from './routes/BillOperations.js';


const PORT = process.env.PORT || 4000;

const DBURI = app.get("env") == "development" ? process.env.DBURILOCAL : process.env.PROD;



app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())
connectToDb(DBURI);


// app.use((req, res, next) => SMH(req, res, next));

app.get("/", (req,res)=>{return res.status(200).json({success:true,message:"hello world"})})

// ROUTES 
app.use("/api/get/", getApiRoutes);
app.use("/api/auth", AuthRouter);
app.use("/api/extra/", ExtraRouter);
app.use("/api/kathaoperations/", KathaOperationssRouter)
app.use("/api/getshortthings/", ShortThingsRouter)
app.use("/api/bill/", BillOperationRouter);


app.get("/api/test", (req,res)=>{
    return res.status(200).json({success:true,message:"Asslam U Alikumm....."})
})




// app.listen(PORT, () => console.log(`${app.get("env")=="development"?"Check on http://localhost:"+PORT:"PRODUCTION SERVER HAS STARTED SUCESSFULLY..."}`))