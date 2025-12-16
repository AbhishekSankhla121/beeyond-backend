import jwt from 'jsonwebtoken'
import {catchAsyncError} from './catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'
import User from '../models/user.js'


export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if (!token) next(new ErrorHandler("isAuthenticated middleware token not found!", 401))
    const data = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById({_id: data._id});
    next()
})