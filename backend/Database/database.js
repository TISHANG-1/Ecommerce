const mongoose = require('mongoose') ; 

const connectDatabase = ()=>{   
console.log(process.env.PORT);
mongoose.connect(process.env.MONGOOSE_URI , { useNewUrlParser  : true ,  useUnifiedTopology : true  }).then((data)  => {
      console.log("mongoDB connect with server :"); 
      console.log(data.connection.host) ;
}) 
.catch((err)=> { 
    console.log(err) ; 
})  
}
module.exports =  connectDatabase; 