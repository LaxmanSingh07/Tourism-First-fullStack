const express = require('express');
const {
  aliasTopTours,
  getAllTours,
  getTour,
  getMonthlyPlan,
  getTourStats,
  createTour,
  updateTour,
  deleteTour,
  getToursWithin,
  getDistances
} = require('./../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');
const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);
  
  router.route('/distances/:latlng/unit/mi').get(getDistances);
  
  
  router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/tours-within/:distance/center/:latlng/unit/mi')
  .get(getToursWithin);
// /tours-distance?distance=223&center=-40,45,unit=mi
// /tours-distance/233/center/-40,45/unit/mi

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
