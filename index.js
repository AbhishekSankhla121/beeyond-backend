
import {config} from "dotenv"
import { app } from "./app.js"
import cors from "cors"
import express from 'express'
import { ErrorMiddleware } from "./middleware/Error.js"
import { ConnectToDataBase } from "./config/databaseConnection.js"

// load env
config({
    path:".env"
})

const ConnectionStringURL = process.env.DATABASE_CONNECTION_STRING ||"mongodb://admin:admin@mongo:27017/abhishek?authSource=admin"
const origins = process.env.FRONTEND_URL || "http://localhost:3000"
const Port = process.env.PORT || 5000

// connect to database
ConnectToDataBase(ConnectionStringURL)

// use middlewares 
app.use(express.urlencoded(
    {
        extended:true
    }
))
app.use(express.json())
// set cors policy
app.use(cors({
    origin: origins, 
    methods: ["GET", "POST", "DELETE","PUT","PATCH"],
    credentials: true
}));

// application working on 
app.listen(Port,()=>{
    console.log(`backend application is working on port:${Port}`)
    console.log(`check health: http://localhost:${Port}/health`)
})

app.use(ErrorMiddleware);