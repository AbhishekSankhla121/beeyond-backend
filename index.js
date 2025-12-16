
import {config} from "dotenv"
import { app } from "./app.js"

import { ErrorMiddleware } from "./middleware/Error.js"
import { ConnectToDataBase } from "./config/databaseConnection.js"
import http from "http";
import { initSocket } from "./socket.js"

// load env
config({
    path:".env"
})

const ConnectionStringURL = process.env.DATABASE_CONNECTION_STRING ||"mongodb://admin:admin@mongo:27017/abhishek?authSource=admin"

const Port = process.env.PORT || 5000

// connect to database
ConnectToDataBase(ConnectionStringURL)

// use middlewares 
// const server = http.createServer(app);
// set cors policy

// export const io = initSocket(server);
// application working on 
app.listen(Port,()=>{
    console.log(`Express + Socket running on port:${Port}`)
})

app.use(ErrorMiddleware);