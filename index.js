
import {config} from "dotenv"
import { app } from "./app.js"
import cors from "cors"
import { ErrorMiddleware } from "./middleware/Error.js"
import { ConnectToDataBase } from "./config/databaseConnection.js"
import http from "http";
import { initSocket } from "./socket.js"

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
const server = http.createServer(app);
// set cors policy
app.use(cors({
    origin: origins, 
    methods: ["GET", "POST", "DELETE","PUT","PATCH"],
    credentials: true
}));

export const io = initSocket(server);
// application working on 
app.listen(Port,()=>{
    console.log(`Express + Socket running on port:${Port}`)
    console.log(`check health: http://localhost:${Port}/health`)
})

app.use(ErrorMiddleware);