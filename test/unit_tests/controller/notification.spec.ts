import "mocha";
import chai from "chai";
import { Server } from "../../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing notificationController Functionality:', () => {
    it('Notification Centre Response to correct user_id (200)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/2/notifications');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it('Notification Centre Response to incorrect user_id (404)', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/999/notifications');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);

});

