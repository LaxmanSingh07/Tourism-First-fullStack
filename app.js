const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const port = 3000;
const app = express();
app.use(morgan("dev")); // middleware
app.use(bodyParser.json()); // middleware
app.use(express.urlencoded({ extended: true })); // middleware


//creating my own middleware

app.use((req, res, next) => {
  // next is the function which will call the next middleware
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


// console.log(`${__dirname}/dev-data/data/tours-simple.json`);


//Route handler

// const tourRouter = express.Router();
// const userRouter = express.Router();

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//mouting a router to a route

// chaining the route


// it will not call the middleware for the chaining route
//orders really matters

// app.use((req,res,next)=>{   // next is the function which will call the next middleware
//     console.log('Hello from the middleware');
//     next();
// });



//routing means the reponse the client request

module.exports=app;