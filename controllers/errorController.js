const AppError = require('./../utils/appError');
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; //errmsg is the error message that we get from the mongo db
  console.log(value);
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //operational, trusted error; send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or other unknown error: don't leak error details
  } else {
    //1> log error
    // console.log("Error",err);

    //2> Send generate messge

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack)
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error = { ...err }; // hard copy of the error object

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    console.log(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // this is the error code for duplicate fields 11000 is the error code for duplicate fields

    sendErrorProd(error, res);
  }
};
