import "mocha";
import chai from "chai";
import {ShoeModel} from "../../src/models/shoe_model";

describe ('get all the users shoes', () => {
    it('should return all correct shoes', async () => {
        const test_arr = [{"shoe_id":3, "purchase_price":200}];
        const SM = new ShoeModel();
        const original:any = await SM.getAllShoes(test_arr);
        chai.expect(original[0].shoe_id).to.equal(3);
         });
    })
