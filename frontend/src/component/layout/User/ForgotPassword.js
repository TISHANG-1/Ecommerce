import React, { Fragment , useRef, useState , useEffect } from 'react'
import "./ForgetPassword.css" 
import Loader from '../Loader/Loader'
import MailOutlineIcon from "@material-ui/icons/MailOutline"  
import {useDispatch , useSelector } from "react-redux" ; 
import { forgetPassword , clearErrors } from '../../../actions/userAction'
import {useAlert } from "react-alert" ;  
import { useNavigate } from 'react-router';
import {FORGET_PASSWORD_RESET } from '../../../constants/userConstant'  
import MetaData from '../MetaData'  

const ForgotPassword = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const alert  = useAlert() ;  
    const { message , loading, error} = useSelector(state=>state.forgotPassword) ;  
    const forgotPasswordSubmit  =(e) => { 
        e.preventDefault() ;  
  
        const myForm  = new FormData() ;   
  
      
        myForm.set("email" , email) ; 
          dispatch(forgetPassword(myForm)) ;  
        dispatch({ 
          type:FORGET_PASSWORD_RESET
       });   
    }     
    const [email , setEmail] = useState("") ;
    useEffect(() =>{ 
        if(error){ 
            alert.error(error) ; 
            dispatch(clearErrors()) ; 
        } ;    
      
        if(message){ 
            
            alert.success(message); 
            
        } 
        
    } , [dispatch , error  , alert , message]); 
    return ( 
        <Fragment>
         {loading? <Loader/>:(<Fragment>   
          <MetaData title  = "Forgot Password"/> 
            <div className="forgotPasswordContainer"> 
             <div className="forgotPasswordBox"> <div className="forgotPasswordHeading">Forgot Password</div>
             <form 
                    className='forgotPasswordForm' 
                        encType = "multipart/form-data"
                        onSubmit = {forgotPasswordSubmit} 
                    >  
                     
                    <div className="forgotPasswordEmail"> 
                    <MailOutlineIcon />
                    <input type="email" 
                    placeholder = "Email"
                    required 
                    name  ="email"
                    value = {email}
                    onChange = {(e)=>setEmail(e.target.value)}
    
                    />   
                    </div>
                     <input type="submit"
                     value ="forgotPassword"
                     className= "forgotPasswordBtn"  
                     
                     />
                    </form>  
             </div>
             </div> 
        </Fragment>)} 
        </Fragment>
      )
}

export default ForgotPassword
