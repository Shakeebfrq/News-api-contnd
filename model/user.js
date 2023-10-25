const mongoose = require('mongoose');
Schema = mongoose.Schema; //sturcture of data in db
const validator =  require("validator");

var userSchema = new Schema({
    fullName:{
        type: String,
        required:[true,'fullname not provided']

    },
    email:{
        type: String,
        unique:[true,"email already exists in db"],
        lowercase:true,
        trim:true,
        required:[true,"email not provided"],
        validate: {
            validator: function(v) {   
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(v);  
            },
            message: "Email is not in the right format"
        }
    },
    role:{
        type: String,
        enum:["normal","admin"],
        required:[true,"role not rovided"]

    },
    password:{
        type: String,
        required: [true,"password not provided"]

    },
    created:{
        type: String,
        default: Date.now
    }

    

});

module.exports = mongoose.model("User",userSchema);

