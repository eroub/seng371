"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var datab = DbClient.connect();
var ProductModel = /** @class */ (function () {
    function ProductModel() {
    }
    /**
     * Gets shoe info for a set of shoe keys (deprecated).
     *
     * @class ProductModel
     * @method getAllShoes
     * @param shoeKeysVal {Any} An array of shoe key JSON objects.
     * @return An array of shoe JSON objects.
     */
    ProductModel.prototype.getAllShoes = function (shoeKeysVal) {
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
            console.log("Getting all shoes has failed");
        });
        return shoes;
    };
    /**
     * Gets shoe info for a specific shoe.
     *
     * @class ProductModel
     * @method getOneShoe
     * @param shoeID {Any} The shoe_id of the shoe to get info for.
     * @return A single shoe JSON object (if the shoe exists).
     */
    ProductModel.prototype.getOneShoe = function (shoeID) {
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
            console.log("Getting a shoe has failed");
        });
        return shoes;
    };
    /*
            Return all the shoes for the view where we need to see all shoes available in db
     */
    /**
     * Updates the current price of all shoes.
     *
     * @class ProductModel
     * @method updateShoes
     * @param priceChange {Any} The new current price.
     * @return true if the prices were updated successfully, otherwise false.
     */
    ProductModel.prototype.updateShoes = function (priceChange) {
        var shoeUpdate = DbClient.connect()
            .then(function (db) {
            db.collection("shoes").updateMany({}, { $inc: { current_price: priceChange } });
            return true;
        })
            .catch(function (err) {
            console.log("Failed to update shoes");
            return false;
        });
        return shoeUpdate;
    };
    /**
     * Gets all the shoes in the database.
     *
     * @class ProductModel
     * @method getAllDB
     * @return An array of shoe JSON objects.
     */
    ProductModel.prototype.getAllDB = function () {
        var shoes = datab
            .then(function (db) {
            return db.collection("shoes").find().toArray();
        })
            .then(function (sneakers) {
            return sneakers;
        })
            .catch(function (err) {
            console.log("Returning all shoes in the database has failed");
        });
        return shoes;
    };
    /**
     * Adds a shoe to the database.
     *
     * @class ProductModel
     * @method add_shoe
     * @param model {Any} the model of the new shoe.
     * @param shoeID {Number} the shoe_id of the new shoe.
     * @param size {Any} the size of the new shoe
     * @param cp {Any} the current_price of the new shoe.
     * @param rp {Any} the retail_price of the new shoe.
     * @param brand {Any} the brand of the new shoe.
     * @param colorway {Any} the colorway of the new shoe.
     * @return true if the shoe was added successfully, otherwise false.
     */
    ProductModel.prototype.add_shoe = function (model, shoeId, size, cp, rp, brand, colorway) {
        var addShoes = DbClient.connect()
            .then(function (db) {
            db.collection("shoes").insertOne({ brand: brand, colorway: colorway, current_price: cp,
                model: model, retail_price: rp, shoe_id: shoeId, size: size });
            return true;
        })
            .catch(function (err) {
            console.log("Adding a shoe to the database has failed");
            return false;
        });
        return addShoes;
    };
    /**
     * Edits a shoe in the database.
     *
     * @class ProductModel
     * @method edit_shoe
     * @param model {Any} the new model of the shoe.
     * @param shoeId {Number} the shoe_id of the shoe.
     * @param size {Any} the new size of the shoe
     * @param cp {Any} the new current_price of the shoe.
     * @param rp {Any} the new retail_price of the shoe.
     * @param brand {Any} the new brand of the shoe.
     * @param colorway {Any} the new colorway of the shoe.
     * @return true if the shoe was edited successfully, otherwise false.
     */
    ProductModel.prototype.edit_shoe = function (model, shoeId, size, cp, rp, brand, colorway) {
        var result = DbClient.connect()
            .then(function (db) {
            db.collection("shoes").updateOne({ shoe_id: shoeId }, { $set: { brand: brand, colorway: colorway, current_price: cp, model: model, retail_price: rp, size: size } });
            return true;
        })
            .catch(function (err) {
            console.log("Editing a shoe has failed");
            return false;
        });
        return result;
    };
    /**
     * Removes a shoe from the database.
     *
     * @class ProductModel
     * @method remove_shoe
     * @param shoeId {Any} the shoe_id of the new shoe.
     * @return true if the shoe was added successfully, otherwise false.
     */
    ProductModel.prototype.remove_shoe = function (shoeId) {
        var removeShoe = DbClient.connect()
            .then(function (db) {
            db.collection("shoes").deleteOne({ shoe_id: shoeId });
            db.collection("user_shoes").deleteMany({ shoe_id: shoeId });
            db.collection("notifications").deleteMany({ shoe_id: shoeId });
            return true;
        })
            .catch(function (err) {
            console.log("Removing a shoe has failed");
            return false;
        });
        return removeShoe;
    };
    return ProductModel;
}());
exports.ProductModel = ProductModel;
//# sourceMappingURL=productModel.js.map