import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"  
import { useSelector , useDispatch
 } from 'react-redux'
import { clearErrors , getProduct } from '../../actions/productAction'  
import Loader from '../layout/Loader/Loader'  
import Product from '../layout/Product/Product'  
import { useParams } from 'react-router-dom'   
import Pagination from "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import Typography from '@material-ui/core/Typography'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'


const categories = [
    "Laptop" , "Footwear"  , "Bottom" , 
    "Tops" , "Attire" , "Camera" , "SmartPhones"
]
const Products = () => {       
  const [ratings , setRatings] = useState(0);  

  const alert = useAlert() ; 
  const {keyword}  =  useParams();  
  const dispatch = useDispatch() ;   
  const [price , setPrice] = useState([0 , 25000]) ;   
  const priceHandler = (event , newPrice) =>{ 
       setPrice(newPrice) ; 
  }   
  
  const [currentPage , setCurrentPage]=  useState(1) ; 
  const setCurrentPageNo = (e)=>{ 
       setCurrentPage(e); 
  }
  const [category , setCategory]= useState("") 
  const {products , loading,  error , productCount , resultPerPage  , filterProductCount } = useSelector(state => state.products) ;   
  useEffect(()=>{  
       if(error){ 
         alert.error(error) ; 
         dispatch(clearErrors()) ;
       } 
       dispatch(getProduct(keyword , currentPage , price , category , ratings)) ; 
     
  } , [dispatch , keyword , currentPage , price ,category , ratings , error]) ;     
  
//   let count  = products.;  
let count = 100 ;  
  return (
<Fragment> 
    {loading ? <Loader/> : (

        <Fragment> 
           <MetaData  title ="PRODUCTS -- ECOMMERCE"/>
            <div> 
                 <h2 className='productsHeading'>Products</h2>  
                 <div className="products">   {products && products.map(product =><Product  key = {product._id} product = {product}/> )} 
                 
                 </div>
            </div>      
            <div className="filterBox">   
               <Typography>  
                   Price    
                   </Typography>
                   <Slider 
                      value ={price} 
                      onChange = {priceHandler} 
                      valueLabelDisplay ="auto" 
                      aria-labelledby = "range-slider" 
                      min = {0} 
                      max = {25000} 

                   />  
                   <Typography> 
                    Categories
                   </Typography> 
                  <ul className="categoryBox">
                    {
                        categories.map((category) =>
                        (
                       <li className="category-link"
                       key={category}
                       onClick ={()=> setCategory(category)}>

                         {category}

                       </li>

                        ))
                    } 
                  
                  </ul>  
                  <fieldset> 
                     <Typography  component = "legend"> 
                     Ratings Above  
                     </Typography>
                     <Slider value= {ratings}
                     onChange={(e , newRatings) =>  
                     {
                         setRatings(newRatings) ; 
                     }} 
                     aria-labelledby="continuous-slider"
                     min= {0} 
                     max= {5} 
                     valueLabelDisplay='auto'
                     />

                      
                  </fieldset>
                
            </div>

            { ( resultPerPage < productCount )? (
            <div className = "paginationBox">  
                 <Pagination    
                    activePage = {currentPage} 
                    itemsCountPerPage={resultPerPage} 
                    totalItemsCount = {productCount} 
                    onChange = {setCurrentPageNo} 
                    nextPageText = "Next"  
                    prevPageText= "Prev"
                    firstPageText= "1st"  
                    lastPageText = "Last" 
                    itemClass  ="page-item"
                    linkClass ="page-link"
                    activeClass  = "pageItemActive" 
                    activeLinkClass ="pageLinkActive" 
                     /> 
            </div> ): ( <div></div> )
            }
        </Fragment>
     


    )}
</Fragment>
    )
}

export default Products
