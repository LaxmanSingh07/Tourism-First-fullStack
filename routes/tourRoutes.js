const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const { protect, restrictTo } = require('../controllers/authController');
// const reviewController = require('./../controllers/reviewController');
const reviewRouter=require('./../routes/reviewRoutes');
const router = express.Router();

/**FOR REFERNCE */

// POST /tour/234fad4/reviews --> nested route
// parent - child relationship
// GET /tour/234fad4/reviews --> nested route
// GET /tour/234fad4/reviews/987fad7 --> nested route

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), 
//   reviewController.createReview);

//router as a middleware
router.use('/:tourId/reviews',reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  // .get( tourController.getAllTours)
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );




module.exports = router;
