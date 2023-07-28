import { 
    LOGIN_REQUEST , 
    LOGIN_FAIL , 
    LOGIN_SUCCESS , 
    CLEAR_ERRORS,  
    REGISTER_USER_FAIL ,  
    REGISTER_USER_REQUEST ,   
    REGISTER_USER_SUCCESS , 
    LOAD_USER_FAIL ,  
    LOAD_USER_REQUEST ,   
    LOAD_USER_SUCCESS , 
    LOGOUT_USER_FAIL , 
    LOGOUT_USER_SUCCESS , UPDATE_PROFILE_FAIL , 
    UPDATE_PROFILE_REQUEST ,
    UPDATE_PROFILE_SUCCESS,    
    UPDATE_PASSWORD_FAIL , 
    UPDATE_PASSWORD_REQUEST ,
    UPDATE_PASSWORD_RESET , 
    UPDATE_PASSWORD_SUCCESS ,  
    FORGET_PASSWORD_FAIL, 
    FORGET_PASSWORD_REQUEST , 
    FORGET_PASSWORD_SUCCESS, 
    FORGET_PASSWORD_RESET,  
    RESET_PASSWORD_FAIL , 
    RESET_PASSWORD_REQUEST ,
    RESET_PASSWORD_RESET , 
    RESET_PASSWORD_SUCCESS , 
    

}  from "../constants/userConstant" ; 
import axios from "axios"  ;
import Cookies from 'js-cookie';  
axios.defaults.withCredentials = true ; 
export const login = (email , password)=> 
async(dispatch)=>{ 
      try {   
        await dispatch({type: LOGIN_REQUEST}) ;    
        const config = {headers: {"content-Type": "application/json"} }
        let link = `http://localhost:4000/api/v1/login`;
        await axios.post(link  , {email , password} , config).then(  
            async (response)=>{  
            console.log(response) ;  
            Cookies.set('token' , response.data.token)
             await  dispatch({
                 type: LOGIN_SUCCESS,
                 payload: response.data.user
             }) ;} ).catch((error)=>{
               dispatch({ 
                  type : REGISTER_USER_FAIL , 
                  payload: error.response.data.message, 
               }) ;
             }) ;  

      }  
      catch(error){ 
          dispatch({
            type: REGISTER_USER_FAIL , 
            payload: error.response.message
          })
      }
      
}     



export const loadUser= ()=> 
async(dispatch)=>{ 
      try {   
        await dispatch({type: LOAD_USER_REQUEST}) ;    
     
        let link = `http://localhost:4000/api/v1/me`;
        await axios.get(link).then(  
            async (response)=>{
             await  dispatch({
                 type: LOAD_USER_SUCCESS,
                 payload: response.data.user
             }) ;} ).catch((error)=>{
               dispatch({ 
                  type : LOAD_USER_FAIL , 
                  payload: error.response.data.message, 
               }) ;
             }) ;  

      }  
      catch(error){ 
          dispatch({
            type: LOAD_USER_FAIL , 
            payload: error.response.message
          })
      }
      
}     




export const logout= ()=> 
async(dispatch)=>{ 
      try {   
       
     
        let link = `http://localhost:4000/api/v1/logout`;
        await axios.get(link).then(  
            async (response)=>{
             await  dispatch({
                 type: LOGOUT_USER_SUCCESS,
                 
             }) ;} ).catch((error)=>{
               dispatch({ 
                  type : LOGOUT_USER_FAIL , 
                  payload: error.response.data.message, 
               }) ;
             }) ;  

      }  
      catch(error){ 
          dispatch({
            type: LOGOUT_USER_FAIL , 
            payload: error.response.message
          })
      }
      
}     





// Register User

export const register = (userdata)=> 
async(dispatch)=>{ 
      try {   
        await dispatch({type: REGISTER_USER_REQUEST}) ;     

        const config = {headers: {"content-Type": "multipart/form-data"} } 

        let link = `http://localhost:4000/api/v1/register`;
        await axios.post(link  , userdata, config).then(  
            async (response)=>{
             await  dispatch({
                 type: REGISTER_USER_SUCCESS, 
                 payload: response.data.user
             }) ;} ).catch((error)=>{
               dispatch({ 
                  type : REGISTER_USER_FAIL , 
                  payload: error.response.data.message, 
               }) ;
             }) ;  

      }  
      catch(error){ 
          dispatch({
            type: LOGIN_FAIL , 
            payload: error.response.message
          })
      }
      
}  
   

