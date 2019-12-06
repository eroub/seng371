import "mocha";
import chai from "chai";
import { Server } from "../../../src/app"
const request = require('supertest');

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

    it('editUserForm: return 200 status', async () => {
        const response = await request(serve.getExpressInstance()).get('/admin/shoes/edit_shoe/2');
        chai.expect(response.statusCode).to.equal(200);
    }).timeout(5000);

    // it('editUser: return 302 status', async () => {
    //     const response = await request(serve.getExpressInstance()).post('/admin/shoes/edit_shoe/2');
    //     chai.expect(response.statusCode).to.equal(302);
    // }).timeout(5000);
    //
    //
    // it('addUser: return 302 status', async () => {
    //     const response = await request(serve.getExpressInstance()).post('/admin/users/add_user');
    //     chai.expect(response.statusCode).to.equal(302);
    // }).timeout(5000);
    //
    // it('delUser: return 302 status', async () => {
    //     const response = await request(serve.getExpressInstance()).post("/admin/users/del_user/2");
    //     chai.expect(response.statusCode).to.equal(302);
    // }).timeout(5000);
    //
    // it('addShoe: return 302 status', async () => {
    //
    //     const response = await request(serve.getExpressInstance()).post('/admin/users/add_shoe');
    //     chai.expect(response.statusCode).to.equal(302);
    //
    // }).timeout(5000);
    //
    // it('editShoeForm: return 302 status', async () => {
    //
    // const response = await request(serve.getExpressInstance()).get("/admin/shoes/edit_shoe/2");
    //     chai.expect(response.statusCode).to.equal(302);
    //
    // }).timeout(5000);
    //
    // it('editShoe: return 302 status', async () => {
    //
    //     const response = await request(serve.getExpressInstance()).post("/admin/shoes/edit_shoe/2");
    //     chai.expect(response.statusCode).to.equal(302);
    //
    // }).timeout(5000);
    //
    // it('delShoe: return 302 status', async () => {
    //
    //     const response = await request(serve.getExpressInstance()).post("/admin/users/del_shoe/2");
    //     chai.expect(response.statusCode).to.equal(302);
    //
    // }).timeout(5000);

});