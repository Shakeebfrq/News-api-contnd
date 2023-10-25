process.env.NODE_ENV = "test";
let chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
let bcrypt = require("bcrypt");
let server = require("../../src/index");
let sinon = require("sinon");
let expect = require("chai").expect;


describe("verify the sign up flow with actual mongo db call",()=>{
    let signupBody = {
        fullName: "test",
        email: "abc@gmail.com",
        role: "admin",
        password: "test1234"

    }

    it("successfull signup",(done)=>{
        chai.request(server).post('/register').send(signupBody).end((err,res) => {
            expect(res.status).equal(200);
            expect(res.text).equal("user registration succefull")
            done();

        });
    });

    it("verifies the signup flow fails because of email validation",(done)=>{
    signupBody.email ="abc@@@gmail.com";
    chai.request(server).post('/register').send(signupBody).end((err,res)=> {
        expect(res.status).equal(500);
        console.log(res.body.message);
        done();


    });
  });

});