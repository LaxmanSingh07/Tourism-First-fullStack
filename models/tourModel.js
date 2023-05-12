//CREATING A SCHMEA

//in order to create a model we need to create a schema
//here is the schema
const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], //second is the error message
      unique: true, // same name cannot be repeated
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
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'], //this is a validator if the price is not provided then it will throw an error
    },
    priceDiscount: Number,
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
  },
  {
    // it is used to add the options to the schema
    toJSON: { virtuals: true }, // it means that whenever there is an output of the schema it will also include the virtual properties
    toObject: { virtuals: true },
  }
);

//the reason to use the regular function is that we need this keyword in this function

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7; // duration in weeks
});

// HOOKS IN MONGOOSE

// (Document Middleware) it will run before the .save() and .create() command

tourSchema.pre('save', function (next) {
  // console.log(this); // this is the current document
  // next();
  this.slug = slugify(this.name, { lower: true }); // this will create a slug for the name of the tour
  next();
});

tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});


const Tour = mongoose.model('Tour', tourSchema); // this is convention to use capital letter for model name

// this should be only thing we export from here

module.exports = Tour;
