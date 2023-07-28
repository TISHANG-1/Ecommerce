import { ADD_TO_CART } from "../constants/cartConstant";
import axios from "axios"  ;
import Cookies from 'js-cookie';  
 
import store from '../store';

axios.defaults.withCredentials = true ;   


export const addItemsToCart = (id , quantity)=> 
async(dispatch)=>{ 
              
        let link = `http://localhost:4000/api/v1/products/${id}`;
        await axios.get(link).then(  
            async (response)=>{  
            console.log(response) ;  
            Cookies.set('token' , response.data.token)
            dispatch({
                 type: ADD_TO_CART,
                 payload:{ 
                 product: response.data.product._id ,  
                 name : response.data.product.name , 
                 price: response.data.product.price, 
                 image: response.data.product.images[0].url,   
                 stock: response.data.product.Stock, 
                 quantity, }

             }) 
             
            
            
            localStorage.setItem('cartItems' , JSON.stringify(store.getState().cart.cartItems)) ; 
             
             
             ;} );  

       
      
      
}     

