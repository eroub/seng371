"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.getAll = function (userId) {
        var users = DbClient.connect()
            .then(function (db) {
            return db.collection("users").find({ userId: userId }).toArray();
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
    return UserModel;
}());
exports.UserModel = UserModel;
//# sourceMappingURL=user_model.js.map