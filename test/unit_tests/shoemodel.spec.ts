import "mocha";
import chai from "chai";
import {ShoeModel} from "../../src/models/shoe_model";

//const app = require('../../src/app');

/*

[ 1, 2, 3 ]
Connected to db
this arr [ { _id: 5dbe1a1dff564fe9fa9bc2f2,
    shoe_id: 1,
    brand: 'Air Jordan',
    model: '1',
    colorway: 'UNC',
    current_price: 400,
    retail_price: 215,
    size: 10 },
  { _id: 5dbe1a4eff564fe9fa9bc2f3,
    shoe_id: 2,
    brand: 'Nike',
    model: 'Airmax 90',
    colorway: 'Sean Witherspoon',
    current_price: 720,
    retail_price: 160,
    size: 10 },
  { _id: 5dbe1afaff564fe9fa9bc2f4,
    shoe_id: 3,
    brand: 'Off White X Air Jordan',
    model: '1',
    colorway: 'Chicago',
    current_price: 4790,
    retail_price: 215,
    size: 10 } ]



 */

describe ('#getAllShoes', () => {
    it('should return all correct shoes', async () => {
        const test_arr = [{"shoe_id":3, "purchase_price":200}];
        const SM = new ShoeModel();
        const shoes:any = await SM.getAllShoes(test_arr);
        /*const cast = Promise.resolve(original);
        cast.then(function(value) {
            console.log(value);
        });*/
        console.log(shoes[0]);
        //chai.expect(Promise.resolve(users_shoes).to.eventually.equal("foo");
        chai.expect(shoes[0].shoe_id).to.equal(3);

    });
});

describe ('#getOneShoe', () => {

    it('should return one correct shoes', async () => {

        const SM = new ShoeModel();
        const shoe:any = await SM.getOneShoe(2);
        /*const cast = Promise.resolve(original);
        cast.then(function(value) {
            console.log(value);
        });*/
        console.log(shoe);
        //chai.expect(Promise.resolve(users_shoes).to.eventually.equal("foo");
        chai.expect(shoe.shoe_id).to.equal(2);

    });
});

describe ('#getAllDb', () => {

    it('should return all shoes in the database', async () => {

        const SM = new ShoeModel();
        const shoes:any = await SM.getAllDB();
        /*const cast = Promise.resolve(original);
        cast.then(function(value) {
            console.log(value);
        });*/
        console.log(shoes);
        //chai.expect(Promise.resolve(users_shoes).to.eventually.equal("foo");
        chai.expect(shoes.length).to.equal(3);

    });
});

