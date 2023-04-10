const express=require('express');
const tourController=require('./../controllers/tourController');
const router=express.Router();

//params middleware

// router.param('id',(req,res,next,val)=>{
  
//   console.log(`Tour id is: ${val}`);
//   next();
// });

router.param('id',tourController.checkID);

//create a check body middleware
//check if body contains the name and price property
//if not send back 400 (bad request)

//add it to the post handler stack



router
.route("/")
.get(tourController.getAllTours)
.post(tourController.checkBody,tourController.createTour);


router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports=router;