import "mocha";
let chai = require("chai");
import { NotificationModel } from "../../../src/models/notificationModel";

describe ('Testing NotificationModel Functionality:', () => {
    it('Trying to get notifications for user 1 (should return the correct notification array for user 1)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.getUserNotifications(1);
        chai.expect(nInfo.length).to.equal(0);
    }).timeout(5000);

    it('Trying to get notifications for user 4 (should return an empty array)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.getUserNotifications(4);
        chai.expect(nInfo.length).to.equal(0);
    }).timeout(5000);

    it('Trying to fulfill an existing notification (should return true)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.fulfill("5dd62647abad2534b480a0ec");
        chai.expect(nInfo).to.equal(true);
    }).timeout(5000);

    it('Trying to fulfill a nonexistent notification (should return false)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.fulfill("yeet");
        chai.expect(nInfo).to.equal(false);
    }).timeout(5000);

    it('Trying to add a notification (should return true)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.addNotification(0,1,100,"Above");
        chai.expect(nInfo).to.equal(true);
    }).timeout(5000);

    it('Trying to remove an existing notification (should return true)', async () => {
        const NM = new NotificationModel();
        const not: any = await NM.getUserNotifications(0);
        const nInfo: any = await NM.remove_notif(not[not.length-1]._id);
        chai.expect(nInfo).to.equal(true);
    }).timeout(5000);

    it('Trying to remove a nonexistent notification (should return false)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.remove_notif("yeet");
        chai.expect(nInfo).to.equal(false);
    }).timeout(5000);

    it('Trying to get an existing notification (should return the correct notification)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.get_notif("5dd62647abad2534b480a0ec");
        chai.expect(nInfo[0].fulfilled).to.equal(true);
    }).timeout(5000);

    it('Trying to get a nonexistent notification (should return nothing)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.get_notif("yeet");
        chai.expect(nInfo).to.equal(undefined);
    }).timeout(5000);

    it('Trying to edit an existing notification (new changes should be present)', async () => {
        const NM = new NotificationModel();
        await NM.edit_notif("5dd62647abad2534b480a0ec", 1000, "Above");
        const nInfo: any = await NM.get_notif("5dd62647abad2534b480a0ec");
        chai.expect(nInfo[0].threshold).to.equal(1000);
    }).timeout(5000);

    it('Trying to edit an nonexistent notification (should return false)', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.edit_notif("yeet", 1000, "Above");
        chai.expect(nInfo).to.equal(false);
    }).timeout(5000);


});