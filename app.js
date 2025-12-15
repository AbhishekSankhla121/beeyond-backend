import express from 'express'

export const app = express()




app.get("/health",(req,res,next)=>{
    return res.status(200).json({
        "success":true,
        "message":"application is working"
    })
})