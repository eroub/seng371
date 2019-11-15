import "mocha";
import chai from "chai";
import { ShoeModel } from "../../src/models/shoe_model";
import { Server } from "../../src/app"
const request = require('supertest');

describe('Testing ShoeRouter Functionality:', () => {
    it('Notification Centre Response to correct user_id (200)', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/user/2/notifications');
        // console.log(response.status);

    });
    it('Notification Centre Response to incorrect user_id (400)', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/user/2/notifications');

    });
    it('Successfully adds a shoe to user portfolio', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/user/:id/add_shoe/:id2');

    });
    it('Fails to add a non-existent shoe to portfolio', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/user/:id/add_shoe/:id2');

    });
    it('Successfully removes shoe from portfolio', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/user/:id/remove_shoe/:id2');

    });
    it('Fails to remove a non-existent shoe from portfolio', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/user/:id/remove_shoe/:id2');

    });
});
