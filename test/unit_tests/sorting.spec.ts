import "mocha";
let chai  =require("chai");
import { ShoeModel } from "../../src/models/shoe_model";
import { Server } from "../../src/app"
const request = require('supertest');


describe('  sorting:', () => {

    it( ' should  show a user their hoes from low to high ', async () => {

        let id = '1'; //this is an example of an invalid id, a correct id should consist of only digits

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/sort/price_low');

        chai.assert(response.statusCode === 200);

    });

    it( ' should  return 404 when for invalid ids (users shoes low to high) ', async () => {

        let id = 'xy'; //this is an example of an invalid id, a correct id should consist of only digits

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/sort/price_low');

        chai.assert(response.statusCode === 404);

    });


    it( 'should show a user their hoes from high to low', async () => {

        let id = '1'; //this is an example of an invalid id, a correct id should consist of only digits

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/sort/price_high');

        chai.assert(response.statusCode === 200);


    });


    it( ' should  return 404 when for invalid ids (users shoes high to low) ', async () => {

        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/sort/price_high');

        chai.assert(response.statusCode === 404);

    });



    it( 'should sort all the shoes in db from low to high  ', async () => {

        let id = '1';

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes/sort/price_low');

        chai.assert(response.statusCode === 200);

    });


    it( ' should  return 404 when for invalid ids (all shoes low to high) ', async () => {

        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes/sort/price_low');

        chai.assert(response.statusCode === 404);

    });


    it( 'should sort all the shoes in db from high to low  ', async () => {

        let id = '1';

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes/sort/price_high');

        chai.assert(response.statusCode === 200);


    });

    it( ' should  return 404 when for invalid ids (all shoes high to low) ', async () => {

        let id = '50'; //this is an example of an invalid id, a correct id should consist of only digits

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/allShoes/sort/price_high');

        chai.assert(response.statusCode === 404);

    });







});
