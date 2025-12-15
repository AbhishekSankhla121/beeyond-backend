import express from 'express'
import userRoutes from "./routes/userRoutes.js"
export const app = express()

const urlPrefix=`/api/v1`
// to check the backend application health 
app.get("/health",(req,res,next)=>{
    return res.status(200).json({
        "success":true,
        "message":"application is working"
    })
})


// user related endpoints 
app.use(`${urlPrefix}/user`,userRoutes)

// delivery related endpointss 


// admins related encpoints
