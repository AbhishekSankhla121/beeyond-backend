import { Server } from "socket.io";
import { FrontendUrl } from "./app.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: FrontendUrl,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("joinCustomerRoom", (customerId) => {
      socket.join(`customer_${customerId}`);
    });

    socket.on("joinDeliveryRoom", (deliveryId) => {
      socket.join(`delivery_${deliveryId}`);
    });

    socket.on("joinAdminRoom", () => {
      socket.join("admins");
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};
