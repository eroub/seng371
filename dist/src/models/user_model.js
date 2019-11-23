"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var ObjectID = require("mongodb").ObjectID;
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.userInfo = function (userId) {
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
    UserModel.prototype.add_shoe = function (userId, shoeID, purchase) {
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
    UserModel.prototype.remove_shoe = function (id) {
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
    UserModel.prototype.isUser = function (userID) {
        var result = DbClient.connect()
            .then(function (db) {
            return db.collection("users").find({ user_id: userID }).toArray();
        })
            .then(function (value) {
            if (value.length == 0) {
                return false;
            }
            else
                return true;
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return result;
    };
    UserModel.prototype.get_keys = function (userID) {
        var user_keys = DbClient.connect()
            .then(function (db) {
            return db.collection("user_shoes").find({ user_id: userID }).toArray();
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
        return user_keys;
    };
    UserModel.prototype.get_users = function () {
        var users = DbClient.connect()
            .then(function (db) {
            return db.collection("users").find().toArray();
        })
            .then(function (sneakers) {
            // console.log(sneakers);
            //console.log(sneakers);
            return sneakers;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return users;
    };
    UserModel.prototype.get_all_keys = function () {
        var user_keys = DbClient.connect()
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
        return user_keys;
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user_model.js.map