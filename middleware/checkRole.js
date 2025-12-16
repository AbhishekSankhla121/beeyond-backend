import ErrorHandler from '../utils/errorHandler.js'

export const checkRole=(role)=>(req,res,next)=>{
    if(!role.includes(req.user.role)){
        return next(new ErrorHandler('Forbidden',403))
    }
    next()
}