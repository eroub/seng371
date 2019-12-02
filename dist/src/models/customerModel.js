"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = require("mongodb");
var DbClient = require("../DbClient");
var ObjectID = mongodb.ObjectID;
var CustomerModel = /** @class */ (function () {
    function CustomerModel() {
    }
    CustomerModel.prototype.userInfo = function (userId) {
        var users = DbClient.connect()
            .then(function (db) {
            return db.collection("users").find({ user_id: userId }).toArray();
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
    CustomerModel.prototype.add_shoe = function (userId, shoeID, purchase) {
        var shoeAdd = DbClient.connect()
            .then(function (db) {
            db.collection("user_shoes").insertOne({ user_id: userId, shoe_id: shoeID, purchase_price: purchase });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return shoeAdd;
    };
    CustomerModel.prototype.edit_shoe = function (id, purchasePrice) {
        var result = DbClient.connect()
            .then(function (db) {
            db.collection("user_shoes").updateOne({ _id: ObjectID(id) }, { $set: { purchase_price: purchasePrice } });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return result;
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
            return sneakers;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return userKeys;
    };
    CustomerModel.prototype.edit_userName = function (id, editedName) {
        var result = DbClient.connect()
            .then(function (db) {
            db.collection("users").updateOne({ user_id: id }, { $set: { username: editedName } });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return result;
    };
    CustomerModel.prototype.add_user = function (userId, username) {
        var add_user = DbClient.connect()
            .then(function (db) {
            db.collection("users").insertOne({ isAdmin: false, user_id: userId, username: username });
            console.log("adding user");
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return add_user;
    };
    CustomerModel.prototype.remove_user = function (userId) {
        var remove_user = DbClient.connect()
            .then(function (db) {
            db.collection("users").deleteOne({ user_id: userId });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return remove_user;
    };
    return CustomerModel;
}());
exports.CustomerModel = CustomerModel;
//# sourceMappingURL=customerModel.js.map