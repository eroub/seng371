import "mocha";
const chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');

const serve = new Server();

describe('Testing notificationController Functionality:', () => {
    let id = 1;
    let notification_id='5de6f98778a1291e244e3992';

    it('notifications: return code 200 from correct user_id', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/2/notifications');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);

    it('notifications: return code 404 from incorrect user_id', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/999/notifications');

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);



    it('add_notification (input): return code  200', async () => {

        //const response = await request(serve.getExpressInstance()).get('/user/'+id+'/add_notification/'+id);

        const response = await request(serve.getExpressInstance()).get('/user/1/add_notification/6');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);


    it('add_notification (add): 200 (redirects)', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/add_notification/'+id);

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);




    it('remove_notification: return code 302(redirects)', async () => {

        const response = await request(serve.getExpressInstance()).post('/user/'+id+'/remove_notification/'+id);

        chai.expect(response.statusCode).to.equal(302);

    }).timeout(5000);



    it('edit_notification (form): return code ', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/edit_notification/'+notification_id);

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(10000);


    it('edit_notification: return code 302(redirects)', async () => {

        const response = await request(serve.getExpressInstance()).post('/user/'+id+'/edit_notification/'+id);

        chai.expect(response.statusCode).to.equal(302);

    }).timeout(10000);

    it('fulfilled: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/notifications/filter/fulfilled');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(10000);

    it('unfulfilled: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/notifications/filter/unfulfilled');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(10000);



});

