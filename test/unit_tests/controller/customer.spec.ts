import "mocha";
import chai from "chai";
import { Server } from "../../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing customerController Functionality:', () => {
    it('/user/4/shoes (Should have status 404)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/4/shoes');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);
    it('/user/2/shoes (Should have status 200)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/2/shoes');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it('/user/0/shoes/3 (Should have status 200)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/0/shoes/3');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it('/user/0/shoes/100 (Should have status 404)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/0/shoes/100');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);
    it('/user/9/shoes/1 (Should have status 404)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/9/shoes/1');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);

    it('Successfully adds a shoe to user portfolio (redirects)', async () => {
        const response = await request(serve.getExpressInstance()).post('/user/1/add_shoe/1');
        chai.expect(response.statusCode).to.equal(302);
    }).timeout(5000);
    it('Fails to add a shoe to non-existent user portfolio (404)', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).post('/user/55/add_shoe/3');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);

    it('Successfully removes shoe from portfolio (redirects)', async () => {
        const response = await request(serve.getExpressInstance()).post('/user/1/remove_shoe/1');
        chai.expect(response.statusCode).to.equal(302);
    }).timeout(5000);
    it('Fails to remove a shoe from non-existent user portfolio (404)', async () => {
        const response = await request(serve.getExpressInstance()).post('/user/999/remove_shoe/1');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);

    it(' should show a user their shoes from low to high ', async () => {
        let id = '1'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/shoes/sort/price_low');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it(' should  return 404 when for invalid ids (users shoes low to high) ', async () => {
        let id = 'xy'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/shoes/sort/price_low');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);

    it('should show a user their shoes from high to low', async () => {
        let id = '1'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/shoes/sort/price_high');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it(' should  return 404 when for invalid ids (users shoes high to low) ', async () => {
        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits
        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/shoes/sort/price_high');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);
    
    it('settings: return code ___', async () => {

    }).timeout(5000);
    it('edit_shoe: return code ___', async () => {

    }).timeout(5000);
    it('edit_username: return code ___', async () => {

    }).timeout(5000);
    
});

