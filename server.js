const mongoose = require('mongoose');
const Tour=require('./models/tourModel');

require("dotenv").config();
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   "<password>", process.env.DATABASE_PASSWORD
// );

const DB=process.env.DATABASE_LOCAL;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  
.then(con=>{
  // console.log(con.connections);
  console.log('DB connection successful');
})
.catch(err=>{
  console.log(err);
  console.log("Not able to connect to DB");
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}....`);
});
