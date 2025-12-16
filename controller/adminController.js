import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from '../utils/errorHandler.js'
import Product from '../models/product.js'
import User from '../models/user.js'

export const createProduct =catchAsyncError( async (req,res,next)=>{
    const {name,description,image,price,stock} = req.body
    console.log('product',name,description,image,price,stock)
    if(!name||!description||!image || !price ||!stock) return next(new ErrorHandler('please enter all fields',400));
    const product = await Product.create({
        name,
        description,
        image,
        price,
        stock
    })
    return res.status(200).json({
        "success":true,
        "message":"product created successfully !",
        "data": product

    })
})

export const deliveryPartner = catchAsyncError(async (req, res, next) => {
  const data = await User.find({
    role: "DELIVERY"
  });

  return res.status(200).json({
    success: true,
    message: "delivery partner data !",
    data
  });
});