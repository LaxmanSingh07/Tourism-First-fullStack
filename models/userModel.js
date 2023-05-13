const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have a email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false, // it will not show the password in the output
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //this only works on create and save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

//pre-save middleware

//between getting the data and saving to the database

userSchema.pre('save', async function (next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12); //12  is also know as the cost parameter

  //Delete passwordConfirm field
  this.passwordConfirm = undefined; // we don't want to persist the passwordConfirm in the database
  next();
});

//instance method: methods that are available on all the documents of a certain collection

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword); // this will return true or false
  // both the passwords are encrypted then it will compare them
};

const User = mongoose.model('User', userSchema);
module.exports = User;
