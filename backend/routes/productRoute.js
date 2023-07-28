const express = require('express'); 
const temp = require('../controllers/productcontroller');
const { isAuthenticatedUser } = require('../middleware/auth'); 
const { authorizedRoles } = require('../middleware/auth');
const router  = express.Router() ; 


// display all the product
router.route("/products").get( temp.getAllProducts) ;   

// display single Product 
router.get('/products/:id' , temp.getProductDetails) ;   

// Create a New Product 
router.route('/admin/products/new' ).post(isAuthenticatedUser ,  authorizedRoles("admin") , temp.createProduct) ;    

// Update A product  
router.route('/admin/products/:id').put( isAuthenticatedUser, authorizedRoles("admin")  , temp.updateProduct);   

// delete The Product  
router.route('/admin/products/:id').delete(isAuthenticatedUser,authorizedRoles("admin")  , temp.deleteProduct) ;     

router.route("/review").put(isAuthenticatedUser , temp.createProductReview) ;

router.route("/reviews").get(temp.getProductReview).delete(isAuthenticatedUser , temp.deleteProductReview) ;
module.exports =  router ; 