import "mocha";
const chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');
import { CustomerModel } from "../../../src/models/customerModel";
import { ProductModel } from "../../../src/models/productModel";
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;


describe('Testing main admin view:', () => {

for(let i=0; i<1000; i++) {
    it('loadtests admin page', function (done) {
        chai.request('http://localhost:7000')
            .get('/admin')
            .end(function (err: any, res: any) {
                expect(res).to.have.status(200);
                done();
            })
    }).timeout(750);
}
})

