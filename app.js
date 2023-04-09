const fs=require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;


//if we don't use then it will undefined will appear 

// app.use(express.json()); // middleware 

app.use(bodyParser.json()); // middleware
app.use(express.urlencoded({extended:true})); // middleware


const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
// console.log(`${__dirname}/dev-data/data/tours-simple.json`);



const getAllTours=(req,res)=>{
    res.status(200).json({
        status:'success',
        results:tours.length, // it make sense when we are sending array of multiple result
        data:{
            // tours:tours// no need to write the if the key and value have same name 
            tours
        }
    })
};

const getTour=(req,res)=>{
    
    // it will a automatically assign value to the variable 
    
    const id=req.params.id * 1; //nice trick to convert string to number 
    // console.log(typeof id);
    
    if(id>= tours.length)
    {
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }
    
    
    const tour=tours.find(el=>el.id===id);
    if(!tour)
    {
        return res.json(404).json({'data':tour});
    }


    // console.log(req.params); // these variable in the url is known as the parameter 
    res.status(200).json({
        status:"sucess",
        data:
        {
            tour
        }
    });
};


// optional parameter ? using question 



const createTour=(req,res)=>{
    // console.log(req.body);
    

    //new object will automatically get new id with the help of the database 
    //I am doing just hit and trial here putting the length+1 new id to the object 

    const newId=tours[tours.length-1].id+1;

    // it allow us to create a new object by mergeing previous object 

    const newTour=Object.assign({id:newId},req.body);
    tours.push(newTour);

    console.log(req.body);
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        // 201 stand for created 
        res.status(201).json({
            status:'sucess',
            data:{
                tour:newTour
            }
        });
    });
    // res.send('Done'); // always try to send somthing for sure

    

}

const updateTour=(req,res)=>{
    if(req.params.id * 1 >= tours.length)
    {
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }

    res.status(200).json({
        status:'sucess',
        data:`<Updated tour here>...`
    })
};

const deleteTour=(req,res)=>{
    if(req.params.id * 1 >= tours.length)
    {
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        });
    }

    res.status(204).json({
        status:'sucess',
        data:null
    })
};

// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.patch('/api/v1/tours/:id',deleteTour);


// chaining the route
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.listen(port, () => {
    console.log(`app running on port ${port}....`)
});


//routing means the reponse the client request 

