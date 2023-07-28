const express = require("express") ; 
const { isAuthenticatedUser , authorizedRoles } = require("../middleware/auth");
const router  = express.Router() ;   


const Order =  require("../controllers/orderController")  

router.route("/order/new").post(isAuthenticatedUser ,   Order.newOrder ) ;  

router.route("/order/:id").get(isAuthenticatedUser , authorizedRoles("admin") , Order.getSingleOrder) ;   


router.route("/orders/me").get(
    isAuthenticatedUser , Order.myOrder
) ;

router.route("/admin/orders").get(
    isAuthenticatedUser , authorizedRoles("admin") , Order.GetAllOrder
) ; 


router.route("/admin/order/:id").put(
    isAuthenticatedUser , authorizedRoles("admin") , Order.updateOrder ) ; 


router.route("/admin/order/:id").delete(isAuthenticatedUser , authorizedRoles("admin") ,Order.deleteOrder) ; 
 

module.exports = router ; 