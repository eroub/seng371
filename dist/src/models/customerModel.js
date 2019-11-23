"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var ObjectID = require("mongodb").ObjectID;
var CustomerModel = /** @class */ (function () {
    function CustomerModel() {
    }
    CustomerModel.prototype.userInfo = function (userId) {
        var users = DbClient.connect()
            .then(function (db) {
            return db.collection("users").find({ user_id: userId }).toArray();
        })
            .then(function (sneakers) {
            // console.log(sneakers);
            return sneakers;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        // console.log(users);
        return users;
    };
    CustomerModel.prototype.add_shoe = function (userId, shoeID, purchase) {
        var shoeAdd = DbClient.connect()
            .then(function (db) {
            db.collection("user_shoes").insertOne({ user_id: userId, shoe_id: shoeID, purchase_price: purchase });
            console.log("adding shoe");
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return shoeAdd;
    };
    CustomerModel.prototype.remove_shoe = function (id) {
        var shoeRemove = DbClient.connect()
            .then(function (db) {
            db.collection("user_shoes").deleteOne({ _id: ObjectID(id) });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return shoeRemove;
    };
    CustomerModel.prototype.isUser = function (userID) {
        var result = DbClient.connect()
            .then(function (db) {
            return db.collection("users").find({ user_id: userID }).toArray();
        })
            .then(function (value) {
            if (value.length === 0) {
                return false;
            }
            else {
                return true;
            }
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return result;
    };
    CustomerModel.prototype.getKeys = function (userID) {
        var userKeys = DbClient.connect()
            .then(function (db) {
            return db.collection("user_shoes").find({ user_id: userID }).toArray();
        })
            .then(function (sneakers) {
            return sneakers;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return userKeys;
    };
    CustomerModel.prototype.get_users = function () {
        var users = DbClient.connect()
            .then(function (db) {
            return db.collection("users").find().toArray();
        })
            .then(function (sneakers) {
            return sneakers;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return users;
    };
    CustomerModel.prototype.get_all_keys = function () {
        var userKeys = DbClient.connect()
            .then(function (db) {
            return db.collection("user_shoes").find().toArray();
        })
            .then(function (sneakers) {
            // console.log(sneakers);
            console.log(sneakers);
            return sneakers;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return userKeys;
    };
    return CustomerModel;
}());
exports.CustomerModel = CustomerModel;
//# sourceMappingURL=customerModel.js.map