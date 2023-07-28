const app =  require('./app') ; 
const dotenv  =  require('dotenv') ;  
const axios =  require("axios") ;
const cors = require('cors');
const cloudinary = require("cloudinary") ;   

dotenv.config({path:"C:\\Users\\tisha\\Desktop\\MERN STACK\\backend\\config.env"})  

app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(cors({origin: true, credentials: true}));


cloudinary.config(
   {
        cloud_name : process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY , 
        api_secret: process.env.CLOUDINARY_API_SECRET
   }
)
// Handling uncaught exception  

process.on("uncaughtException", (err)=>{   console.log('Error :') ; 
console.log(err.message) ; 
console.log('Shutting Down the server due to uncaught Exception'); 
server.close(()=>{
   process.exit(1); }) 

})    
const morgan  =  require('morgan') ; 
const connectDatabase =  require("./Database/database");

// connecting to database
connectDatabase(); 


app.use(morgan('tiny')) ;   


app.listen(process.env.PORT || 3000 , ()=> {console.log(`server is working on  http://localhost:${process.env.PORT}`)})  


// unhandled promise rejection
process.on("unhandledRejection" , err =>{console.log('Error :') ; 
   console.log(err.message) ; 
   console.log('Shutting Down the server due to unhandled promise'); 
   server.close(()=>{
      process.exit(1); 

   })  ;   
});   


