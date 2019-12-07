import "mocha";
const chai = require("chai");
import { Server } from "../../../src/app"
const request = require('supertest');
import { ProductModel } from "../../../src/models/productModel";
import {NotificationModel} from "../../../src/models/notificationModel";

const serve = new Server();

describe('Testing notificationController Functionality:', () => {
    let id = 1;
    let notification_id='5dd62647abad2534b480a0ec';

    it('notifications: return code 200 from correct user_id', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/notifications');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(5000);

    it('notifications: return code 404 from incorrect user_id', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/999/notifications');

        chai.expect(response.statusCode).to.equal(404);

    }).timeout(5000);



    it('add_notification (input): return code  200', async () => {
        // ensure that there is a shoe with id 99
        const SM = new ProductModel();

        const shoe: any = await SM.add_shoe('v1.1', 99, 10, 100, 100, 'nike', 'red');

        // pre req: there is a user with user id =id, and there is a shoe with id =1 .
        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/add_notification/99');




        chai.expect(response.statusCode).to.equal(200);



    }).timeout(5000);


    it('add_notification (add): 200 (redirects)', async () => {


        const response = await request(serve.getExpressInstance()).post('/user/'+id+'/add_notification/99');

        chai.expect(response.statusCode).to.equal(302);
        //remove the shoe after making it


    }).timeout(5000);




    it('remove_notification: return code 302(redirects)', async () => {

        const NM = new NotificationModel();
        const nInfo: any = await NM.addNotification(id,99,100,"Above");

        const response = await request(serve.getExpressInstance()).post('/user/'+id+'/remove_notification/'+id);

        chai.expect(response.statusCode).to.equal(302);
        const not: any = await NM.getUserNotifications(id);
        const nrInfo: any = await NM.remove_notif(not[not.length-1]._id);

    }).timeout(5000);



    it('edit_notification (form): return code ', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/edit_notification/'+notification_id);

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(10000);


    it('edit_notification: return code 302(redirects)', async () => {

        const response = await request(serve.getExpressInstance()).post('/user/'+id+'/edit_notification/'+notification_id);

        chai.expect(response.statusCode).to.equal(302);

    }).timeout(10000);

    it('fulfilled: return code 200', async () => {

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/notifications/filter/fulfilled');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(10000);

    it('unfulfilled: return code 200', async () => {

        const SM = new ProductModel();

        const rmshoe: any = await SM.remove_shoe(99);

        const response = await request(serve.getExpressInstance()).get('/user/'+id+'/notifications/filter/unfulfilled');

        chai.expect(response.statusCode).to.equal(200);

    }).timeout(10000);



});

