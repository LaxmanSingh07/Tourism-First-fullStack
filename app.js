const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// const port = 3000;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// console.log(process.env.NODE_ENV);
app.use(bodyParser.json()); // middleware
app.use(express.urlencoded({ extended: true })); // middleware
app.use(express.static(`${__dirname}/public`)); // middleware

//creating my own middleware

app.use((req, res, next) => {
  // next is the function which will call the next middleware
  // console.log("Hello from the middleware");
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

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//mouting a router to a route

// chaining the route

// it will not call the middleware for the chaining route
//orders really matters

// app.use((req,res,next)=>{   // next is the function which will call the next middleware
//     console.log('Hello from the middleware');
//     next();
// });

//routing means the reponse the client request

module.exports = app;
