import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Product from '../models/product.js'

export const getProduct =catchAsyncError( async (req,res,next)=>{
    const data = await Product.find({
        isAvailable: true,
        stock: { $gt: 0 }
    })
    return res.status(200).json({
    success: true,
    message: "product available !",
    data
  });
})


export const placeOrder = catchAsyncError(async(req,res,next)=>{
    const {} = req.body
     return res.status(200).json({
    success: true,
    message: "product available !",
    // data
})
})