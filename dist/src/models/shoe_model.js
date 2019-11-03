"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var shoe_model = /** @class */ (function () {
    function shoe_model() {
    }
    /*
        input type: key value arr, example :  [{"1":300}, {"3":400},{"5":500}]
        returns an array of shoe objects ex: [ {shoe_1 ...}, {shoe_2 ...}, {shoe_3}...]
     */
    shoe_model.prototype.get_all_shoes = function (shoeKeys_val) {
        var key_arr = [];
        // get the keys from the input, keys_arr should be equal to [1,3,5] from the example above
        var prop;
        for (var _i = 0, shoeKeys_val_1 = shoeKeys_val; _i < shoeKeys_val_1.length; _i++) {
            prop = shoeKeys_val_1[_i];
            key_arr.push(Object.keys(prop)[0]);
        }
        console.log(key_arr);
        // an array of objects holding indvidual json objects for each of the shoes the user has
        var json_shoe_Arr = [];
        var shoes = DbClient.connect()
            .then(function (db) {
            // will return all the shoes in db
            return db.collection("shoes").find().toArray();
        })
            .then(function (sneakers) {
            // loop over all the shoes in db and push into json_shoe_Arr only those that are
            // owned by user
            var shoe;
            var id;
            for (var _i = 0, sneakers_1 = sneakers; _i < sneakers_1.length; _i++) {
                shoe = sneakers_1[_i];
                for (var _a = 0, key_arr_1 = key_arr; _a < key_arr_1.length; _a++) {
                    id = key_arr_1[_a];
                    // if current shoe is also a shoe owned by user, id is type string so we typecast to number
                    if (shoe.shoe_id === Number(id)) {
                        json_shoe_Arr.push(shoe);
                        break;
                    }
                }
            }
            return json_shoe_Arr;
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return shoes;
    };
    /*
     Input type: integer that refers to the shoe_id. ex: 3
     Output type: a json shoe obejct ex: {shoe_id:3 ... }
     */
    shoe_model.prototype.get_one_shoe = function (shoeID) {
        console.log(shoeID);
        // an array of objects holding indvidual json objects for each of the shoes the user has
        var json_shoe_Arr = [];
        var shoes = DbClient.connect()
            .then(function (db) {
            // will return all the shoes in db
            return db.collection("shoes").find().toArray();
        })
            .then(function (sneakers) {
            // loop over all the shoes in db and push into json_shoe_Arr only the shoe that has id
            // shoeID
            var shoe;
            for (var _i = 0, sneakers_2 = sneakers; _i < sneakers_2.length; _i++) {
                shoe = sneakers_2[_i];
                // if current shoe is also a shoe whose id is shoeID, shoeID is type string so we typecast to number
                if (shoe.shoe_id === Number(shoeID)) {
                    json_shoe_Arr.push(shoe);
                    break;
                }
            }
            return json_shoe_Arr[0];
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return shoes;
    };
    return shoe_model;
}());
exports.default = shoe_model;
//# sourceMappingURL=shoe_model.js.map