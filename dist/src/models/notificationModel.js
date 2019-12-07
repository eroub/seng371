"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb = require("mongodb");
var DbClient = require("../DbClient");
var ObjectID = mongodb.ObjectID;
var NotificationModel = /** @class */ (function () {
    function NotificationModel() {
    }
    /**
     * Gets notifications for a specific user.
     *
     * @class NotificationModel
     * @method getUserNotifications
     * @param userId {Any} the user_id of the user to get notifications for.
     * @return An array of notification JSON objects ({fulfilled, shoe_id, threshold, type, user_id} if the user has notifications.
     */
    NotificationModel.prototype.getUserNotifications = function (userId) {
        var notifications = DbClient.connect()
            .then(function (db) {
            return db.collection("notifications").find({ user_id: userId }).toArray();
        })
            .then(function (notif) {
            return notif;
        })
            .catch(function (err) {
            console.log("Getting user notifications has failed");
        });
        return notifications;
    };
    /**
     * Fulfills (sets fulfilled to true) a notification.
     *
     * @class NotificationModel
     * @method fulfill
     * @param Id {Any} the Object id of the notification.
     * @return true if the notification was successfully fulfilled, otherwise false.
     */
    NotificationModel.prototype.fulfill = function (Id) {
        var result = DbClient.connect()
            .then(function (db) {
            db.collection("notifications").updateOne({ _id: ObjectID(Id) }, { $set: { fulfilled: true } });
            return true;
        })
            .catch(function (err) {
            console.log("Notification fulfillment has failed");
            return false;
        });
        return result;
    };
    /**
     * Adds a notification for a specific shoe to a specific user.
     *
     * @class NotificationModel
     * @method addNotification
     * @param userId {Number} the user_id of the user.
     * @param shoeId {Number} the shoe_id of the shoe.
     * @param threshold {Any} the price threshold for the notification.
     * @param type {Any} the type of notification (Above/Below).
     * @return true if the notification was successfully added, otherwise false.
     */
    NotificationModel.prototype.addNotification = function (userId, shoeId, threshold, type) {
        var nAdd = DbClient.connect()
            .then(function (db) {
            db.collection("notifications").insertOne({ fulfilled: false,
                shoe_id: shoeId, threshold: threshold, type: type, user_id: userId });
            return true;
        })
            .catch(function (err) {
            console.log("Adding a notification has failed");
            return false;
        });
        return nAdd;
    };
    /**
     * Removes a notification for a specific user.
     *
     * @class NotificationModel
     * @method remove_notif
     * @param id {Any} the Object id of the notification.
     * @return true if the notification was successfully removed, otherwise false.
     */
    NotificationModel.prototype.remove_notif = function (id) {
        var nRemove = DbClient.connect()
            .then(function (db) {
            db.collection("notifications").deleteOne({ _id: ObjectID(id) });
            return true;
        })
            .catch(function (err) {
            console.log("Removing a notification has failed");
            return false;
        });
        return nRemove;
    };
    /**
     * Gets a single notification.
     *
     * @class NotificationModel
     * @method get_notif
     * @param Id {Any} the Object id of the notification.
     * @return An array containing one notification, if the notification exists.
     */
    NotificationModel.prototype.get_notif = function (id) {
        var notification = DbClient.connect()
            .then(function (db) {
            return db.collection("notifications").find({ _id: ObjectID(id) }).toArray();
        })
            .then(function (notif) {
            return notif;
            // res.send(sneakers);
        })
            .catch(function (err) {
            console.log("Getting a notification has failed");
        });
        return notification;
    };
    /**
     * Edits a notification for a specific user.
     *
     * @class NotificationModel
     * @method edit_notif
     * @param id {Any} the Object id of the notification.
     * @param threshold {Any} the new threshold for the notification.
     * @param type {Any} the new type for the notification.
     * @return true if the notification was successfully edited, otherwise false.
     */
    NotificationModel.prototype.edit_notif = function (id, threshold, type) {
        var result = DbClient.connect()
            .then(function (db) {
            db.collection("notifications").updateOne({ _id: ObjectID(id) }, { $set: { threshold: threshold, type: type, fulfilled: false } });
            return true;
        })
            .catch(function (err) {
            console.log("Editing a notification has failed");
            return false;
        });
        return result;
    };
    return NotificationModel;
}());
exports.NotificationModel = NotificationModel;
//# sourceMappingURL=notificationModel.js.map