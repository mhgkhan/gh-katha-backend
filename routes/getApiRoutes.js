import express from 'express';
const getApiRoutes = express.Router();

getApiRoutes.get("/", (req, res) => {
    return res.status(200).json("hello world");
})







export default getApiRoutes;