import React, { Fragment, useState } from 'react'
import "./Header.css"     
import {SpeedDial , SpeedDialAction } from "@material-ui/lab" ;
import DashboardIcon from "@material-ui/icons/Dashboard" ;
import Person from "@material-ui/icons/Person" ;  
import { Backdrop } from '@material-ui/core';
import ExitToAppIcon from "@material-ui/icons/ExitToApp" ;
import ListAltIcon from "@material-ui/icons/ListAlt" ;    
import { useDispatch } from 'react-redux';
import { userReducer } from '../../../reducers/userReducer';
import { useNavigate } from 'react-router-dom';  
import { logout } from '../../../actions/userAction';
import { useAlert } from 'react-alert';
const UserOptions = ({user}) => {   
  const dispatch = useDispatch(); 
  const navigate=  useNavigate() ;     
  console.log(user) ;
  const alert = useAlert(); 
   const [open , setOpen] =useState(false);  
   const  options = [ 
     {icon : <ListAltIcon/> , name: "Orders" , func : orders} ,
     {icon : <Person/> , name: "Profile" , func : account}, 
     {icon : <ExitToAppIcon/> , name: "Logout" , func : logoutUser} ,    

   ];     
   if(user.role === "admin"){ 
            options.unshift({ 
              icon: <DashboardIcon/>, 
              name: "Dashboard" , 
              func : dashboard, 
            }) ;
   }
   function dashboard(){ 
     navigate("/dashboard");
   }
   function orders() {
    navigate('/orders');
   } 
   function account(){ 
      navigate('/account'); 
   }
   function logoutUser(){ 
     dispatch(logout()) ;   
     alert.success("Logout Successfully"); 
      
   }
   function product(){
       navigate('/products')
   }
   console.log("here");
    return ( 
    <Fragment>
       <Backdrop open={open}  style ={ {zIndex :"10"}}/>  
         <SpeedDial
        ariaLabel = "SpeedDial tooltip example" 
        onClose = {()=>  setOpen(false)} 
        onOpen  = {()=>  setOpen(true)} 
        open= {open}    
        style={{zIndex: "11"}}
        icon = {<img
            className="speedDialIcon" src = {user.avatar.url? user.avatar.url: "/Profile.png"}
            alt  = "profile"  />  
        } 
        className= "speedDial"
        direction={"left"}
         >
        
          {options.map((item)=>(
              <SpeedDialAction 
              key ={item.name }
              icon={item.icon}
              tooltipTitle={item.name}
              onClick ={item.func}/>
          ))}
          </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
