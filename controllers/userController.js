const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]; // we are checking if the allowedFields array contains the el key or not
  });
  return newObj;
};

//update the profile of the user

const updateMe = async (req, res, next) => {
  // 1> create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword',
        400
      )
    );
  }

  // we will use the findByIdAndUpdate method to update the user document
  // we are not dealing with the password here because we have already handled that in the userModel.js file
  //chagning of role is not allowed here

  //FILTERED THE UNWANTED FIELDS

  const filteredBody = filterObj(req.body, 'name', 'email'); // we are filtering the body so that the user can only update the name and email

  // 2> update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true, // it will return the new document
      runValidators: true, // it will run the validators again
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
};


const getUser=factory.getOne(User);

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! please sign instead',
  });
};


const updateUser= factory.updateOne(User);
const deleteUser = factory.deleteOne(User)

//we will not detete the user from the database but we will set the active field to false
//because in future user might want to reactivate his account

const deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      active: false,
    });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
};
