import "mocha";
let chai = require("chai");
import { CustomerModel } from "../../../src/models/customerModel";

describe ('Testing CustomerModel Functionality:', () => {
    it('userInfo: return the correct specified user, 1', async () => {
        const UM = new CustomerModel();
        const uInfo: any = await UM.userInfo(1);
        chai.expect(uInfo[0].user_id).to.equal(1);
    }).timeout(5000);
    it('add_shoe: should return true', async () => {
        const UM = new CustomerModel();
        const shoeAdded: boolean = await UM.add_shoe(0, 99, 100);
        chai.expect(shoeAdded).to.equal(true);
    }).timeout(5000);
    it('remove_shoe: should return true', async () => {
        const UM = new CustomerModel();
        const shoeRemoved: boolean = await UM.remove_shoe(99);
        chai.expect(shoeRemoved).to.equal(true);
    }).timeout(5000);
    it('edit_shoe: should return true', async () => {
        
    }).timeout(5000);
    it('isUser: should return true, id:1', async () => {
        
    }).timeout(5000);
    it('isUser: should return false, id:99', async () => {
        
    }).timeout(5000);
    it('getKeys: should return userKeys', async () => {
        
    }).timeout(5000);
    it('getUsers: should return user array', async () => {
        
    }).timeout(5000);
    it('get_all_keys: should return key array', async () => {
        
    }).timeout(5000);
    it('edit_username: should return true', async () => {
        
    }).timeout(5000);
    it('add_user: should return true', async () => {
        
    }).timeout(5000);
    it('delete_user: should return true', async () => {
        
    }).timeout(5000);
});