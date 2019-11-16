import "mocha";
import chai from "chai";
import { Server } from "../../src/app"
const request = require('supertest');

describe('Testing routes', () => {

    it ('/user/4/shoes (Should have status 404)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).get('/user/4/shoes');
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '4')
        chai.expect(ora.statusCode).to.equal(404);
        /*.end(function (err: any, res: any) {
            if (err) throw err;
        });*/
    });

    it ('/user/2/shoes (Should have status 200)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).get('/user/2/shoes');
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '4')
        console.log(ora.res.IncomingMessage);
        chai.expect(ora.statusCode).to.equal(200);
        /*.end(function (err: any, res: any) {
            if (err) throw err;
        });*/
    });

    it ('/user/0/shoes/3 (Should have status 200)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).get('/user/0/shoes/3');
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '4')
        console.log(ora.res.IncomingMessage);
        chai.expect(ora.statusCode).to.equal(200);
        /*.end(function (err: any, res: any) {
            if (err) throw err;
        });*/
    });

    it ('/user/0/shoes/1 (Should have status 404)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).get('/user/0/shoes/1');
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '4')
        console.log(ora.res.IncomingMessage);
        chai.expect(ora.statusCode).to.equal(404);
        /*.end(function (err: any, res: any) {
            if (err) throw err;
        });*/
    });

    it ('/user/9/shoes/1 (Should have status 404)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).get('/user/9/shoes/1');
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '4')
        console.log(ora.res.IncomingMessage);
        chai.expect(ora.statusCode).to.equal(404);
        /*.end(function (err: any, res: any) {
            if (err) throw err;
        });*/
    });

    it ('/user/0/add_shoe/3 (Should have status 200)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).get('/user/0/add_shoe/3');
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '4')
        console.log(ora.res.IncomingMessage);
        chai.expect(ora.statusCode).to.equal(200);
        /*.end(function (err: any, res: any) {
            if (err) throw err;
        });*/
    });

    it ('/user/0/add_shoe/11 (Should have status 404)', async () => {
        const yeet = new Server();
        const ora = await request(yeet.getExpressInstance()).get('/user/0/add_shoes/1');
        //.expect('Content-Type', /json/)
        //.expect('Content-Length', '4')
        console.log(ora.res.IncomingMessage);
        chai.expect(ora.statusCode).to.equal(404);
        /*.end(function (err: any, res: any) {
            if (err) throw err;
        });*/
    });

});