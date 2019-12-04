import "mocha";
import chai from "chai";
import { ProductModel } from "../../../src/models/productModel";

describe ('Testing ProductModel Functionality:', () => {
    it('getAllShoes: return all correct shoes', async () => {
        const test_arr = [{"shoe_id":3, "purchase_price":200}];
        const SM = new ProductModel();
        const shoes:any = await SM.getAllShoes(test_arr);
        chai.expect(shoes[0].shoe_id).to.equal(3);
    }).timeout(5000);
    it('getOneShoe: return one correct shoes', async () => {
        const SM = new ProductModel();
        const shoe:any = await SM.getOneShoe(2);
        chai.expect(shoe.shoe_id).to.equal(2);
    }).timeout(5000);
    it('getAllDB: return all shoes in the database', async () => {
        const SM = new ProductModel();
        const shoes: any = await SM.getAllDB();
        chai.expect(shoes).to.to.be.a('array');
    }).timeout(5000);
    it('updateShoes: return true', async () => {
        const SM = new ProductModel();
        const shoe: any = await SM.updateShoes(0);
        chai.expect(shoe).to.equal(true);
    }).timeout(5000);
    it('add_shoe: return true', async () => {
        const SM = new ProductModel();
        const shoe: any = await SM.add_shoe('v1.1', 99, 10, 100, 100, 'nike', 'red');
        chai.expect(shoe).to.equal(true);
    }).timeout(5000);
    it('edit_shoe: return true for valid shoe', async () => {
        const SM = new ProductModel();
        const shoe: any = await SM.edit_shoe('v1.2', 99, 99, 999, 999, 'adidas', 'black');
        chai.expect(shoe).to.equal(true);
    }).timeout(5000);
    it('remove_shoe: return true for valid shoe', async () => {
        const SM = new ProductModel();
        const shoe: any = await SM.remove_shoe(99);
        chai.expect(shoe).to.equal(true);
    }).timeout(5000);
});