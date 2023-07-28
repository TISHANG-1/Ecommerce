import React, { Fragment , useRef, useState , useEffect } from 'react'
import "./UpdateProfile.css" 
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'  
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import FaceIcon from  "@material-ui/icons/Face"  ;     
import {useDispatch , useSelector } from "react-redux" ; 
import { updateProfile , clearErrors , loadUser} from '../../../actions/userAction'
import {useAlert } from "react-alert" ;  
import { useNavigate } from 'react-router';
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstant'  
import MetaData from '../MetaData'
const UpdateProfile = () => {  
  const history = useNavigate();
  const dispatch = useDispatch();
  const alert  = useAlert() ;  
  const {user} = useSelector(state=>state.user) ;       
  const {error , isUpdated , loading} = useSelector((state)=>state.profile)
  const [name , setName] =  useState("") ;   
  const [email , setEmail] = useState(
      "" ) ;
  const [avatar , setAvatar] = useState() ;
    const [avatarPreview ,setAvatarPreview ] = useState("/profile.png") ;   
    const updateProfileSubmit  =(e) => { 
      e.preventDefault() ;  

      const myForm  = new FormData() ;   

      myForm.set("name" , name) ;  
      myForm.set("email" , email) ; 
      myForm.set("avatar" , avatar) ;    
        
      dispatch(updateProfile(myForm)) ;  
      dispatch({ 
        type: UPDATE_PROFILE_RESET
     });   

      
}    
const updateProfileDataChange = (e) =>{ 
    if(e.target.name ==="avatar"){ 
         const reader=  new FileReader();   
         reader.onload = ()=>{ 
             if(reader.readyState === 2){ 
                 setAvatarPreview(reader.result);  
                 setAvatar(reader.result) ;  
             }
         } ;   
         reader.readAsDataURL(e.target.files[0]);
    } 
} 

useEffect(() =>{ 
    if(error){ 
        alert.error(error) ; 
        dispatch(clearErrors()) ; 
    } ;    
    if(user){ 
       setName(user.name) ; 
       setEmail(user.email) ;  
       setAvatarPreview(user.avatar.url); 
    }  
    if(isUpdated){ 
        
        dispatch({ 
            type: UPDATE_PROFILE_RESET
         });   
         alert.success("Profile is Updated Successfully"); 
         history("/account");
         dispatch(loadUser());     
          
    } 
    
} , [dispatch , error  , alert , isUpdated])

  return ( 
    <Fragment>
     {loading? <Loader/>:(<Fragment>   
      <MetaData title  = "Update Profile"/> 
        <div className="updateProfileContainer"> 
         <div className="updateProfileBox"> <div className="updateProfileHeading">Update Profile</div>
         <form 
                className='updateProfileForm' 
                    encType = "multipart/form-data"
                    onSubmit = {updateProfileSubmit} 
                >  
                <div className="updateProfileName">
                <FaceIcon/>  
                <input type="text" placeholder='Name' 
                required  
                name = "name" 
                value = {name} 
                onChange = {(e)=>setName(e.target.value)}
                />
                </div>  
                <div className="updateProfileEmail"> 
                <MailOutlineIcon />
                <input type="email" 
                placeholder = "Email"
                required 
                name  ="email"
                value = {email}
                onChange = {(e)=>setEmail(e.target.value)}

                />   
                </div>
                 <div id="updateProfileImage">  
                 <img src={avatarPreview} alt="Avatar Preview" />   
                 <input type="file" 
                 name = "avatar"
                 accept ="image/"
                 onChange = {updateProfileDataChange}
                  />
                 </div>  
                 <input type="submit"
                 value ="UpdateProfile"
                 className= "updateProfileBtn"  
                 
                 />
                </form>  
         </div>
         </div> 
    </Fragment>)} 
    </Fragment>
  )
}

export default UpdateProfile
