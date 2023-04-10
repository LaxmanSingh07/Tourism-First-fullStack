const fs = require("fs");
const express=require('express');
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  if (req.params.id * 1 >= tours.length) {
    console.log(val)
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
  
    })}
  next();
  };

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or price",
    });
  }
    next();
};
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: "success",
    results: tours.length, // it make sense when we are sending array of multiple result
    requestedAt: req.requestTime,
    data: {
      // tours:tours// no need to write the if the key and value have same name
      tours,
    },
  });
};

const getTour = (req, res) => {
  // it will a automatically assign value to the variable

  const id = req.params.id * 1; //nice trick to convert string to number
  // console.log(typeof id);

  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.json(404).json({ data: tour });
  }

  // console.log(req.params); // these variable in the url is known as the parameter
  res.status(200).json({
    status: "sucess",
    data: {
      tour,
    },
  });
};

// optional parameter ? using question

const createTour = (req, res) => {
  // console.log(req.body);

  //new object will automatically get new id with the help of the database
  //I am doing just hit and trial here putting the length+1 new id to the object

  const newId = tours[tours.length - 1].id + 1;

  // it allow us to create a new object by mergeing previous object

  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  console.log(req.body);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      // 201 stand for created
      res.status(201).json({
        status: "sucess",
        data: {
          tour: newTour,
        },
      });
    }
  );
  // res.send('Done'); // always try to send somthing for sure
};

const updateTour = (req, res) => {

  

  res.status(200).json({
    status: "sucess",
    data: `<Updated tour here>...`,
  });
};

const deleteTour = (req, res) => {
  res.status(204).json({
    status: "sucess",
    data: null,
  });
};

// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.patch('/api/v1/tours/:id',deleteTour);


module.exports={
    getAllTours,getTour,createTour,updateTour,deleteTour,checkID,checkBody
}