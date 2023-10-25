const User = require('../../model/user');
const bcrypt = require('bcrypt');
const expect = require('chai').expect;
const sinon = require("sinon");

describe('creating the document db', () => {
    it('Creates a new user successfully', (done) => {
        const user = new User({
            fullName: 'test',
            email: 'abc@gmail.com',
            role: 'admin',
            password: bcrypt.hashSync('test1234', 8)
        });

        expect(user.isNew).equal(true);
        user.save().then((user) => {
            expect(user.isNew).equal(false);
            done();
        }).catch(err => {
            done();

        });
    }).timeout(200000);

    it('validating the role', (done) => {
        const user = new User({
            fullName: 'test',
            email: 'abc@gmail.com',
            role: 'test',
            password: bcrypt.hashSync('test1234', 8)
        });
        user.save().catch(err=>{
        expect(err._message).equal("User Validation failed!");
        });
        done();
       
    }).timeout(5000)


    it('validadte the email id', (done) => {
        const user = new User({
            fullName: 'test',
            email: 'abc@@@gmail.com',
            role: 'admin',
            password: bcrypt.hashSync('test1234', 8)
        });
        user.save().catch(err=>{
        expect(err._message).equal("User Validation failed!");
        });
         done();

    }).timeout(10000);

    it('Validating the userName', (done) => {
        const user = new User({
            fullName: '1234',
            email: 'abc@gmail.com',
            role: 'admin',
            password: bcrypt.hashSync('test1234', 8)
        });
        user.save().catch(err=>{
         expect(err._message).equal("User Validation failed!");
        });
         done();

    }).timeout(15000);

});   

describe("stubbed test for creating documents in mongodb",()=>{
    let saveStub;
    const user = new User({
        fullName: 'test',
        email: 'abc@gmail.com',
        role: 'admin',
        password: bcrypt.hashSync('test1234', 8)
    });

    beforeEach((done)=>{
        saveStub = sinon.stub(User.prototype, 'save');
        done();
    });

    afterEach((done)=>{
        saveStub.restore();
        done();

    });

    it("should save the user",(done)=>{
        const mockUser = {_id: '123',fullName: 'test',email:'abc@gmail.com',role:"admin"};
        saveStub.resolves(mockUser);


        user.save().then((user)=>{
            expect(user).to.deep.equal(mockUser);
            expect(saveStub.calledOnce).to.be.true;
            done();

        });
    });

    it("should handle the error",(done)=>{
        const mockError = new Error("Database error");
        saveStub.rejects(mockError);

        user.save().catch((error)=>{
            expect(error).to.equal(mockError);
            expect(saveStub.calledOnce).to.be.true;
            done();
        });
 
    });     

});

describe('mocked test for creating the document',()=>{
    let userMock;

    beforeEach((done)=>{
        userMock = sinon.mock(User.prototype)
        done();
    });

    afterEach((done)=>{
        userMock.verify();
        userMock.restore();
        done();

    });

    it("should  save the user", (done)=>{
        const mockUser = {_id: '123',fullName: 'test',email:'abc@gmail.com',role:"admin"};
        userMock.expects('save').resolves(mockUser);
    

    const user = new User({
        fullName: 'test',
        email: 'abc@gmail.com',
        role: 'admin',
        password: bcrypt.hashSync('test1234', 8)
    });
    user.save().then((user)=>{
        expect(user).to.deep.equal(mockUser);
        userMock.calledAfter
        done();

    });



});


});

