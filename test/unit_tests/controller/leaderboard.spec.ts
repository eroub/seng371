import "mocha";
const chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing leaderboardController Functionality:', () => {
    let id = 1;
    let xid = 'a';

    it('leaderboard: return code 200', async () => {


        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/leaderboard');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(10000);

    it('avgNetHigh: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/leaderboard/avgNetHigh');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(10000);

    it('avgNetLow: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/leaderboard/avgNetLow');

        chai.expect(response.statusCode).to.equal(200);


    }).timeout(10000);

    it('netHigh: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/leaderboard/netHigh');

        chai.expect(response.statusCode).to.equal(200);
        
    }).timeout(10000);

    it('netLow: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/leaderboard/netLow');

        chai.expect(response.statusCode).to.equal(200);


    }).timeout(10000);
});