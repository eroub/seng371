import "mocha";
import chai from "chai";
import { Server } from "../../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing notificationController Functionality:', () => {
    it('notifications: return code 200 from correct user_id', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/2/notifications');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);
    it('notifications: return code 404 from incorrect user_id', async () => {
        const response = await request(serve.getExpressInstance()).get('/user/999/notifications');
        chai.expect(response.statusCode).to.equal(404);
    }).timeout(5000);
    it('add_notification (input): return code ___', async () => {
        
    }).timeout(5000);
    it('edit_notification (form): return code ___', async () => {
        
    }).timeout(5000);
    it('fulfilled: return code ___', async () => {
        
    }).timeout(5000);
    it('unfulfilled: return code ___', async () => {
        
    }).timeout(5000);
    it('remove_notification: return code ___', async () => {
        
    }).timeout(5000);
    it('add_notification (add): return code ___', async () => {
        
    }).timeout(5000);
    it('edit_notification: return code ___', async () => {
        
    }).timeout(5000);
});

