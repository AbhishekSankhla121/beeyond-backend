import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const gethealth =catchAsyncError( async (req,res,next)=>{
    return res.status(200).json({
        "success":true,
        "message":"application is working"
    })
})