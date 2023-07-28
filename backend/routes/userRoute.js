const express = require("express") ;
const router =  express.Router(); 
const user = require("../controllers/userController") ;   
const auth = require("../middleware/auth.js") ; 
router.post("/register" , user.registerUser);  
router.post('/login' , user.loginUser) ;  
router.route("/logout").get(user.logutUser) ;   

router.route("/password/forgot").post(user.forgotPassword) ; 
router.route("/password/reset/:token").put(user.resetPassword) ;   
router.route("/me").get( auth.isAuthenticatedUser,user.getUserDetails);
// update User Password
router.route("/password/update").put( auth.isAuthenticatedUser,user.updateUserPassword);
// update User Details
router.route("/me/update").put( auth.isAuthenticatedUser,user.updateProfile);


router.route("/admin/users").get(
    auth.isAuthenticatedUser , auth.authorizedRoles("admin") , user.getAllUsers) ; 

router.route("/admin/users/:id").get(
        auth.isAuthenticatedUser , auth.authorizedRoles("admin") , user.getSingleUsers) ;   
router.route("/admin/users/:id").put(auth.isAuthenticatedUser , auth.authorizedRoles("admin") , user.updateUserRole) ;   
router.route("/admin/users/:id").delete(auth.isAuthenticatedUser , auth.authorizedRoles("admin") , user.deleteProfile) ;   




module.exports  = router ; 