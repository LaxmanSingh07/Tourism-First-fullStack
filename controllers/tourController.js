const AppError = require('../utils/appError');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

const getAllTours=factory.getAll(Tour);
const getTour=factory.getOne(Tour,{path:'reviews'});
const createTour = factory.createOne(Tour);
const updateTour = factory.updateOne(Tour);
const deleteTour = factory.deleteOne(Tour);



//Aggregation pipeline :   it is a set of different stages that we can use to transform our documents into aggregated results

const getTourStats = catchAsync(async (req, res, next) => {
  //array of stages : stages are nothing but objects
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        // it is used to group documents together
        _id: '$difficulty',
        numTours: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
    // {
    //   $match:{_id:{$ne:'easy'}}
    // }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats, // we can also write stats:stats
    },
  });
});

const getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // converting string into a number
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates', // it will deconstruct the array field from the input documents and then output one document for each element of the array
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        // group is used to group documents together
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' }, // it will add a new field to the document
    },
    {
      $project: {
        _id: 0, // it will hide the id field
      },
    },
    {
      $sort: { numTourStarts: -1 }, // it will sort the documents -1
    },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
};
