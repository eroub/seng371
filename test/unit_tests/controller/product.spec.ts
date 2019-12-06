import "mocha";
let chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing productController Functionality:', () => {
    it('should not show shoes view to a non registered user', async () => {
        let xid = '100'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/' + xid + '/allShoes');
        // currently we are not handling invalid ids so we expect an internal server error.
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);
    it('should show shoes view to a registered user', async () => {
        let id = '1';
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);

    it('should sort all the shoes in db from low to high  ', async () => {
        let id = '1';
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/price_low');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it('should  return 404 when for invalid ids (all shoes low to high) ', async () => {
        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/price_low');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);

    it('should sort all the shoes in db from high to low  ', async () => {
        let id = '1';
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/price_high');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it(' should  return 404 when for invalid ids (all shoes high to low) ', async () => {
        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/allShoes/sort/price_high');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);

    it('diff_high: return code ___', async () => {
        
    }).timeout(5000);
    it('diff_low: return code ___', async () => {
        
    }).timeout(5000);
    it('alpha_desc: return code ___', async () => {
        
    }).timeout(5000);
    it('alpha_asc: return code ___', async () => {
        
    }).timeout(5000);
    it('under_retail: return code ___', async () => {
        
    }).timeout(5000);
    it('add_shoe: return code ___', async () => {
        
    }).timeout(5000);

});
