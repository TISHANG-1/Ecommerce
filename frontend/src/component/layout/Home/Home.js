import React, { Fragment , useEffect } from "react" ; 
import {CgMouse} from "react-icons/cg"   
import Product from "../Product/Product.js"
import "./Home.css" ;  
import {useSelector, useDispatch} from "react-redux";
import MetaData from "../MetaData.js";
import {getProduct } from "../../../actions/productAction.js"
import Loader from "../Loader/Loader.js";
import  {useAlert} from "react-alert"
const Home  = ()=>{  

  const dispatch = useDispatch() ; 
  const {loading  , error , products ,productsCount }= useSelector(
    (state) => state.products 
  ) 
  const alert = useAlert(); 
  useEffect(()=>{   
     if(error){
         return alert.error(error) ; 
     }
     dispatch(getProduct()) ;
  } , [dispatch , error , alert]); 
  return (
       <Fragment> 
           {loading? <Loader/> : (
            <Fragment>   
      <MetaData  title = "RajKamal"/>
       <div className ="banner">
           <p>Welcome to Raj Kamal Ltd.</p>
           <h1>FIND LATEST COLLECTION OF TILES BELOW</h1>  

           <a href="#container">
              <button> 
                Scroll<CgMouse/>
              </button>
           </a>
       </div> 
       <h2 className="homeHeading">  
       Featured Product
       </h2>
       <div className="container" id="container"> 
            {products && products.map(product =><Product product = {product}/> )} 
       </div>
    </Fragment>
           )}

       </Fragment>
    )  ; 
  
}

export default  Home 

