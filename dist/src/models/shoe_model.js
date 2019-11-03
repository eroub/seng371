"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var shoe_model = /** @class */ (function () {
    function shoe_model() {
    }
    /*
        input type: arr [{"1":300, "3":400,"5":500}]
     */
    shoe_model.prototype.get_all_shoes = function (shoeKeys_val) {
        var key_arr = [];
        // get the keys from the input, keys_arr should be equal to [1,3,5] from the example above
        for (var _i = 0, shoeKeys_val_1 = shoeKeys_val; _i < shoeKeys_val_1.length; _i++) {
            var prop = shoeKeys_val_1[_i];
            key_arr.push(Object.keys(prop)[0]);
        }
        // an array of objects holding indvidual json objects for each of the shoes the user has
        var json_shoe_Arr = [];
        var shoes = DbClient.connect()
            .then(function (db) {
            // inefficient will return all the shoes in db
            return db.collection("shoes").find().toArray();
        })
            .then(function (sneakers) {
            //console.log(sneakers);
            sneakers.forEach(function (shoe) {
                json_shoe_Arr.push(shoe);
            });
            console.log(json_shoe_Arr);
            return json_shoe_Arr;
            //res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        //console.log(users);
        return shoes;
    };
    return shoe_model;
}());
exports.default = shoe_model;
//# sourceMappingURL=shoe_model.js.map