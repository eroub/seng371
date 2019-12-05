import "mocha";
let chai = require("chai");
import { NotificationModel } from "../../../src/models/notificationModel";

describe ('Testing NotificationModel Functionality:', () => {
    it('getUserNotifications: return array of notifications', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.getUserNotifications(1);
        chai.expect(nInfo).to.be.a('array');
    }).timeout(5000);

    it('getUserNotifications: for nonexistent user return empty array', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.getUserNotifications(444);
        chai.expect(nInfo.length).to.equal(0);
    }).timeout(5000);

    it('fulfill: return true for existing notifications', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.fulfill("5dd62647abad2534b480a0ec");
        chai.expect(nInfo).to.equal(true);
    }).timeout(5000);

    it('fulfill: return false for non-existent notification', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.fulfill("yeet");
        chai.expect(nInfo).to.equal(false);
    }).timeout(5000);

    it('addNotification: return true', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.addNotification(0,1,100,"Above");
        chai.expect(nInfo).to.equal(true);
    }).timeout(5000);

    it('remove_notif: return true for removing existing notification', async () => {
        const NM = new NotificationModel();
        const not: any = await NM.getUserNotifications(0);
        const nInfo: any = await NM.remove_notif(not[not.length-1]._id);
        chai.expect(nInfo).to.equal(true);
    }).timeout(5000);

    it('remove_notif: return false for returning non-existent notification', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.remove_notif("yeet");
        chai.expect(nInfo).to.equal(false);
    }).timeout(5000);

    it('get_notif: return true for getting existing notification', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.get_notif("5de6f71c82a52147301f9354");
        chai.expect(nInfo[0].fulfilled).to.equal(true);
    }).timeout(5000);

    it('get_notif: return undefined for non-existent notification', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.get_notif("yeet");
        chai.expect(nInfo).to.equal(undefined);
    }).timeout(5000);

    it('edit_notif: new changes should be reflected', async () => {
        const NM = new NotificationModel();
        await NM.edit_notif("5de6f71c82a52147301f9354", 1000, "Above");
        const nInfo: any = await NM.get_notif("5de6f71c82a52147301f9354");
        chai.expect(nInfo[0].threshold).to.equal(1000);
    }).timeout(5000);

    it('edit_notif: return false for editing non-existent notification', async () => {
        const NM = new NotificationModel();
        const nInfo: any = await NM.edit_notif("yeet", 1000, "Above");
        chai.expect(nInfo).to.equal(false);
    }).timeout(5000);


});
