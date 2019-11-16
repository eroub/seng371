import "mocha";
import chai from "chai";
import { IndexRoute } from "../../src/routes/index";
import { ShoeModel } from "../../src/models/shoe_model";
import { Server } from "../../src/app"
const request = require('supertest');

describe('Testing Index Functionality:', () => {
    it('Index returns correct title in object', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/');

    });
    it('Index returns correct message in object', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/');

    });
    it('Index successfully creates router', async () => {
        const serve = new Server();
        const response = await request(serve.getExpressInstance()).get('/');

    });
});
