
var jwt  = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = require('../model/user');
require('dotenv').config();
const dotenv = require('dotenv')

console.log("API_SECRET:",process.env.API_SECRET);


var signup = (req,res)=> {
let fullName = req.body.fullName;
let email = req.body.email;
let password = bcrypt.hashSync(req.body.password, 8);
let role = req.body.role;

const user  = new User({
    fullName: fullName,
    email: email,
    role: role,
    password: password
});
   user.save().then(data => {
    return res.status(200).send("user registration succefull");

   }).catch(err => {
    return res.status(500).send("user registration unsuccesfull");
   });
};

var signin = (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        email:email
    }).then((user)=>{
        var passwordIsValid = bcrypt.compareSync(password,user.password);
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                messsage: "Invalid password"
            });
            
        }
        var token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET,{
            expiresIn: 86400
        });
        return res.status(200).send({
            user:{
                user:user.id,
                email:user.email,
                fullName: user.fullName,

            },
            message:"log in has been succefull",
            accessToken:token
        });

    }).catch((err)=> {
        return res.status(500).send({
            message: err
         
       });

    });
};



module.exports = {signin,signup};