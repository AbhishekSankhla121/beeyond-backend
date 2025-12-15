import mongoose from "mongoose" 

async function ConnectToDataBase (ConnectionStringURL){
    try {
       
        await mongoose.connect(ConnectionStringURL);
        console.log("Connected to MongoDB successfully:", ConnectionStringURL);
    } catch (error) {
        console.error("Error: Connection to MongoDB failed\n", error);
    }
}

export {ConnectToDataBase}