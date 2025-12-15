import { catchAsyncError } from "../middleware/catchAsyncError.js";

export const getDeliveryUser =catchAsyncError( async (req,res,next)=>{
    return res.status(200).json("delivery found")
})