// Update profile 

export const updatePassword = (password)=> 
async(dispatch)=>{ 
      try {   
        await dispatch({type: UPDATE_PASSWORD_REQUEST }) ;     

        const config = {headers: {"content-Type": "application/json"} } 

        let link = `http://localhost:4000/api/v1/password/update`;
        await axios.put(link  , password, config).then(  
            async (response)=>{
             await  dispatch({
                 type: UPDATE_PASSWORD_SUCCESS, 
                 payload: response.data.success 
             }) ;} ).catch((error)=>{  
                console.log(error) ;
               dispatch({ 
                  type : UPDATE_PASSWORD_FAIL , 
                  payload: error.response.message, 
               }) ;
             }) ;  

      }  
      catch(error){   
          console.log(error) ;
          dispatch({
            type: UPDATE_PASSWORD_FAIL ,  
            payload: error.response.message
          })
      }
      
}  

//


export const updateProfile = (userdata)=> 
async(dispatch)=>{ 
      try {   
        await dispatch({type: UPDATE_PROFILE_REQUEST }) ;     

        const config = {headers: {"content-Type": "multipart/form-data"} } 

        let link = `http://localhost:4000/api/v1/me/update`;
        await axios.put(link  , userdata, config).then(  
            async (response)=>{
             await  dispatch({
                 type: UPDATE_PROFILE_SUCCESS, 
                 payload: response.data.success 
             }) ;} ).catch((error)=>{  
                console.log(error) ;
               dispatch({ 
                  type : UPDATE_PROFILE_FAIL , 
                  payload: error.response.message, 
               }) ;
             }) ;  

      }  
      catch(error){   
          console.log(error) ;
          dispatch({
            type: UPDATE_PROFILE_FAIL ,  
            payload: error.response.message
          })
      }
      
}  
 
export const forgetPassword = (email , password)=> 
async(dispatch)=>{ 
      try {   
        await dispatch({type: FORGET_PASSWORD_REQUEST}) ;    
        const config = {headers: {"content-Type": "application/json"} }
        let link = `http://localhost:4000/api/v1/password/forgot`;

        await axios.post(link  , {email} , config).then(  
            async (response)=>{  
            console.log(response) ;  
            Cookies.set('token' , response.data.token)
             await  dispatch({
                 type: FORGET_PASSWORD_SUCCESS,
                 payload: response.data.message
             }) ;} ).catch((error)=>{
               dispatch({ 
                  type : 
                  FORGET_PASSWORD_FAIL , 
                  payload: error.response.data.message, 
               }) ;
             }) ;  

      }  
      catch(error){ 
          dispatch({
            type: FORGET_PASSWORD_FAIL , 
            payload: error.response.message
          })
      }
      
}      

export const resetPassword = (token  , passwords)=> 
async(dispatch)=>{ 
      try {   
        await dispatch({type: RESET_PASSWORD_REQUEST}) ;    
        const config = {headers: {"content-Type": "application/json"} }
        let link = `http://localhost:4000/api/v1/password/reset/${token}`;

        await axios.put (link  , passwords , config).then(  
            async (response)=>{  
            console.log(response) ;  
            Cookies.set('token' , response.data.token)
             await  dispatch({
                 type: RESET_PASSWORD_SUCCESS,
                 payload: response.data.message
             }) ;} ).catch((error)=>{
               dispatch({ 
                  type : 
                  RESET_PASSWORD_FAIL , 
                  payload: error.response.data.message, 
               }) ;
             }) ;  

      }  
      catch(error){ 
          dispatch({
            type: RESET_PASSWORD_FAIL , 
            payload: error.response.message
          })
      }
      
}  
//Clearing Errors  
export const clearErrors = () => async (dispatch) =>
{ 
    dispatch({type:CLEAR_ERRORS}) ; 
} 

  

