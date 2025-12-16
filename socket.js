import {Server, Socket} from "socket.io"


export const initSocket =(server)=>{
    const io = new Server(server,{
        cors:{
            origin:"*",
            methods:["GET",'POST'],
        }
    })
    io.on("connection",(socket)=>{
        console.log("new socket Connected:",socket.id)

        // join order room 
        socket.on('joinDeliveryRoom',()=>{
            socket.join("delivery-partner")
        })

        socket.on('disconnect',()=>{
            console.log('socket disconnected',socket.id)
        })
    })
    return io
}


