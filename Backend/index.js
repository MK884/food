// const express = require("express");
import express from "express";
// const cors = require("cors")
import cors from "cors";
const app = express();
app.use(express.json())
app.use(cors())
// const dotenv = require("dotenv")
import dotenv from "dotenv";
dotenv.config();
// const bodyParser=require('body-parser');
import bodyParser from "body-parser";
app.use(bodyParser.json())

import user from './Routes/userRoute.js'; 
import Food from './Routes/FoodRoute.js';
import orders from './Routes/OrderRoute.js';
import connectDB from './Database/connectDB.js';


// Importing Routes
app.use("/api/user",user);
app.use("/api/products",Food);
app.use("/api/order",orders);

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URI);

        app.listen(process.env.PORT, () =>
            console.log(`Server Started on PORT ${process.env.PORT}`),
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();









