import "mocha";
let chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing productController Functionality:', () => {
    let id = 1;

    it('should show shoes view to a registered user', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);

    it('should sort all the users shoes in db from low to high  ', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/current_price_low');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it('should  return 200 when for invalid ids (all shoes low to high) ', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/current_price_high');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);

    it('should sort all the shoes in db from high to low  ', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/retail_price_low');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it(' should  return 200 when for invalid ids (all shoes high to low) ', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/retail_price_high');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);

    it('diff_high: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/diff_high');

        chai.expect(response.statusCode).to.equal(200);



    }).timeout(5000);
    it('diff_low: return code 200', async () => {


        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/diff_low');

        chai.expect(response.statusCode).to.equal(200);


    }).timeout(5000);
    it('alpha_desc: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/alpha_desc');

        chai.expect(response.statusCode).to.equal(200);
        
    }).timeout(5000);

    it('alpha_asc: return code ___', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/alpha_asc');

        chai.expect(response.statusCode).to.equal(200);
        
    }).timeout(5000);

    it('under_retail: return code ___', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/filter/under_retail');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);

    it('add_shoe: return code 200', async () => {


        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/add_shoe/6');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);

});