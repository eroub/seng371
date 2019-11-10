"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var ShoeModel = /** @class */ (function () {
    function ShoeModel() {
    }
    /*
        input type: key value arr, example :  [{"1":300}, {"3":400},{"5":500}]
        returns an array of shoe objects ex: [ {shoe_1 ...}, {shoe_2 ...}, {shoe_3}...]
     */
    ShoeModel.prototype.getAllShoes = function (shoeKeysVal) {
        var keyArr = [];
        // get the keys from the input, keys_arr should be equal to [1,3,5] from the example above
        var prop;
        for (var _i = 0, shoeKeysVal_1 = shoeKeysVal; _i < shoeKeysVal_1.length; _i++) {
            prop = shoeKeysVal_1[_i];
            keyArr.push(JSON.parse(JSON.stringify(prop)).shoe_id);
        }
        // an array of objects holding indvidual json objects for each of the shoes the user has
        var jsonShoeArr = [];
        var shoes = DbClient.connect()
            .then(function (db) {
            // will return all the shoes in db
            return db.collection("shoes").find().toArray();
        })
            .then(function (sneakers) {
            // loop over all the shoes in db and push into jsonShoeArr only those that are
            // owned by user
            var shoe;
            var id;
            for (var _i = 0, sneakers_1 = sneakers; _i < sneakers_1.length; _i++) {
                shoe = sneakers_1[_i];
                for (var _a = 0, keyArr_1 = keyArr; _a < keyArr_1.length; _a++) {
                    id = keyArr_1[_a];
                    // if current shoe is also a shoe owned by user, id is type string so we typecast to number
                    if (shoe.shoe_id === Number(id)) {
                        jsonShoeArr.push(shoe);
                        break;
                    }
                }
            }
            return jsonShoeArr;
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
    ShoeModel.prototype.getOneShoe = function (shoeID) {
        console.log(shoeID);
        // an array of objects holding indvidual json objects for each of the shoes the user has
        var jsonShoeArr = [];
        var shoes = DbClient.connect()
            .then(function (db) {
            // will return all the shoes in db
            return db.collection("shoes").find().toArray();
        })
            .then(function (sneakers) {
            // loop over all the shoes in db and push into jsonShoeArr only the shoe that has id
            // shoeID
            var shoe;
            for (var _i = 0, sneakers_2 = sneakers; _i < sneakers_2.length; _i++) {
                shoe = sneakers_2[_i];
                // if current shoe is also a shoe whose id is shoeID, shoeID is type string so we typecast to number
                if (shoe.shoe_id === Number(shoeID)) {
                    jsonShoeArr.push(shoe);
                    break;
                }
            }
            return jsonShoeArr[0];
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return shoes;
    };
    ShoeModel.prototype.get_all = function () {
        var shoes = DbClient.connect()
            .then(function (db) {
            return db.collection("shoes").find().toArray();
        })
            .then(function (sneakers) {
            return sneakers;
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return shoes;
    };
    return ShoeModel;
}());
exports.ShoeModel = ShoeModel;
//# sourceMappingURL=shoe_model.js.map