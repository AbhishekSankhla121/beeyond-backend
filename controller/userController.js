import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const getUser =catchAsyncError( async (req,res,next)=>{
    return res.status(200).json("user found")
})