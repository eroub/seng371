"use strict";
var shoe_model = require('../../src/models/shoe_model').shoe_model;
require = require("esm")(module /*, options*/);
describe('Hello function', function () {
    it('should return all shoes', function () {
        var test_arr = [{ "1": 300, "3": 400, "5": 500 }];
        var SM = new shoe_model();
        var shoes = SM.get_all_shoes(test_arr);
        console.log(shoes);
        //expect(result).to.equal('Hello World!');
    });
});
//# sourceMappingURL=hello-world.spec.js.map