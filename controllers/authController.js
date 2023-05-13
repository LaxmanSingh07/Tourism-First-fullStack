const { promisify } = require('util'); // it is a built in module
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const exp = require('constants');

console.log(User);

//function to create a token

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // this sign method will return a token
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt:req.body.passwordChangedAt,
    role:req.body.role
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body; // destructuring

  // 1> check if email and password exist

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const user = await User.findOne({ email }).select('+password'); // we are using the email as the unique identifier
  // we are using the select method to select the password field because we have set the select property to false in the schema

  // 2> check if user exists && password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3> if everything is ok, send token to client

  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  //2) Verification token

  // (promisefied version of the verify method)
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //
  console.log(decoded);

  //3) Check if user still exists
  const currUser = await User.findById(decoded.id);
  if (!currUser) {
    return next(
      new AppError('The user belonging to this token does no longer exist', 401)
    );
  }
  //4) Check if user changed password after the token was issued

  if (currUser.changeedPasswordAfter(decoded.iat)) {
    //.iat is issued at (time )
    return next(
      new AppError('User recently changed password! Please log in again', 401)
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currUser; // we are passing the user to the next middleware
  next();
});



exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles is an array ['admin','lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action!', 403)
      );
    }
    next();
  };
}

//forgot password 


exports.forgotPassword=async(req,res,next)=>{
  //1. get userr based on POSTed email 
const user=await User.findOne({email:req.body.email});
if(!user){
  return next(new AppError('There is no user with email address',404));
}
  //2 generate the random reset token (instance method on the user model)

  const resetToken=user.createPasswordResetToken();
  await user.save({validateBeforeSave:false}); // it will save the document without the required fields

  //3 send it to user's email


}