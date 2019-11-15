import "mocha";
let chai  =require("chai");
import { ShoeModel } from "../../src/models/shoe_model";
import { Server } from "../../src/app"
const request = require('supertest');


describe('  allShoes:', () => {

    it( ' should not shown all shoes view to a non registered user', async () => {

        let xid = '100'; //this is an example of an invalid id, a correct id should consist of only digits

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+xid+'/allShoes');

        // currently we are not handling invalid ids so we expect an internal server error.

        chai.expect(response.statusCode).to.equal(404);

    });

    it( 'should return all the shoes in db', async () => {

        let id = '1';

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes');

        // get shoes arr from response

        // query db to get all shoes

        console.log(response);
        const SM = new ShoeModel();

        const shoes:any = await SM.getAllDB();

        chai.expect(shoes.length).to.equal(3);

    });




});
