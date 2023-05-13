const express=require('express');
const userController=require('./../controllers/userController');  
const {signup,login}=require('./../controllers/authController');  
const router=express.Router();




router.post('/signup',signup);
router.post('/login',login);

//params middleware


router
    .route(`/`)
    .get(userController.getAllUsers)
    .post(userController.createUser);
router
  .route(`/:id`)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports=router;