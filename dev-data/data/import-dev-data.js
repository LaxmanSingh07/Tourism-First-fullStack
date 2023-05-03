//this is an excercise nothing more than that 
const mongoose = require('mongoose');
const app = require('./app');
const Tour=require('./../../models/tourModel');
const fs=require('fs');
require("dotenv").config();

const DB = process.env.DATABASE.replace(
  "<password>", process.env.DATABASE_PASSWORD
);


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


// READ JSON FILE 

const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8')); 

// IMPORT DATA INTO DB 

const importData=async()=>{

    try{
        await Tour.create(tours); // array of objects is passing it will create a document for each object
        console.log('Data successfully loaded');
    }
    catch(err){


    }

}

// DELETE ALL DATA FROM DB

const deleteData=async()=>{
    try{
        await Tour.deleteMany(); // it will delete all the documents from the collection
        console.log('Data successfully deleted');
    }
    catch(err){
        console.log(err);

    }
}

console.log(process.argv); // this will print the array of arguments that we have passed in the terminal






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}....`);
});
