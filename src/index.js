const express = require("express");
const routes = require("express").Router();
const bodyParser = require("body-parser");
const newsInfo = require('../routes/newsInfo');
const {signin,signup} = require('../controllers/authController');
require("dotenv").config();
const jwt = require('jsonwebtoken');



const app = express();
app.use(routes);
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

routes.use(bodyParser.json());

const PORT = 2000;

routes.get('/',(req,res)=>{
    return res.status(200).send("welcome to the DAILYNEWS");
});

routes.use('/news', newsInfo);

routes.post('/register',signup);
routes.post('/signin',signin);




app.listen(PORT,(error)=>{
    if(!error){
        console.log("server has connected succefully");
    }else{
        console.log("error occured");
    }
});

module.exports = app;