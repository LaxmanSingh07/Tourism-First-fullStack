// review  /rating /createdAt /ref to tour /ref to user

const mongoose = require('mongoose');
const Tour = require('./tourModel');
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



reviewSchema.index({ tour: 1, user: 1 }, { unique: true }) // this will make sure that the combination of tour and user is always unique


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

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  //we will use the aggregation pipeline to calculate the average ratings

  //this points to the current model

  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        //grouping by the tour field
        _id: '$tour',
        nRating: { $sum: 1 }, //summing up the number of ratings
        avgRating: { $avg: '$rating' }, //calculating the average rating
      },
    },
  ]);

  // console.log(stats);

  if(stats.length > 0){
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  }
  else{
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchema.post('save', function () {
  //post doesn't have any access to the next function
  this.constructor.calcAverageRatings(this.tour);
});

//findByAndUpdate
//findByAndDelete

//pre middleware for findByIdAndUpdate and findByIdAndDelete

reviewSchema.pre(/^findOneAnd/, async function (next) {
  //we are using the pre middleware because we want to get access to the current document
  //findOne is the shorthand for findByIdAndUpdate and findByIdAndDelete

  //goal is to get access to the current document

  this.r = await this.clone().findOne(); //we are storing the current document in the current query
  //clone is used to create a copy of the current query object
  //it will allow us to access the document in the post middleware
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  //await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
