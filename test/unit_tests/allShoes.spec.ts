import "mocha";
let chai  =require("chai");
import { ShoeModel } from "../../src/models/shoe_model";
import { Server } from "../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing allShoes Functionality:', () => {
    it( 'should not show shoes view to a non registered user', async () => {
        let xid = '100'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/'+xid+'/allShoes');
        // currently we are not handling invalid ids so we expect an internal server error.
        chai.expect(response.statusCode).to.equal(404);
    });
    it( 'should show shoes view to a registered user', async () => {
        let id = '1';
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes');
        chai.expect(response.statusCode).to.equal(200);
    });
});
