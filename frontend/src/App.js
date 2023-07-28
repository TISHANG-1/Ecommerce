import './App.css';
import Header from "./component/layout/Header/Header.js"   
import Footer from "./component/layout/Footer/Footer.js"   
import Home from "./component/layout/Home/Home.js"   
import {BrowserRouter as Router, matchPath} from "react-router-dom"   
import WebFont from "webfontloader"   
import { Route , Routes } from "react-router-dom";  
import React from "react"
import { productDetailsReducer } from './reducers/productReducer';
import  ProductDetails  from "./component/Product/ProductDetails.js" ;  
import Products from "./component/Product/Products.js"
import ProtectedRoute from './component/Route/ProtectedRoute';
import {Search} from "./component/Product/Search"
import LoginSignUp from './component/layout/User/LoginSignUp';  
import ResetPassword from './component/layout/User/ResetPassword.jsx'
import Profile  from "./component/layout/User/profile.js" 
import Cart from './component/Cart/Cart.js'
import {loadUser} from './actions/userAction';
import store from "./store"  
import  UserOptions  from "./component/layout/Header/userOptions.js"
import { useSelector } from 'react-redux';   

import UpdateProfile from "./component/layout/User/UpdateProfile.js"    

import UpdatePassword from "./component/layout/User/UpdatePassword.js"   


import ForgotPassword from "./component/layout/User/ForgotPassword.js"  

 
function App() {   
  const {isAuthenticated , user} = useSelector(state=>state.user);   
  React.useEffect(()=>{
    WebFont.load({
       google:{
           families:["Roboto" ,"Droid Sans" , "Chilanka"] 
       }
    })  ;   
    console.log(user) ;
  
    if(isAuthenticated) store.dispatch(loadUser()) ; 

}  , [] 
 ) ;

  // we will start  making the  components like header and all  
  
  return (<Router > 
      <Header/>       
     
     {isAuthenticated &&<UserOptions  user = {user}/>}
     <Routes>
      <Route path = "/"  Component ={Home}/>
      <Route path = "/product/:id"  Component ={ProductDetails}/>  
      <Route path ="/products" Component={Products}/>
      <Route path ="/products/:keyword" Component={Products}/>
      <Route path ="/Search" Component={Search}/>  
      {isAuthenticated &&<Route path ="/account" Component={Profile}/> } 
      {isAuthenticated &&<Route path ="/me/update" Component={UpdateProfile}/> }  
      {isAuthenticated &&<Route path ="/password/update" Component={UpdatePassword}/> } 
      {<Route path ="/password/ResetPassword" Component={ResetPassword}/> } 
      {<Route path ="/password/forgot" Component={ForgotPassword}/> }
      <Route path ="/login" Component={LoginSignUp}/>  
      <Route path ="/cart" Component={ Cart}/>  

      </Routes>
      <Footer/> 
  </Router>) ;  
} 

export default App;
