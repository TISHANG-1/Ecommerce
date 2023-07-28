const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors"); 
const jwt = require("jsonwebtoken") ; const User = require("../model/userModel");

exports.isAuthenticatedUser =  catchAsyncErrors(async(req ,res , next) => {
     console.log(req);  
     console.log("i m here") ;
     const token  =  req.cookies.token ;     
    
     console.log(token );
     // {token} = req.cookie    
     // console.log(token)
     if(!token){
          return next(new ErrorHandler("Please Login to access this resource" , 401)) ; 
     }
     console.log(token) ; 
     const decodeData =  jwt.verify(token , process.env.JWT_SECRET) ;  
     req.user = await User.findById(decodeData.id) ;  
     next() ; 
})   


exports.authorizedRoles = (...roles)=>{  

     return  (req , res , next)=>{ 
          if(!roles.includes(req.user.role)){ 
             return next ( new ErrorHandler(`Roles: ${req.user.role} is not allowed to access this resource`  , 403) ) ; 
          }   
          next() ; 
     }  ; 
}
exports.forgotPassword  = catchAsyncErrors(async(req , res  , next) => { 
      const user  =  await User.findOne({email: req.body.email}) ; 

      if(!user){ 
         return next( new ErrorHandler("user not found", 404)) ; 
      }  

      // Get Reset Password Token 
      const resetToken = user.getResetPasswordToken() ;  
      await user.save({ validateBeforeSave: false}) ; 
      const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}` ;   
      const message =  `your password reset token is :- \n\n ${resetPasswordUrl}  \n\n if you have not requested this email then, please ignore it`;   

      try{

      }
      catch(error){  
        user.resetPasswordToken = undefined   ;  
        user.resetPasswordExpire= undefined  ;   
        return next(new ErrorHandler(error.message , 500)) ;

      }

}  ); 