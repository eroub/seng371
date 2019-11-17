import "mocha";
import chai from "chai";
import { ShoeModel } from "../../src/models/shoe_model";
import { Server } from "../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing ShoeRouter Functionality:', () => {
    it('Notification Centre Response to correct user_id (200)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/2/notifications');
        chai.expect(response.statusCode).to.equal(200);
    });
    it('Notification Centre Response to incorrect user_id (404)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/999/notifications');
        chai.expect(response.statusCode).to.equal(404);
    });
    it('Successfully adds a shoe to user portfolio (redirects)', async () => {
        const response = await request(serve.getExpressInstance()).post('/user/1/add_shoe/1');
        chai.expect(response.statusCode).to.equal(302);
    });
    it('Fails to add a shoe to non-existent user portfolio (404)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).post('/user/55/add_shoe/3');
        chai.expect(ora.statusCode).to.equal(404);
    });
    it('Successfully removes shoe from portfolio (redirects)', async () => {
        const response = await request(serve.getExpressInstance()).post('/user/1/remove_shoe/1');
        chai.expect(response.statusCode).to.equal(302);
    });
    it('Fails to remove a shoe from non-existent user portfolio (404)', async () => {
        const response = await request(serve.getExpressInstance()).post('/user/999/remove_shoe/1');
        chai.expect(response.statusCode).to.equal(404);
    });
});

