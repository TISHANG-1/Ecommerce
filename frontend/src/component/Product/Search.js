import React, { Fragment, useState } from 'react' 
import { useHistory, useNavigate } from "react-router-dom"  
import MetaData from '../layout/MetaData'
import "./Search.css"  
export const Search = () => { 
const navigate = useNavigate() ; 
const [keyword , setKeyword] = useState("");     
const searchSubmitHandler = (e)=>{ 
     e.preventDefault() ; 
     if(keyword.trim()) {
          navigate(`/products/${keyword}`) ; 
           
        //    window.location.reload(true);
         
      } 
      else{
        navigate("/products") ;   
        //  history.go() ;
        //   window.location.reload(true);
         
       }
}
  return (

    <Fragment>
        <MetaData title = "SEARCH A PRODUCT"/>
        <form className= "searchBox" onSubmit = {searchSubmitHandler}> 
            <input type="text"  placeholder='Search a Product ....'  onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search"/>  
        </form>

    </Fragment>
  )
}


