import "mocha";
import chai from "chai";
import {ShoeModel} from "../../src/models/shoe_model";

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


describe ('get all the users shoes', () => {

    it('should return all correct shoes', () => {
        const test_arr = [{"1":300, "3":400,"5":500}]

        const SM = new ShoeModel()
        const users_shoes =  new Promise((resolve, reject) => {
          SM.getAllShoes(test_arr);
        })
        .then(value => {
          console.log('resolved', value);
          chai.expect(value).to.equal('Hello World!');  
        })
        .catch(error => {
          console.log('rejected', error);
        });
        
         });
    })
