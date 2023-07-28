import {
    ALL_PRODUCT_FAIL , ALL_PRODUCT_REQUEST , ALL_PRODUCT_SUCCESS, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL , 
    PRODUCT_DETAILS_SUCCESS , 
    CLEAR_ERRORS
} from "../constants/constant" ; 
import axios from "axios" ; 




export const getProduct = (keyword = "" , currentPage = 1 , price =[0 , 25000] ,category = "" , ratings = 0 )=>async(dispatch)=>{ 
   try {  
       dispatch({type: ALL_PRODUCT_REQUEST}) ;   
    let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}` ;
    if(category){ 
        link =  `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}` ;
    }
    await axios.get(link).then(  
      (response)=>{
       dispatch({
           type: ALL_PRODUCT_SUCCESS, 
           payload: response.data   
       }) ;} ).catch((err)=>{
        dispatch({ 
            type : ALL_PRODUCT_FAIL , 
            payload: err, 
         }) ;
       })
   } 
   catch(error) {  
      dispatch({ 
         type : ALL_PRODUCT_FAIL , 
         payload: error.response.data.message , 
      }) ; 
   }     
} ;
//Clearing Errors  
export const clearErrors = () => async (dispatch) =>
{ 
    dispatch({type:CLEAR_ERRORS}) ; 
} 



// getProduct Details

export const getProductDetails = (id)=>async(dispatch)=>{ 
    try {  
        dispatch({type: PRODUCT_DETAILS_REQUEST}) ; 
     await axios.get(`http://localhost:4000/api/v1/products/${id}`).then(  
       (response)=>{
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: response.data.product 
        }) ;} ).catch((err)=>{
         dispatch({ 
             type : PRODUCT_DETAILS_FAIL , 
             payload: err, 
          }) ;
        })
    } 
    catch(error) {  
       dispatch({ 
          type : PRODUCT_DETAILS_FAIL , 
          payload: error.response.data.message , 
       }) ; 
    }     
 } ;