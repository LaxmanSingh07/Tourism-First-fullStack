//generatlization of the function
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError.js');
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document  found with that ID', 404));
    }
    res.status(204).json({
      status: 'sucess',
      data: null,
      message: 'Tour deleted successfully',
    });
  });

exports.updateOne= (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //updated document will be returned
      runValidators: true, // it will run the validators again
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'sucess',
      data: {
        doc,
      },
    });
  });


exports.createOne =(Model)=> catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    console.log(req.body);
    res.status(201).json({
      status: 'sucess',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    //if the popOptions exists then only populate
    
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
  
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'sucess',
      data: {
        doc,
      },
    });
  });