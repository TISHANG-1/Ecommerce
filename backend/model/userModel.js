const mongoose = require("mongoose") ; 
const validator = require("validator") ;
const bcrypt  =  require("bcryptjs")  ;  
const jwt = require("jsonwebtoken") ;    
const crypto = require("crypto"); 
const userSchema  = new mongoose.Schema(

{
   name : {
      type: String ,
      required: [true , "please enter your name"],
      maxLength:[30,"Maximum Limit Exceeded"],
      minLength : [5 , "Name should have more than 5 characters"]   
   },    
   email : {
    type: String ,
    required: [true , "please enter your Email "],
    unique: true ,
    validate: [validator.isEmail , "Please Enter a valid Email "]
 }  , 
   password : { 
     type: String, 
     required: [true , "Please enter the password"] ,  
     minLength:[8 , "Password Should be greater than 8 characters"], 
     select:false

   } ,  
   avatar : 
  [
    {
     publicID  :{ 
        type : String, 
        required : false 
               }, 
     url  :{ 
       type : String, 
       required : false  
        } 
    } 
   ] , 
   role: { 
      type: String , 
      default:"User"
   },  
   createdAt:{ 
      type:Date, 
      default:Date.now, 
   }, 
   resetPasswordToken : String, 
   resetPasswordExpire: Date , 



}) ; 

userSchema.pre("save" , async function(){ 
      if(!this.isModified("password")){ 
         return ; 
      }
      this.password =  await bcrypt.hash(this.password , 10) ; 
})  


//JWT TOKEN 

userSchema.methods.getJWTToken =  function(){ 
    return jwt.sign({id:this._id} , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRE ,  }) ;
}  
// comparing the password
userSchema.methods.comparePassword  = async function(enteredPassword){  
      return await bcrypt.compare(enteredPassword ,this.password) ; 
}   


// Generating Password Reset Token 
userSchema.methods.getResetPasswordToken  =  function(){      
   //Generating Token 
   const resetToken = crypto.randomBytes(20).toString("hex");   
   console.log(resetToken) ; 
   this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex") ; 
   console.log(this.resetPasswordToken) ; 
   //   
   this.resetPasswordExpire
   = Date.now() + 15*60*1000
      
}   

module.exports = mongoose.model("user" , userSchema) ;    
