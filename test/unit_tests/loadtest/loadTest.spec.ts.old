import "mocha";
const chai = require("chai");
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
/*
Pre req: have the server running locally
QAS response measure: The system should not time out or make users wait over 0.75 seconds
                        for the system to respond to their reques

 */

describe('loadTesting shoelist view, /user/1/allshoes :', () => {

for(let i=0; i<1000; i++) {
    it('loadtests allShoes page', function (done) {
        chai.request('http://localhost:7000')
            .get('/user/1/allShoes')
            .end(function (err: any, res: any) {
                expect(res).to.have.status(200);
                done();
            })
    }).timeout(750);
}
})
