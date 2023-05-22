//CREATING A SCHMEA

//in order to create a model we need to create a schema
//here is the schema
const slugify = require('slugify');
const mongoose = require('mongoose');
const validator = require('validator');
// const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], //second is the error message
      unique: true, // same name cannot be repeated
      maxlength: [40, 'A tour name must have less or equal than 40 characters'],
      minlength: [10, 'A tour name must have more or equal than 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'], // it will check if the name contains only characters
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        // it is used to specify the values that are allowed for the field
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above or equal 1.0'], // validator
      max: [5, 'Rating must be below or equal to 5.0'], // validator
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'], //this is a validator if the price is not provided then it will throw an error
    },
    priceDiscount: {
      type: Number,
      validate: {
        // this is a validator if the price is less than the price then it will throw an error
        validator: function (val) {
          return val < this.price; // 100<200
        },
        message: `Discount price ({VALUE}) should be below regular price`, // this is internal to mongoose not with js so we can use the value keyword
      },
    },
    summary: {
      type: String,
      trim: true, // it will remove all the white spaces from the beginning and end of the string
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String], // array of strings
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // this will not show up in the output
    },
    startDates: [Date], //It is used for multiple dates
    /**2021-03-21,11:32 mongo will try to parse  */

    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      //this is an embedded object
      //GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      //coordinates
      coordinates: [Number], //array of numbers
      address: String,
      description: String,
    },
    locations: [
      //this is an embedded object
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number, //this is the day on which the tour will take place
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User', // this is the name of the model
      },
    ],


  },
  {
    // it is used to add the options to the schema
    toJSON: { virtuals: true }, // it means that whenever there is an output of the schema it will also include the virtual properties
    toObject: { virtuals: true },
  }
);

tourSchema.index({price:1,ratingsAverage:-1}); // 1 denotes the ascending order and -1 denotes the descending order
tourSchema.index({slug:1}); 

//the reason to use the regular function is that we need this keyword in this function

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7; // duration in weeks
});

//virtual for the reviews

tourSchema.virtual('reviews', {
  ref: 'Review', // this is the name of the model
  foreignField: 'tour', // this is the name of the field in the review model
  localField: '_id', // this is the name of the field in the current model
});

// HOOKS IN MONGOOSE

// (Document Middleware) it will run before the .save() and .create() command

tourSchema.pre('save', function (next) {
  // console.log(this); // this is the current document
  // next();
  this.slug = slugify(this.name, { lower: true }); // this will create a slug for the name of the tour
  next();
});


tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); // it will find all the documents where secretTour is not equal to true

  this.start = Date.now();
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt', // it will exclude the fields from the output
  });
  next();
});

//it will run after the query has executed
tourSchema.post(/^find/, function (docs, next) {
  // console.log(docs);
  // console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE

tourSchema.pre('aggregate', function (next) {
  //adding a new stage at the beginning of the aggregation pipeline
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline()); // this is the array of all the stages in the aggregation pipeline

  next();
});

const Tour = mongoose.model('Tour', tourSchema); // this is convention to use capital letter for model name

// this should be only thing we export from here

module.exports = Tour;
