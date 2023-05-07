const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController');
// const port = 3000;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// console.log(process.env.NODE_ENV);
app.use(bodyParser.json()); // middleware
app.use(express.urlencoded({ extended: true })); // middleware
app.use(express.static(`${__dirname}/public`)); // middleware


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
//   res.status(404).json({
//     status: "fail",
//     message: `Can't find ${req.originalUrl} on this server!`
    
// });

// const err=new Error(`Can't find ${req.originalUrl} on this server!`);

  // err.status='fail';
  // err.statusCode=404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`)); // if we pass anything in the next function then express will automatically assume that it is an error and it will skip all the other middlewares in the middleware stack and send the error to the global error handling middleware

});

// error handling middleware

app.use(globalErrorHandler);


module.exports = app;
