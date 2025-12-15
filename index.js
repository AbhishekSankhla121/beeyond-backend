
import {config} from "dotenv"
import { app } from "./app.js"
import cors from "cors"
import express from 'express'

// load env
config({
    path:".env"
})

const ConnectionStringURL = process.env.DATABASE_CONNECTION_STRING ||"mongodb://admin:admin@mongo:27017/abhishek?authSource=admin"
const origins = process.env.FRONTEND_URL || "http://localhost:3000"
const Port = process.env.PORT || 5000

// use middlewares 
app.use(express.urlencoded(
    {
        extended:true
    }
))
app.use(express.json())
app.use(cors({
    origin: origins, // your React frontend
    methods: ["GET", "POST", "DELETE"],
    credentials: true
}));


app.listen(Port,()=>{
    console.log(`backend application is working on port:${Port}`)
    console.log(`check health: http://localhost:${Port}/health`)
})