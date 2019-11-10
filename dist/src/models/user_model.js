"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.get_all = function (userId) {
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
        DbClient.connect()
            .then(function (db) {
            db.collection("users").update({ user_id: userId }, { $push: { shoelist: { shoe_id: shoeID, purchase_price: purchase } } });
        })
            .catch(function (err) {
            console.log("err.message");
        });
        // console.log(users);
    };
    UserModel.prototype.remove_shoe = function (userID, shoeID) {
        DbClient.connect()
            .then(function (db) {
            db.collection("users").update({ user_id: userID }, { $pull: { shoelist: { shoe_id: shoeID } } });
        })
            .catch(function (err) {
            console.log("err.message");
        });
    };
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user_model.js.map