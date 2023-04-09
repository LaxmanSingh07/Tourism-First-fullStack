const express=require('express');
const tourController=require('./../controllers/tourController');
const router=express.Router();

//params middleware

// router.param('id',(req,res,next,val)=>{
  
//   console.log(`Tour id is: ${val}`);
//   next();
// });

router.param('id',tourController.checkID);
router
.route("/")
.get(tourController.getAllTours)
.post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports=router;