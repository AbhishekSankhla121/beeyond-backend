
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

ConnectToDataBase(ConnectionStringURL)

const server = http.createServer(app);


export const io = initSocket(server);

server.listen(Port, () => {
  console.log(`Server + Socket.IO running on ${Port}`);
});

app.use(ErrorMiddleware);