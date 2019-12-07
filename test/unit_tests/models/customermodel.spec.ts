import "mocha";
let chai = require("chai");
import { CustomerModel } from "../../../src/models/customerModel";

describe ('Testing CustomerModel Functionality:', () => {
    it('userInfo: return the correct specified user, 1', async () => {
        const UM = new CustomerModel();
        const uInfo: any = await UM.userInfo(1);
        chai.expect(uInfo[0].user_id).to.equal(1);
    }).timeout(5000);
    it('isUser: should return true, id:1', async () => {
        const UM = new CustomerModel();
        const user: any = await UM.isUser(1);
        chai.expect(user).to.not.equal(false);
    }).timeout(5000);
    it('isUser: should return false, id:99', async () => {
        const UM = new CustomerModel();
        const user: any = await UM.isUser(9999);
        chai.expect(user).to.equal(false);
    }).timeout(5000);
    it('getKeys: should return userKeys', async () => {
        const UM = new CustomerModel();
        const keys: any = await UM.getKeys(1);
        chai.expect(keys).to.be.a('array')
    }).timeout(5000);
    it('getUsers: should return user array', async () => {
        const UM = new CustomerModel();
        const users: any = await UM.get_users();
        chai.expect(users).to.be.a('array')
    }).timeout(5000);
    it('get_all_keys: should return key array', async () => {
        const UM = new CustomerModel();
        const allKeys: any = await UM.get_all_keys();
        chai.expect(allKeys).to.be.a('array')
    }).timeout(5000);
    it('add_user: should return true', async () => {
        const UM = new CustomerModel();
        const newUser: any = await UM.add_user(777, 'hello');
        chai.expect(newUser).to.equal(true)
    }).timeout(5000);
    it('edit_username: should return true', async () => {
        const UM = new CustomerModel();
        const editedUser: any = await UM.edit_userName(777, 'world');
        chai.expect(editedUser).to.equal(true)
    }).timeout(5000);
    it('add_shoe: should return true', async () => {
        const UM = new CustomerModel();
        const shoeAdded: boolean = await UM.add_shoe(777, 99, 100);
        chai.expect(shoeAdded).to.equal(true);
    }).timeout(5000);
    it('edit_shoe: should return true', async () => {
        const UM = new CustomerModel();
        const shoeEdited: boolean = await UM.edit_shoe(777, 999);
        chai.expect(shoeEdited).to.equal(true);
    }).timeout(5000);
    it('remove_shoe: should return true', async () => {
        const UM = new CustomerModel();
        const shoeRemoved: boolean = await UM.remove_shoe(99);
        chai.expect(shoeRemoved).to.equal(true);
    }).timeout(5000);
    it('delete_user: should return true', async () => {
        const UM = new CustomerModel();
        const editedUser: any = await UM.remove_user(777);
        chai.expect(editedUser).to.equal(true)
    }).timeout(5000);
});