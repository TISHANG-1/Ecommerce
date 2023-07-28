const error = require('../middleware/error.js');
const User =  require('../model/userModel.js');  
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors  = require('../middleware/catchAsyncErrors')  
const ApiFeatures = require('../utils/apifeatures.js') ; 
const sendToken =  require("../utils/jwtToken.js") ; 
const crypto = require("crypto") ;
const sendEmail =  require("../utils/sendEmail.js") ;   
const cloudinary =  require("cloudinary") ;
exports.registerUser = catchAsyncErrors(
    async(req , res , next)=>{    
        console.log("this is the register portal") ;
        const myCloud = await  cloudinary.v2.uploader.upload(req.body.avatar ,{folder:"avatar" , 
    width: 150 , crop : "scale" } )  ;
        const {
            name, email, password
        }  = req.body ; 
        const user =  await User.create({name, email , password , avatar:{
           publicID :myCloud.public_id, 
           url:myCloud.secure_url
        }})   
        sendToken(user, 201 , res) ; 
    }
)  

exports.loginUser = catchAsyncErrors(  
   
   async(req , res , next)=>{   
    console.log("tishang login") ;
      const {email , password} = req.body ;  
      // checking if user has given password and email both  
      if(!email || !password){
     return next(new ErrorHandler("Please Enter  Email and Password" , 400)) ;   
    }
     console.log(email) ;   
     console.log(password) ; 
     const user =  await User.findOne({email}).select("+password") ; 
     if(!user){ 
          return next(new ErrorHandler("Invalid email or password" , 401)) ;
     }   
   
     const isPasswordMatched = await  user.comparePassword(password); 
     console.log(isPasswordMatched)
     if(!isPasswordMatched){ 
          return next(new ErrorHandler("Invalid email or password"  , 401)) ;
     }  
      
     sendToken(user, 200 , res) ;
    }
)  

exports.logutUser = catchAsyncErrors(async (req,res,next)=>{  
    console.log("here"); 
    res.cookie("token" , null , {expires: new Date(Date.now()) , httpOnly: true ,}); 
    res.status(200).send(
        {
            success:"true" , 
            message:"logged Out" 
        })
})     


// forgot password 

exports.forgotPassword = catchAsyncErrors(async (req , res , next)=> { 
         const user = await User.findOne({ email: req.body.email}) ;  
         console.log(req.body.email) ;
         if(!user) { 
             return next(new ErrorHandler("user Not Found" , 404)) ; 
         }
         // Get ResetPassword Token 
         const resetToken =  user.getResetPasswordToken();
         await user.save({validateBeforeSave : false});
         const resetPasswordUrl =  `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}` ;  

         const message = `Your password reset token is :- \n\n ${resetPasswordUrl} 
         \n\n 
         If you have not Requested this email then Please ignore it.`; 
         try{
            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery`,
                message: message // Add the message parameter
             }); 

            res.status(200).send({ 
                 success: true , 
                 message: `Email sent to ${user.email} successfully` 
            })
         }
         catch(error){ 
              user.resetPasswordToken  = undefined; 
              user.resetPasswordExpire  = undefined ; 
              await user.save({validateBeforeSave: false}) ;   

              return next(new ErrorHandler(error.message , 500)) ; 

         }
})
exports.resetPassword = catchAsyncErrors(async (req , res , next)=> { 

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex") ;   
    const user = await User.findOne({resetPasswordToken , resetPasswordExpire :{$gt: Date.now()}}) ;  
    if(!user){ 
        return next(new ErrorHandler("Invalid email or password" , 401)) ;
   }   
   if(!user){ 
    return next(new ErrorHandler("Reset Password Token is invail or expired" , 401)) ;
   }
   if(req.body.password != req.body.confirmPassword){ 
    return next(new ErrorHandler("Entered Password and confirmedPassord doesnt match" , 401)) ;
   }   

   user.password = req.body.password ;  
   user.resetPasswordExpire  = undefined; 
   user.resetPasswordToken = undefined ; 
   await user.save() ; 
   sendToken(user , 200 , res) ;
    
})  


//Get User Detail 
exports.getUserDetails  =  catchAsyncErrors(
     async(req , res, next)=>{ 
           const user = await User.findById(req.user.id) ;   
           res.status(200).json({ 
               success: true , 
               user, 
           }); 
             
     }
) 

exports.updateUserPassword  =  catchAsyncErrors(
    async(req , res, next)=>{  
          console.log("user Password") ;  
        //   console.log(req)
          const user = await User.findById(req.user.id).select("+password");     
          console.log(req.body.oldPassword) ;   
          const isPasswordMatched =  await user.comparePassword(req.body.oldPassword); 
          console.log(req.body.oldPassword) ;
          if(!isPasswordMatched){ 
          return next(new ErrorHandler("Old Password is Incorrect"  , 401)) ;
     }   
          if(req.body.newPassword !== req.body.confirmPassword){ 
                return next(  new ErrorHandler("Password Doesnt Match")) ; 

          }  
          user.password = req.body.newPassword ;   
          await user.save() ; 
          sendToken(user , 200 , res) ;
            
    }
) 


exports.updateProfile = catchAsyncErrors(async  (req, res , next)=>{ 

     const  newUserData = { 
          name: req.body.name , 
          email: req.body.email ,
     }

// we will add cloudinary later  
     if(req.body.avatar !== ""){ 
    const user  =  await User.findById(req.user.id) ; 
    const imageId =  user.avatar.public_id ;
    await cloudinary.v2.uploader.destroy(imageId) ;   
    const myCloud = await  cloudinary.v2.uploader.upload(req.body.avatar ,{folder:"avatar" , 
    width: 150 , crop : "scale" } )  ;
  
    newUserData.avatar = { 
        public_id : myCloud.public_id ,  
        url : myCloud.secure_url ,
    }
     }  

    const user  =  await User.findByIdAndUpdate(
    req.user.id , newUserData , { 
      new : true , 
      runValidators: true ,
      useFindAndModify: false})   ;   
      
      res.status(200).json({
         success: true , 
         
      })


    }) ;  
     

// Get All the Users    
exports.getAllUsers = catchAsyncErrors(async  (req, res , next)=>{

        const user = await  User.find() ; 
        res.status(200).json({
            success: true ,   
            user 
        }) ; 
 }) 
 
 // Get single User
 exports.getSingleUsers = catchAsyncErrors(async  (req, res , next)=>{

        const user = await  User.findById(req.params.id) ;   
        if(!user){ 
               return next(new ErrorHandler("User does not exist with this id" , 401) ) ;
        }
        res.status(200).json({
            success: true ,   
            user 
        }) ; 
 })  



 // Update the user Role 
 exports.updateUserRole = catchAsyncErrors(async  (req, res , next)=>{ 

    const  newUserData = { 
         name: req.body.name , 
         email: req.body.email ,  
         role : req.body.role
    }

// we will add cloudinary later 

   const user  =  await User.findByIdAndUpdate(
   req.params.id , newUserData , { 
     new : true , 
     runValidators: true ,
     useFindAndModify: false})   ;   
     
     res.status(200).json({
        success: true , 
        
     })


   }) ;  
// Update the user Role -- Admin
exports.deleteProfile = catchAsyncErrors(async  (req, res , next)=>{ 

   // we will remove cloudinary

   const user  =  await User.findById(
   req.params.id )   ;   
    if(!user){ 
          return next(new ErrorHandler("User doesnt exist with this id")) ; 
    }  
    await  await User.findByIdAndDelete(
        req.params.id )   ; 
     res.status(200).json({
        success: true ,  
        message: "Deleteed Successfully"
        
     })


   }) ;  
