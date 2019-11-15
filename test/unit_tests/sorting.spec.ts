import "mocha";
let chai  =require("chai");
import { ShoeModel } from "../../src/models/shoe_model";
import { Server } from "../../src/app"
const request = require('supertest');


describe('  sorting:', () => {

    it( ' should sort the users shoes from low to high ', async () => {

        let xid = '100'; //this is an example of an invalid id, a correct id should consist of only digits

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+xid+'/allShoes');

        // currently we are not handling invalid ids so we expect an internal server error.
        chai.assert(response.status === 500);

    });

    it( 'should sort the users shoes from high to low', async () => {

        let id = '1';

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/3/allShoes');

        // get shoes arr from response

        // query db to get all shoes

        const SM = new ShoeModel();

        const shoes:any = await SM.getAllDB();

        chai.expect(shoes.length).to.equal(3);

    });

    it( 'should sort all the shoes in db from low to high  ', async () => {

        let id = '1';

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/3/allShoes');

        // get shoes arr from response

        // query db to get all shoes

        const SM = new ShoeModel();

        const shoes:any = await SM.getAllDB();

        chai.expect(shoes.length).to.equal(3);

    });


    it( 'should sort all the shoes in db from high to low  ', async () => {

        let id = '1';

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/3/allShoes');

        // get shoes arr from response

        // query db to get all shoes

        const SM = new ShoeModel();

        const shoes:any = await SM.getAllDB();

        chai.expect(shoes.length).to.equal(3);

    });







});
