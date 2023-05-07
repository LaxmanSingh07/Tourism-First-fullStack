const Tour = require("./../models/tourModel");

const aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";
  next();
};

const getAllTours =async (req, res) => {
  try{

    // console.log(req.query);
    //BUILD QUERY
    
    //1 A) Filtering
    const queryObj={...req.query}; // this is how we make a hard copy of an object in javascript
    const excludedFields=['page','sort','limit','fields']; // we are making an array of all the fields that we want to exclude from the query string

    excludedFields.forEach(el=>delete queryObj[el]); // we are deleting all the fields that we dont want in the query string

    // const query=await Tour.find(queryObj); 
    
    // .where('duration').equals(5)
    // .where('difficulty').equals('easy');
    

    //1 B) Advanced Filtering

    
  //{difficulty:'easy',duration:{$gte:5}} // this is how we write the query in the url
  // { duration: { gte: '5' }, difficulty: 'easy' } // this is the query object that is identical to the above query

    let queryStr=JSON.stringify(queryObj); // it is used to convert the query object into a string
    queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`); // this is a regular expression that will add a $ sign before the gte,gt,lte,lt in the query string

    // \g is used to find all the matches in the string
    // \b is used to find the exact match in the string

    // console.log(JSON.parse(queryStr));

    let query=Tour.find(JSON.parse(queryStr)); // this is how we write the query in the url
    // console.log(query);
    //EXECUTE QUERY

    
    //2) Sorting
    
    
    if(req.query.sort)
    {
      const sortBy=req.query.sort.split(',').join(' '); // this will first split the string at the comma and then join it with a space
      // console.log(sortBy);
      query = query.sort(sortBy);
    }
    else{
      query=query.sort('-createdAt'); // - sign is used to sort in descending order
    }

    console.log("hello",query)
   
    
    //EXECUTE QUERY


    //3) Field Limiting



    if(req.query.fields)
    {
      const fields=req.query.fields.split(',').join(' ');
      console.log(fields);
      query=query.select(fields); // it will only select the fields that are mentioned in the query string
    }
    else{
      //- exclude the field
      query=query.select('-__v'); // - sign is used to exclude the field
    }
    
    
    // 4) Pagination

    //page=2&limit=20, 1-10 page 1, 11-20 page 2, 21-30 page 3

    //some way to calulate the skip value 

    const page=req.query.page*1 || 1; // this is how we convert a string into a number in javascript
    const limit=req.query.limit*1 || 100;
    const skip=(page-1)*limit; // this is the formula to calculate the skip value


    // query=query.skip(2).limit(10); // this will skip the first 2 documents and will show the next 10 documents

    query=query.skip(skip).limit(limit); 

    if(req.query.page)
    {
      const numTours=await Tour.countDocuments();
      if(skip>=numTours) throw new Error('This page does not exist');
    }


    const  tours=await query;






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
console.log(req.body);
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
    getAllTours,getTour,createTour,updateTour,deleteTour,aliasTopTours
}