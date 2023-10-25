const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require('./mongoConnection.test.js');
const expect = require('chai').expect;


before((done)=> {
    mongoose.connect("mongodb://127.0.0.1:27017/usersTestDB",{
       useUnifiedTopology: true,
       useNewUrlParser: true
    }).then(()=>{
        console.log("connected to db...");
        done();
    }).catch((error)=>{
        console.log("some error happend");
        done();
    });
});

beforeEach((done)=>{
    console.log("running before each clause");
    mongoose.connection.collections.users.drop(()=>{
        done();
    });
});

afterEach((done)=>{
    console.log("running after each clause");
    mongoose.connection.collections.users.drop(()=>{
        done();
    });

});

after((done)=> {
    console.log("disconnecting the database.");
    mongoose.disconnect();
    done();
});