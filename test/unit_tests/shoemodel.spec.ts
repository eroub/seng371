import "mocha";
import chai from "chai";
import {ShoeModel} from "../../src/models/shoe_model";

describe ('Testing shoe_model functionality', () => {
    it('should return all correct shoes', async () => {
        const test_arr = [{"shoe_id":3, "purchase_price":200}];
        const SM = new ShoeModel();
        const shoes:any = await SM.getAllShoes(test_arr);
        chai.expect(shoes[0].shoe_id).to.equal(3);
    });
    it('should return one correct shoes', async () => {
        const SM = new ShoeModel();
        const shoe:any = await SM.getOneShoe(2);
        chai.expect(shoe.shoe_id).to.equal(2);
    });
    it('should return all shoes in the database', async () => {
        const SM = new ShoeModel();
        const shoes:any = await SM.getAllDB();
        chai.expect(shoes.length).to.equal(3);
    });
});

