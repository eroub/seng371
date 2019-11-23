"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var ObjectID = require("mongodb").ObjectID;
var NotificationModel = /** @class */ (function () {
    function NotificationModel() {
    }
    NotificationModel.prototype.getUserNotifications = function (userId) {
        var notifications = DbClient.connect()
            .then(function (db) {
            return db.collection("notifications").find({ user_id: userId }).toArray();
        })
            .then(function (notif) {
            // console.log(sneakers);
            return notif;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        // console.log(users);
        return notifications;
    };
    NotificationModel.prototype.fulfill = function (Id) {
        var result = DbClient.connect()
            .then(function (db) {
            db.collection("notifications").updateOne({ _id: ObjectID(Id) }, { $set: { fulfilled: true } });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        // console.log(users);
        return result;
    };
    NotificationModel.prototype.addNotification = function (userId, shoeId, threshold, type) {
        var nAdd = DbClient.connect()
            .then(function (db) {
            db.collection("notifications").insertOne({ user_id: userId,
                shoe_id: shoeId, threshold: threshold, type: type, fulfilled: false });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return nAdd;
    };
    NotificationModel.prototype.remove_notif = function (id) {
        var nRemove = DbClient.connect()
            .then(function (db) {
            db.collection("notifications").deleteOne({ _id: ObjectID(id) });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return nRemove;
    };
    NotificationModel.prototype.get_notif = function (id) {
        var notification = DbClient.connect()
            .then(function (db) {
            return db.collection("notifications").find({ _id: ObjectID(id) }).toArray();
        })
            .then(function (notif) {
            // console.log(sneakers);
            return notif;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
        return notification;
    };
    NotificationModel.prototype.edit_notif = function (id, threshold, type) {
        var result = DbClient.connect()
            .then(function (db) {
            db.collection("notifications").updateOne({ _id: ObjectID(id) }, { $set: { threshold: threshold, type: type, fulfilled: false } });
            return true;
        })
            .catch(function (err) {
            console.log("err.message");
            return false;
        });
        return result;
    };
    return NotificationModel;
}());
exports.NotificationModel = NotificationModel;
//# sourceMappingURL=notificationModel.js.map