import dotenv from 'dotenv';
dotenv.config()

import express from "express"

const app = express();

import cors from "cors";

import morgan from "morgan"

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: false }))
 
// parse application/json
app.use(express.json())

import mongoClient from './config/db.js'

mongoClient();
 
// Load Routers

import loginRouter from './routers/login.router.js'



//USE APIS

app.use('/api/v1/login', loginRouter)

app.get("/", function(req,res) {
    res.send("Hello There");
});

// 404 Return

app.use((req,res,next) => {

    const error = new Error("Resource not found")
    error.status = 404

    next(error)
})

// Error Handling
import {handleError} from './utils/errorHandler.js'


app.use((error,req,res,next) => {
    handleError(error,res)
})

app.listen(PORT, error =>{
    if (error) console.log(erro)

    console.log(`Server is running at http://localhost:${PORT}`)
})