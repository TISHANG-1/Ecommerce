class ApiFeatures { 
    constructor(query , queryStr){ 
          this.query  = query ; 
          this.queryStr = queryStr ; 
    }  
    search(){ 
        const keyword = this.queryStr.keyword? 
        { 
            name: {
                  $regex: this.queryStr.keyword, 
                  $options: "i",
             }
        } : {} ;  
        console.log(keyword);  
        this.query =  this.query.find({ ...keyword }) ;  
        return this ; 
    } ;  
    filter(){ 
         const queryCopy = { 
            ...this.queryStr
         }
         // Removing some fields for category  
         console.log(queryCopy); 
         const removalFields = ["keyword" , "page" , "limit"];
         removalFields.forEach(element => {
            delete queryCopy[element] ; 
         });    
         // caseInsensetive ; 
           
         let queryStr = JSON.stringify(queryCopy);  
          queryStr = queryStr.replace(
          /\b(gt|gte|lt|lte)\b/g, key => `$${key}`
          );  
         
         this.query =  this.query.find(JSON.parse(queryStr)) ; 
         return this ; 

    }  
    pagenation(resultPerPage){    

             const currentPage = Number(this.queryStr.page) ;
             const skip = resultPerPage*(currentPage-1) ;  
             console.log(skip);
             this.query = this.query.limit(resultPerPage).skip(skip) ;  
             return this ;     

          
    }

}    
module.exports = ApiFeatures ; 