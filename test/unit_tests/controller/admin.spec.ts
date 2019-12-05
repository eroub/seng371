import "mocha";
const chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');
import { CustomerModel } from "../../../src/models/customerModel";
import { ProductModel } from "../../../src/models/productModel";

const serve = new Server();

describe('Testing main admin view:', () => {

    it('showAdmin: return 200 status', async () => {
        const response = await request(serve.getExpressInstance()).get('/admin');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);

    it('shoeAllUsers: return 200 status', async () => {
        const response = await request(serve.getExpressInstance()).get('/admin/users');
        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);

    it('shoeAllShoes: return 200 status', async () => {
        const response = await request(serve.getExpressInstance()).get('/admin/shoes');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);


    it('add/edit/delUser: adds, gets the edit form for, edits, and deletes a new user', async () => {
        let response = await request(serve.getExpressInstance()).post('/admin/users/add_user');
        chai.expect(response.statusCode).to.equal(302);

        const cm = new CustomerModel();
        const users = await cm.get_users();
        const userID = users[users.length-1].user_id;

        response = await request(serve.getExpressInstance()).get('/admin/users/edit_user/' + userID);
        chai.expect(response.statusCode).to.equal(200);

        response = await request(serve.getExpressInstance()).post('/admin/users/edit_user/' + userID);
        chai.expect(response.statusCode).to.equal(302);

        response = await request(serve.getExpressInstance()).post("/admin/users/del_user/" + userID);
        chai.expect(response.statusCode).to.equal(302);
     }).timeout(5000);

     it('add/edit/delShoe: adds, gets the edit for for, edits, and deletes a new shoe', async () => {

         let response = await request(serve.getExpressInstance()).post('/admin/shoes/add_shoe');
         chai.expect(response.statusCode).to.equal(302);

         const pm = new ProductModel();
         const shoes = await pm.getAllDB();
         const shoeID = shoes[shoes.length-1].shoe_id;

         response = await request(serve.getExpressInstance()).get("/admin/shoes/edit_shoe/" + shoeID);
         chai.expect(response.statusCode).to.equal(200);

         response = await request(serve.getExpressInstance()).post("/admin/shoes/edit_shoe/" + shoeID);
         chai.expect(response.statusCode).to.equal(302);

         response = await request(serve.getExpressInstance()).post("/admin/shoes/del_shoe/" + shoeID);
         chai.expect(response.statusCode).to.equal(302);

     }).timeout(5000);

});