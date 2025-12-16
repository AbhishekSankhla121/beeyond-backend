import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Product from '../models/product.js'
import ErrorHandler from "../utils/errorHandler.js";
import Order from '../models/order.js'

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
    let orderItems = [];
    let totalAmount = 0;
    const {items} = req.body

    console.log('placeorder item',items)
    
    if(items.length === 0) return next(new ErrorHandler('items cannot be empty',400))
     
    for (const item of items) {
        const product = await Product.findById(item.product);

        if (!product) return next(new ErrorHandler("Product not found", 404));
        if (product.stock < item.quantity) return next(new ErrorHandler(`Insufficient stock for ${product.name}`,400));


    const itemPrice = product.price * item.quantity;
    totalAmount += itemPrice;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    });

    // reduce stock
    product.stock -= item.quantity;
    await product.save();
  }
    const order = await Order.create({
    customer: req.user._id,
    items: orderItems,
    totalAmount,
    status: "PLACED"
  });
     return res.status(200).json({
    success: true,
    message: "order placed successfully !",
    data: order 
})
})




export const myOrders =catchAsyncError(async(req,res,next)=>{
    const data = await Order.find({customer: req.user._id})
    return res.status(200).json({
    success: true,
    message: "fecth order successfully !",
    data 
})
})

export const getMyOrder=catchAsyncError(async(req,res,next)=>{
    const { id } =req.params
    if(!id) return next(new ErrorHandler('id not found',400))
      const data = await Order.findOne({_id: id})
    return res.status(200).json({
    success: true,
    message: "fecth order successfully !",
    data 
})
})