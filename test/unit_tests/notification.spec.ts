import "mocha";
let chai = require("chai");
import { NotificationModel } from "../../src/models/notificationModel";

describe ('Testing NotificationModel Functionality:', () => {
    it('Should return the correct notification array for user 1', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.getUserNotifications(1);
        chai.expect(nInfo.length).to.equal(0);
    }).timeout(5000);
    it('Should return the correct notification array for user 1', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.getUserNotifications(1);
        chai.expect(nInfo.length).to.equal(0);
    }).timeout(5000);
});