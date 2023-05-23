const { promisify } = require('util'); // it is a built in module
const crypto = require('crypto');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
require('dotenv').config();
// console.log(User);

//function to create a token

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }); // this sign method will return a token
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  //cookie options

  // console.log( process.env.JWT_COOKIE_EXPIRES_IN )

  const cookieOptions={
      expires: new Date(
        Date.now() +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // it will convert the days into milliseconds
      ),
      httpOnly: true, // it will make sure that the cookie cannot be accessed or modified in any way by the browser
    }
  
  if(process.env.NODE_ENV==='production') cookieOptions.secure=true;//// it will send the cookie only on the encrypted connection

  res.cookie('jwt', token, cookieOptions); // we are sending the cookie to the client

//remove the password from the output
user.password=undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  createSendToken(newUser, 201, res);
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

  createSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  //1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    // console.log(token);
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  //2) Verification token

  // (promisefied version of the verify method)

  // console.log(token);
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); //
  // console.log(decoded);

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
};

//forgot password

exports.forgotPassword = async (req, res, next) => {
  //1. get userr based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address', 404));
  }
  //2 generate the random reset token (instance method on the user model)

  const resetToken = user.createPasswordResetToken();
  // console.log(resetToken)
  await user.save({ validateBeforeSave: false }); // it will save the document without the required fields

  //3 send it to user's email

  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  //  console.log(message);

  try {
    // console.log(user.email)
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 minutes)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  //1> Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex'); // it will create a hash of the reset token and then we will store it in the database
  //digest is used to convert the output of the hash into the hexadecimal format

  console.log(hashedToken);
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  console.log(user);

  //2> If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password; // we are updating the password
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save(); //we want the validators to run

  //3> Update changedPasswordAt property for the user

  //4> Log the user in, send JWT

  createSendToken(user, 200, res);
};

//this is only for the logged in user

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1> Get user from collection
  const user = await User.findById(req.user.id).select('+password');
  //2> check if posted current password is correct

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // console.log(user);

  //3> if so, update password

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save(); // we are not using the findByIdAndUpdate because we want the validators to run

  // user.findByIdAndUpdate(); // we are not using the findByIdAndUpdate because we want the validators to run

  //4> log user in, send JWT

  createSendToken(user, 200, res);
});
