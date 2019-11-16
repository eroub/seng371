import "mocha";
import chai from "chai";
import {UserModel} from "../../src/models/user_model";

describe ('Testing UserModel Functionality:', () => {
    it('Should return the correct specified user: 1', async () => {
        const UM = new UserModel();
        const uInfo: any = await UM.userInfo(1);
        chai.expect(uInfo[0].user_id).to.equal(1);
        });
    it('Adding a shoe should return true', async () => {
        const UM = new UserModel();
        const shoeAdded: boolean = await UM.add_shoe(0, 99, 100);
        chai.expect(shoeAdded).to.equal(true);
    });
    it('Removing a shoe should return true', async () => {
        const UM = new UserModel();
        const shoeRemoved: boolean = await UM.remove_shoe(0, 99);
        chai.expect(shoeRemoved).to.equal(true);
    });
})