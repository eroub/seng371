import "mocha";
let chai  =require("chai");
import { ShoeModel } from "../../src/models/shoe_model";
import { Server } from "../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing Sorting Functionality:', () => {
    it( ' should  show a user their hoes from low to high ', async () => {
        let id = '1'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/sort/price_low');
        chai.expect(response.statusCode).to.equal(200);
    });
    it( ' should  return 404 when for invalid ids (users shoes low to high) ', async () => {
        let id = 'xy'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/sort/price_low');
        chai.expect(response.statusCode).to.equal(404);
    });
    it( 'should show a user their shoes from high to low', async () => {
        let id = '1'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/sort/price_high');
        chai.expect(response.statusCode).to.equal(200);
    });
    it( ' should  return 404 when for invalid ids (users shoes high to low) ', async () => {
        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/sort/price_high');
        chai.expect(response.statusCode).to.equal(404);
    });
    it( 'should sort all the shoes in db from low to high  ', async () => {
        let id = '1';
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes/sort/price_low');
        chai.expect(response.statusCode).to.equal(200);
    });
    it( ' should  return 404 when for invalid ids (all shoes low to high) ', async () => {
        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes/sort/price_low');
        chai.expect(response.statusCode).to.equal(404);
    });
    it( 'should sort all the shoes in db from high to low  ', async () => {
        let id = '1';
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes/sort/price_high');
        chai.expect(response.statusCode).to.equal(200);
    });
    it( ' should  return 404 when for invalid ids (all shoes high to low) ', async () => {
        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes/sort/price_high');
        chai.expect(response.statusCode).to.equal(404);
    });
});
