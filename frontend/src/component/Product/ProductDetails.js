import React   ,{Fragment, useEffect, useState}from 'react'
import Carousel  from "react-material-ui-carousel"  
import "./ProductDetails.css"  
import { useSelector , useDispatch  } from "react-redux"  ;
import {useParams} from "react-router-dom" ;
import {clearErrors, getProductDetails} from "../../actions/productAction" ;     
import ReactStars from "react-rating-stars-component"
import ReviewCard  from "./ReviewCard" ; 
import Loader from "../../component/layout/Loader/Loader"
import { useAlert } from 'react-alert'; 
import MetaData from '../layout/MetaData';  
import { addItemsToCart } from '../../actions/cartAction';

const ProductDetails = ({match}) => {    
  const dispatch = useDispatch() ;   
  const queryParameters = new URLSearchParams(window.location.search)
   
   
 
  const {id}  = useParams() ; 
  const {product , loading , error} =  useSelector((state)=>state.productDetails) ;  
  var count  =  0; 
  const alert =  useAlert(); 
  useEffect(()=>{   
    if(error){
      alert.error(error) ;
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id)) ; } ,  [dispatch , id]) ;  
    const [quantity , setQuantity] = useState(1) ; 
    const increaseQuantity = ()=>{   
      let qty  = quantity+1 ;   
      qty =  Math.min(qty, product.Stock)  ;
      setQuantity(qty); 
      
    }
    const addToCartHandler = ()=>{   

       
       dispatch(addItemsToCart(product._id , quantity)) ;
    }
    const decreaseQuantity = ()=>{ 
    let qty  = quantity-1 ; 
    qty  = Math.max(qty , 1) ;
    setQuantity(qty); 

  }
  const options = { 
    edit: false, 
    color:"rgba(20 , 20 , 20 , 0.1)", 
    activeColor:"tomato" ,
    value: product.ratings, 
    isHalf: true , 
    size: window.innerWidth<600 ? 20: 25 
     
  } ; 
   

  count =  0
  return (   

     <Fragment>
        { (loading == true )? <Loader/>  : ( <Fragment>   
        <MetaData title ={ `${product.name} ECOMMERCE`}/>
        <div className="ProductDetails">
           <div>   
               <Carousel> 
                   { 
                   
                   product.images && product.images.map((item , i) =>
                   (
                   <img className="CarouselImage" 
                   key = {item.url} 
                   src = {item.url} 
                   alt = {`${i} Slide`}
                   /> 
                   )) 
                    
                }
               </Carousel>
            </div>  
              
              <div>  
                   <div className="detailsBlock-1">
                    <h2>{`${product.name}`}</h2> 
                    <p>Product # {product._id}</p> 
                   </div>
                   <div className="detailsBlock-2">
                    <ReactStars {...options}/> 

                    <span>{`Reveiw ${product.numberOfReviews}`}</span>
                   </div> 
                   <div className="detailsBlock-3"> 
                   <h1>{`₹${product.price}`}</h1>   
                     <div className="detailsBlock-3-1"> 
                       <div className="detailsBlock-3-1-1"> 
                          <button  onClick = {decreaseQuantity}> -
                          </button>
                          
                          <input  
                          value  = {quantity}
                          type="number" 
                          readOnly /> 
                          <button onClick = {increaseQuantity}>+</button>
                       </div>{" "}
                       <button  onClick= {addToCartHandler} className='MyButton'>Add to Cart</button>
                     </div>
                      <p>
                        status:{" "} 
                        <b className = {product.Stock < 1 ? "redColor" : "greenColor" }> 
                         {product.Stock < 1 ?"OutOfStock" : "InStock" }
                        </b>
                      </p>
                   </div>  
                   <div className="detailsBlock-4">
                    Description : <p> 
                      {product.description}
                    </p> 
                    <button className="submitReview">Submit Review </button>
                   </div>

              </div> 
            
        </div>
        <h3 className="reviewsHeading">Reviews</h3>  
       {product.reviews && product.reviews[0] ? (
         <div className="reviews">
          {product.reviews && product.reviews.map((review)=><ReviewCard review ={review}/>) }
         </div>
        ) :(<p className = "noReviews">No Reviews Yet</p> 
        )}   
    </Fragment>)}
     </Fragment>
  )
}

export default ProductDetails
