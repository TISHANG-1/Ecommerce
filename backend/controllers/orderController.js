const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/orderModel") ;   
const Product =  require('../model/productModel.js');  
const ErrorHandler = require('../utils/errorhandler.js');    
const user  = require("../model/userModel") ;


exports.newOrder =  catchAsyncErrors(
       async(req , res , next)=>{  
          const {shippingInfo, orderItems , paymentInfo , itemsPrice , taxPrice , shippingprice , totalPrice} = req.body ;
          const order = await Order.create({
            shippingInfo, orderItems , paymentInfo , itemsPrice , taxPrice , shippingprice , totalPrice , 
            paidAt: Date.now() , 
            user: req.user._id 
          })     
          
          res.status(201).json({
            success: true , 
            order
          })
        
       }
)  
// Get single  Order 

exports.getSingleOrder =  catchAsyncErrors(
    async(req , res, next)=>{   
          // populate method basically goes to the specified DB and assign the value from that DB to the passed Argument  
            console.log("get Single Order") ; 
            const order = await Order.findById(req.params.id) ;
            console.log("Get more Order") ;
            if(!order){ 
                return next(new ErrorHandler("Cant Find Any Order for the given Order ID" , 401)) ; 
            }
            res.status(200).send({success: true , 
                    order  
            }) ;
    } 
    
)


// Get logged in User Order 

exports.myOrder =  catchAsyncErrors(
    async(req , res, next)=>{   
          // populate method basically goes to the specified DB and assign the value from that DB to the passed Argument
            const order = await Order.find({user:req.user._id}); 
            res.status(200).send({success: true , 
                    order  
            }) ;
    } 
    
) 

// Get all the Order for Admin  


exports.GetAllOrder =  catchAsyncErrors(async (req , res , next)=>{ 
           const orders = await Order.find() ;   
           let totalAmount  = 0 ; 
           (await orders).forEach((item)=>{totalAmount+=item.totalPrice}) ;
            console.log(orders) ;
           res.status(200).json({  
                success: true , 
               totalAmount , 
               orders
           })   ; 
})  
// delete Order   
exports.deleteOrder =  catchAsyncErrors(async (req , res , next)=>{ 
           const orders = await Order.findById(req.params.id) ; 
           if(!orders){ 
             return next(new ErrorHandler("No order found" , 401)) ; 
           }    
           await Order.findByIdAndDelete(req.params.id)  ; 
           

           res.status(200).send({
                success: true 
               
           })   ; 
})  

exports.updateOrder =  catchAsyncErrors(async (req , res , next)=>{ 
    const orders = await Order.findById(req.params.id) ;    
    console.log(orders) ; 
    if(orders.orderStatus === "Delivered" || !orders){ 
        return next(new ErrorHandler("you have already delivered this order" , 400)) ; 
    }    
    
    console.log(orders.orderItems) ;
    orders.orderItems.forEach( async(item)=>{  
           await updateStocks(item.product , item.quantity) ; 
    });  

     orders.orderStatus = req.body.status ; 
     if(req.body.status === "Delivered" ){ 
          orders.deliveredAt = Date.now();  
          
     }  
    await orders.save({validateBeforeSave: false}) ;   

    res.status(200).send({message: orders.orderStatus }) ; 
}) ;  

async function updateStocks(id , quantity){ 
      
     const  product  = await Product.findById(id) ;   
     
     product.Stock -= quantity ;  
     await product.save({validateBeforeSave: false}); 
}





