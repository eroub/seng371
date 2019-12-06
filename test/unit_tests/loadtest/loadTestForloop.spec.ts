import "mocha";
const chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');
import { CustomerModel } from "../../../src/models/customerModel";
import { ProductModel } from "../../../src/models/productModel";


describe('Testing main admin view:', () => {

    it('showAdmin: return 200 status', async () => {

        chai.request('http://localhost:7000')
            .get('/admin')


    }).timeout(5000);
});