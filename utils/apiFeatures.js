class APIFeatures{
    constructor (query,queryString){
      this.query=query;
      this.queryString=queryString;
    }
  
    filter(){
      const queryObj={...this.queryString}; // this is how we make a hard copy of an object in javascript
      const excludedFields=['page','sort','limit','fields']; // we are making an array of all the fields that we want to exclude from the query string
  
      excludedFields.forEach(el=>delete queryObj[el]); // we are deleting all the fields that we dont want in the query string
      let queryStr=JSON.stringify(queryObj); // it is used to convert the query object into a string
      queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`); // this is a regular expression that will add a $ sign before the gte,gt,lte,lt in the query string
  
      this.query=this.query.find(JSON.parse(queryStr)); // this is how we write the query in the url
      return this;
    }
  
    sort(){
      if(this.queryString.sort)
      {
        const sortBy=this.queryString.sort.split(',').join(' '); // this will first split the string at the comma and then join it with a space
        this.query = this.query.sort(sortBy);
      }
      else{
        this.query=this.query.sort('-createdAt'); // - sign is used to sort in descending order
      }
    
    return this ;
  }
    limitFields(){
      if(this.queryString.fields)
      {
        const fields=this.queryString.fields.split(',').join(' ');
        console.log(fields);
        this.query=this.query.select(fields); // it will only select the fields that are mentioned in the query string
      }
      else{
        //- exclude the field
        this.query=this.query.select('-__v'); // - sign is used to exclude the field
      }
      return this;
    }
    paginate(){
      const page=this.queryString.page*1 || 1; // this is how we convert a string into a number in javascript
      const limit=this.queryString.limit*1 || 100;
      const skip=(page-1)*limit; // this is the formula to calculate the skip value
      this.query=this.query.skip(skip).limit(limit); 
      return this;
    }
  }

module.exports=APIFeatures;