const mongoose = require('mongoose');
const Tour=require('./models/tourModel');

require("dotenv").config();
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   "<password>", process.env.DATABASE_PASSWORD
// );

const DB=process.env.DATABASE_LOCAL;

// DB=process.env.DATABASE_LOCAL;
// console.log(DB)
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// this connect method will return a promise
  
.then(con=>{
  // console.log(con.connections);
  console.log('DB connection successful');
})
.catch(err=>{
  console.log(err);
  console.log("Not able to connect to DB");
})





// const testTour=new Tour({
//   name:'The Forest Hiker`',
//   rating:4.7,
//   price:557

// });

// // //saving the document to the database

// testTour.save() //save method will return a promise
// .then(doc=>{
//   console.log(doc);
// })
// .catch(err=>{
//   console.log(err);
// });


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}....`);
});
