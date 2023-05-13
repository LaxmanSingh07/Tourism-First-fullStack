const express = require('express');
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  updateMe,
  getUser,
} = require('./../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
} = require('./../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

//params middleware

router.patch('/updateMyPassword', protect, updatePassword);
router.patch('/updateMe', protect, updateMe);
router.route(`/`).get(getAllUsers).post(createUser);
router.route(`/:id`).get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
