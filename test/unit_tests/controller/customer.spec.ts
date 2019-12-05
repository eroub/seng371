import "mocha";
const chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');
import { CustomerModel } from "../../../src/models/customerModel";

const serve = new Server();

describe('Testing customerController Functionality:', () => {

    /*
    pre condition there must be no user with the id 999 and there must be a user with id 99
    and  there must be a shoe with id =1.
     */
    let xid =999, id=99, shoe_id='1', xshoe_id='x';
    it('/user/999/shoes (Should have status 404)', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+xid+'/shoes');

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);

    it('/user/99/shoes (Should have status 200)', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes')

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);

    it('return 404 for non existent user ', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+xid+'/shoes/'+shoe_id);

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);

    it('Gets a shoe from user 99 (should return 200)', async () => {

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/5de89f0cf27f704a0c4a5b82');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);

    it('return 404 for a user accessing non existent shoe', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/shoes/'+xshoe_id);

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);

    it('Adds a shoe to user 99\'s portfolio, gets it, edits it, then removes it', async () => {

        let response = await request(serve.getExpressInstance()).post('/user/99/add_shoe/1');
        chai.expect(response.statusCode).to.equal(302);

        const cm: any = new CustomerModel();
        const userShoes: any = await cm.getKeys(99);
        const objectID: any = userShoes[userShoes.length-1]._id;

        response = await request(serve.getExpressInstance()).post("/user/"+id+"/edit_shoe/"+objectID);
        chai.expect(response.statusCode).to.equal(302);

        response = await request(serve.getExpressInstance()).post('/user/99/remove_shoe/' + objectID);
        chai.expect(response.statusCode).to.equal(302);

    }).timeout(5000);

    it('Fails to add a shoe to non-existent user portfolio (404)', async () => {

        const serve = new Server();

        const response = await request(serve.getExpressInstance()).post('/user/'+xid+'/add_shoe/'+shoe_id);

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);

    it('Fails to remove a shoe from non-existent user portfolio (404)', async () => {

        const response = await request(serve.getExpressInstance()).post('/user/'+xid+ '/remove_shoe/'+shoe_id);

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);

    it('Fails to edit a shoe from non-existent user portfolio (302)', async () => {

        const response = await request(serve.getExpressInstance()).post('/user/'+xid+ '/edit_shoe/'+shoe_id);

        chai.expect(response.statusCode).to.equal(302);

    }).timeout(5000);

    it(' should show a user their shoes from low to high ', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/shoes/sort/current_price_low');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);
    it(' should  return 404 when for invalid ids (users shoes low to high) ', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/' + xid + '/shoes/sort/current_price_low');

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);

    it('should show a user their shoes from high to low', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/shoes/sort/current_price_high');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);
    it(' should  return 404 when for invalid ids (users shoes high to low) ', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/' + xid + '/shoes/sort/current_price_high');

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);


    it('should show a user their shoes from high to low purchase price', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/shoes/sort/purchase_price_high');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);


    it('should show a user their shoes from low to high purchase price', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/' + id + '/shoes/sort/purchase_price_low');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);


    it('settings: return code 200', async () => {
        const response = await request(serve.getExpressInstance()).get("/user/"+id+"/settings");

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);


    it('edit_username: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get("/user/"+id+"/settings");

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);

    it('edit_username: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).post("/user/"+id+"/edit_username");

        chai.expect(response.statusCode).to.equal(302);

    }).timeout(5000);
    
});

