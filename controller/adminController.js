import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const getAdminUser =catchAsyncError( async (req,res,next)=>{
    return res.status(200).json("Admin found")
})