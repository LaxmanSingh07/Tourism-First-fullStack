const Tour = require("./../models/tourModel");
const express=require('express');


const getAllTours =async (req, res) => {
  try{

  //query in the mongoose is a wrapper around the mongodb query
  // console.log(req.query)



  const tours=await Tour.find(
    req.query
); // it will return all the documents in the collection


  // const tours =await Tour.find()



  //let's try with the help of the mongoose 


  //BUILD QUERY

  // const tours=await Tour.find()
  // .where('duration').equals(5)
  // .where('difficulty').equals('easy');




  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },

  });
}
catch(error)
{
  res.status(404).json({
    status: "fail",
    message: error,
  });
}
};

const getTour =async (req, res) => {

try{
  const tour=await Tour.findById(req.params.id); 
  // Tour.findOne({_id:req.params.id}) //this is also correct way to do it

  res.status(200).json({
    status: "sucess",
    data: {
      tour,
    },
  });

}
catch(error){
  res.status(404).json({
    status: "fail",
    message: error,
  });
}
  // const id = req.params.id * 1; //nice trick to convert string to number

};

// optional parameter ? using question

const createTour = async (req, res) => {

// AFTER MVC 

// const newTour=new Tour({})
// newTour.save()   // it will only work on the model created from the schema

try{
const newTour=await Tour.create(req.body);

res.status(201).json({
  status: "sucess",
  data: {
    tour: newTour,
  },
});

}
catch(err){
  res.status(400).json({
    status: "fail",
    message: "error",
  });
}

};

const updateTour = async (req, res) => {
try{
 const tour= await Tour.findByIdAndUpdate(req.params.id,req.body,{
    new:true, //updated document will be returned
    runValidators:true // it will run the validators again
  })

  res.status(200).json({
    status: "sucess",
    data: {
      // tour:tour
      tour
    }
  });
}
  catch(err){
    res.status(404).json({
      status: "fail",
      message: err 
    });
  }
}

const deleteTour = async(req, res) => {

  try{
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "sucess",
      data: null,
    });
    
  }
  catch(error){
    res.status(404).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }

  res.status(204).json({
    status: "sucess",
    data: null,
  });
};


module.exports={
    getAllTours,getTour,createTour,updateTour,deleteTour
}