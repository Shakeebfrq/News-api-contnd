const newsRoutes = require('express').Router();
const newsData = require('./news.json');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');

if(process.env.NODE_ENV != 'test') {

try{
    mongoose.connect("mongodb://127.0.0.1:27017/nodedb",{ 
        useUnifiedTopology: true,
        useNewUrlParser:true
    });
    console.log("connected to db");
} catch(error){
    console.log(error);
};
};

newsRoutes.use(bodyParser.json());

newsRoutes.get('/',(req,res)=>{
    return res.status(200).json(newsData);
});



module.exports = newsRoutes;



