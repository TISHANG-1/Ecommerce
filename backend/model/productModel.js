const mongoose  =  require('mongoose') ;    
const productSchema  =   new mongoose.Schema({ 
    name : { 
        type:String , 
        required:[true, "Please enter Product name"], 
        trim : true 
    }, 
    description :{
        type:String, 
        required:[true , "Please Enter product Description"]
    }, 
    price:{ 
        type:Number, 
        required: [true , "Please enter Product Price"]
    }, 
    ratings : {
         type: Number, 
         default : 0
    }, 
    images: [
         {
        publicID  :{ 
             type : String, 
             required : true 
        }, 
        url  :{ 
            type : String, 
            required : true 
       } 
      } 
    ], 
    category: { 
          type: String ,
          required: [true , "Please enter Product category"]
    },
    Stock : { 
          type: Number, 
          required :[true , "Please enter product Stock"] , 
          maxLength: [4 , "Stock cannod exceed 4 characters"], 
          default : 1
    }, 
    numberOfReviews :{ 
         type : Number, 
         default : 0
    }, 
    reviews: [
      {  
      user: {
            type : mongoose.Schema.ObjectId, 
            ref : "User" , 
            required: true, 
      } , 
      name: {
            type: String, 
            required: true
        }, 
      rating: {
            type: Number, 
            required: true
        }, 
       comment: {
            type: String, 
            required: true
        }

      }
    ],    
    user: {
          type : mongoose.Schema.ObjectId, 
          ref : "User" , 
          required: true, 
    } , 

    createdAt:{ 
        type: Date , 
        default: Date.now
    }

      
})

module.exports = mongoose.model("product" , productSchema); 