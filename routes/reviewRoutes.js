const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController');

const { protect, restrictTo } = require('./../controllers/authController');

//mergeParams: true is used to get access to the tourId from the tourRoutes.js
const router = express.Router({ mergeParams: true });
//now POST /tour/234fad4/reviews --> it will redirecte  to the reviewRouter

//GET /tour/234fad4/reviews --> nested route

router.use(protect);
router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview);
router.route('/:id').get(getReview)
router.route('/:id').patch(restrictTo("user","admin"),updateReview);
router.route('/:id').delete(restrictTo("user","admin"),deleteReview);
module.exports = router;
