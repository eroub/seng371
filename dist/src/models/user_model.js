"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var user_model = /** @class */ (function () {
    function user_model() {
    }
    user_model.prototype.get_all = function (user_id) {
        var users = DbClient.connect()
            .then(function (db) {
            return db.collection("users").find({ "user_id": user_id }).toArray();
        })
            .then(function (sneakers) {
            //console.log(sneakers);
            return sneakers;
            //res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        //console.log(users);
        return users;
    };
    return user_model;
}());
exports.user_model = user_model;
//# sourceMappingURL=user_model.js.map