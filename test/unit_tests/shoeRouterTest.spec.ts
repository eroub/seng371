import "mocha";
import chai from "chai";
import { Server } from "../../src/app"
const request = require('supertest');

describe('Testing routes', () => {

    it ('Adding shoe to non-existent user (Should have status 404)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).post('/user/55/add_shoe/3');
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '4')
        chai.expect(ora.statusCode).to.equal(404);
        /*.end(function (err: any, res: any) {
            if (err) throw err;
        });*/
    });
});