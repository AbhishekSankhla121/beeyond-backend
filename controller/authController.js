import { catchAsyncError } from "../middleware/catchAsyncError.js";
import User from "../models/user.js";
import ErrorHandler from '../utils/errorHandler.js'
import { sendToken } from "../utils/sendToken.js";

export const createUser =catchAsyncError( async (req,res,next)=>{
    const {name,email,password,role} = req.body
    console.log("regiester",name,email,password,role)
    if (!name || !email || !password || !role) {
  return next(new ErrorHandler("Please enter all fields", 400));
}
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

export const loginUser = catchAsyncError(async(req,res,next)=>{
  const{email,password} = req.body
  console.log('login',email,password)
  if(!email || !password) return next(new ErrorHandler("please enter all fields",400));
  const user = await User.findOne({email}).select('+password');
  if(!user) return next(new ErrorHandler("User not exist!",401));
  const isMatch = await user.comparePassword(password)
  if(!isMatch) return next(new ErrorHandler('invalid credential in login',401))
  sendToken(res,user,`welcome back ,${user.name}`,201)
})

export const logout = catchAsyncError(async (req, res, next) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true, 
        secure: false, 
        sameSite: "none", 
    }

    //    clearing the auth-token from cookies
    res.status(200).cookie("token", null, options).json({
        success: true,
        message: "logout successfully"
    })
});
