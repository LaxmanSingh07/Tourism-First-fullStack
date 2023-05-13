const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController');
const rateLimit=require('express-rate-limit');
const helmet = require('helmet');
// const port = 3000;
const app = express();


//1 GLOBAL MIDDLEWARES 

//set security http headers
app.use(helmet()); // it will set the http headers for security

//development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit the number of requests from the same IP
const limiter=rateLimit({
  max:3,
  windowMs:60*60*1000, // 1hour in milliseconds. after 1 hour the user can make 100 requests again
  message:'Too many requests from this IP, please try again in an hour!'
}); // status code 429 is for too many requests automatically send by the rate limit package



app.use("/api",limiter);

//body parser, reading data from body into req.body

app.use(bodyParser.json({limit:'10kb'})); // middleware // limit the size of the body to 10kb
app.use(express.urlencoded({ extended: true })); // middleware
app.use(express.static(`${__dirname}/public`)); // middleware


//test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

//3 ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`)); // if we pass anything in the next function then express will automatically assume that it is an error and it will skip all the other middlewares in the middleware stack and send the error to the global error handling middleware

});



// error handling middleware

app.use(globalErrorHandler);


module.exports = app;
