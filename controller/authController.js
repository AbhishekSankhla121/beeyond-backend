import { catchAsyncError } from "../middleware/catchAsyncError.js";
import User from "../models/user.js";
import ErrorHandler from '../utils/errorHandler.js'
import { sendToken } from "../utils/sendToken.js";

export const createUser =catchAsyncError( async (req,res,next)=>{
    const {name,email,password,role} = req.body
    console.log("regiester",name,email,password,role)
    if(!name||!email||!password,!role) return next(new ErrorHandler('please enter all fields',400))
     let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already exist !", 409)); 
    user = await User.create({
        name,
        email,
        password,
        role
    });
   sendToken(res,user,"Register Successfully",201)
})