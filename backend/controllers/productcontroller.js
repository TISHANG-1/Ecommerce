// importing product Schema
const error = require('../middleware/error.js');
const Product =  require('../model/productModel.js');  
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors  = require('../middleware/catchAsyncErrors')  
const ApiFeatures = require('../utils/apifeatures.js') ; 

// create product 
exports.createProduct = catchAsyncErrors( async (req , res , next)=>{  
    req.body.user =  req.user.id;
     const product  = await Product.create(req.body) ; 
    //  res.send(201).json({success: true , product}) ; . 
    console.log("connected") ; 
    res.status(201).send({message: "Product Created Successfully"}) ;  

})  

// Get all Product 
exports.getAllProducts = catchAsyncErrors (async (req , res)=>{  
    const resultPerPage = 8 ;   
    const productCount  =  Number(await Product.countDocuments({})) ;   
    console.log(productCount)
    const apiFeature = new ApiFeatures(Product.find() , req.query).search().filter().pagenation(resultPerPage) ;   ;
    // let products  =  await apiFeature.query ; 
    // const filterProductCount  = products.length() ;
    // await apiFeature  

    const products  =  await apiFeature.query ; 
    // console.log("here we are in getAllProduct") ;   
    
    res.status(200).json({success: true , products , productCount , resultPerPage 
    }) ;   
    console.log("here we are in getAllProduct") ; 
})  

// Update a Product 

exports.updateProduct =  catchAsyncErrors (async (req , res , next)=>{ 
     
    let product  =  await Product.findById(req.params.id) ; 
    if(!product){ 
        return  next(new ErrorHandler("Product not found" , 404));  
    } 
    product  =  await Product.findByIdAndUpdate(req.params.id , req.body ,{new: true , runValidators: true , useFindAndModify:false}) ;   
    res.status(200).json({
        success: true, 
        product 
    }) ; 

}   )

// Delete Product 
// Update a Product 

exports.deleteProduct =  catchAsyncErrors (async (req , res , next)=>{ 
    // console.log("to delete the product"); 
    const product  =  await Product.findById(req.params.id) ; 
    if(!product){ 
        return  next(new ErrorHandler("Product not found" , 404));  
    } 
    await Product.findByIdAndDelete(req.params.id) ;
    res.status(200).json({
        message:"product deleted Successfully"
    }) ; 

} ) 



// Get single Product
exports.getProductDetails = catchAsyncErrors (async (req , res , next)=>{
       const product  =  await  Product.findById(req.params.id) ; 
       if(!product){ 
         return res.status(500).send({message: "product not found"}) ; 
       }
       console.log(product);
       res.status(200).json({product}); 
})   
//Create new Review or Update the review ;


exports.createProductReview = catchAsyncErrors(
    
    async(req , res , next )=>
    { 
         const productID = req.body.productId ; 
         const  review = { 
          user: req.user._id ,  
          name: req.user.name,
          rating: Number(req.body.rating) , 
          comment: req.body.comment
         }  
         console.log(req.user._id) ;
         const  product  =  await Product.findById(productID) ; 
         let isReviewed = 0  ;
         product.reviews.forEach((item)=>{ 
              isReviewed+=((item.user.toString()) === (req.user._id.toString())) ; 
         })
         console.log(isReviewed) ;
         if(isReviewed){
            product.reviews.forEach(
                (rev)  =>{ 
                   if( rev.user.toString() === (req.user._id.toString()) && isReviewed)
                   {    
                       rev.review = req.body.review ;
                       rev.comment = req.body.comment ;    
                       isReviewed = 0 ;
                      
                   }  
                //    console.log(rev) ;
                }
            )    
            

         }
         else{
         product.reviews.push(review) ; 
         console.log("Doesnt Match") ; 
        } 
        product.numberOfReviews= product.reviews.length ;  
        let avg = 0 ; 
        product.reviews.forEach((rev)=>{
           avg+=rev.rating ; 
        }) ; 
        product.ratings = avg/product.numberOfReviews ;  
        console.log("here we are out") ;
        await product.save({validateBeforeSave:false}) ;   

        res.status(200).send({ 
           success: true , 
           message: "your review has been successfully submitted"
        }) ; 
         

    }) ; 


exports.getProductReview = catchAsyncErrors(
      async(req , res , next)=>{ 
           const product = await Product.findById(req.query.id) ;
           if(!product){ 
              return next( new ErrorHandler("This product doesnt exist" , 401)) ; 
           }
           else{
              const reviews = product.reviews ; 
              res.status(200).send({
                 success: true , 
                 reviews  , 
                 product
              })
           }
      } 
)  

exports.deleteProductReview = catchAsyncErrors(
      async(req , res , next)=>{ 
           const product = await Product.findById(req.query.productId  ) ;
           if(!product){ 
              return next( new ErrorHandler("This product doesnt exist" , 401)) ; 
           }
           else{
              const review  =  product.reviews.filter( (rev) => rev._id.toString() !== req.query.id) ; 
              product .reviews = review; 
              
        let avg = 0 ; 
        product.reviews.forEach((rev)=>{
           avg+=rev.rating ; 
        }) ;  
        product.numberOfReviews = product.reviews.length ; 
        product.ratings = avg/product.numberOfReviews ;  
        await product.save({validateBeforeSave:false}); 
        res.status(200).send({
                 success: true 
              })
           }
      } 
)  

