//CREATING A SCHMEA

//in order to create a model we need to create a schema 
//here is the schema 
const mongoose = require('mongoose');

const tourSchema= new mongoose.Schema({
    name:{
      type:String,
      required:[true,'A tour must have a name'], //second is the error message
      unique:true // same name cannot be repeated
    },
    rating:{
      type:Number,
      default:4.5
    },
    price:{
      type:Number,
      required:[true,'A tour must have a price'], //this is a validator if the price is not provided then it will throw an error 
    }
  });
  
  //creating model out of it 
  
  const Tour=mongoose.model('Tour',tourSchema); // this is convention to use capital letter for model name

 // this should be only thing we export from here 

module.exports=Tour;
    