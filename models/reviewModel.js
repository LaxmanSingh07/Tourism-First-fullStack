// review  /rating /createdAt /ref to tour /ref to user

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId, //parent referencing
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.'],
    },
  },

  // virtual properties are the properties that we can define on the schema but they will not be persisted in the database
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// it is for the populate method
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo', // we are selecting the name and photo field because we don't want to send the password and other sensitive data to the client
  // });

  this.populate({
    path: 'user',
    select: 'name photo', // we are selecting the name and photo field because we don't want to send the password and other sensitive data to the client
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;

