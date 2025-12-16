import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Order from '../models/order.js'
import ErrorHandler from "../utils/errorHandler.js";

export const getUnassignedOrder =catchAsyncError( async (req,res,next)=>{
    const data = await Order.find({
        isLocked: false
    })
    return res.status(200).json({
    success: true,
    message: "fecth delivery order successfully !",
    data 
})
})



export const assignOrder = catchAsyncError(async(req,res,next)=>{
    const {id} = req.body
    console.log("assign order: order_id:",id)
    if(!id) return next(new ErrorHandler("Order id must require",400));
    const data = await Order.findOneAndUpdate(
        { _id: id, 
          isLocked:false
        },
        {
        isLocked: true,
        deliveryPartner: req.user._id,
        status: "ASSIGNED"
        },
        {
            new:true
        }
     )
  if (!data) {
    return next(
      new ErrorHandler("Order already assigned or not found", 400)
    );
  }
    
    return res.status(200).json({
    success: true,
    message: "Assign delivery order successfully !",
    data 
})

})

export const updateOrderStatus= catchAsyncError(async(req,res,next)=>{
    const {id,status} = req.body
    console.log("assign order: order_id , status:",id,status)
    const data = await Order.findOneAndUpdate(
        { _id: id, 
          isLocked:true
        },
        {
        status
        },
        {
            new:true
        }
     )
    
    return res.status(200).json({
    success: true,
    message: "update delivery order status successfully !",
    data 
})
})


export const myOrders =catchAsyncError(async(req,res,next)=>{
    const data = await Order.find(
      {
        deliveryPartner: req.user._id
      }
    )
    return res.status(200).json({
    success: true,
    message: "fecth delivery order successfully !",
    data 
})
})



