const crypto = require('crypto');
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
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date, // password reset token will expire after 10 minutes (10*60*1000)
  active: { // this is for the deletion of the user
    type: Boolean,
    default: true,
    select: false, // it will not show the active field in the output
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

userSchema.pre('save', function (next) {
  // it will run before the document is saved
  if (!this.isModified('password') || this.isNew) return next(); // if the password is not modified or the document is new then it will return next
  this.passwordChangedAt = Date.now() - 1000; // it will subtract 1 second from the current time
  //I have subtracted 1 second because sometimes the  take a little bit of time to save the document to the database
  next();
});

//query middleware

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } }); // it will find all the documents where the active field is not equal to false
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

userSchema.methods.changeedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    // if the password is changed
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); // it will convert the date into the seconds (base 10)
    // console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp; // if the token is issued before the password is changed then it will return true
  }

  //false means not changed
  return false;
};

//creating a password reset token

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex'); // it will create a random string
  //we will encrypt this token and then we will store it in the database and then we will send it to the user
  //never ever store the plain password reset token in the database
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex'); // it will create a hash of the reset token and then we will store it in the database
  //sha256 is the algorithm that we are using to create the hash
  // digest is the output of the hash

  // console.log({resetToken},this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // it will expire after 10 minutes

  return resetToken; // this is the plain token that we will send to the user
};

const User = mongoose.model('User', userSchema);
module.exports = User;
