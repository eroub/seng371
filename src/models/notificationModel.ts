import mongodb = require("mongodb");
import DbClient = require("../DbClient");

const ObjectID: any = mongodb.ObjectID;

export class NotificationModel {

    constructor() {}

    /**
     * Gets notifications for a specific user.
     *
     * @class NotificationModel
     * @method getUserNotifications
     * @param userId {Any} the user_id of the user to get notifications for.
     * @return An array of notification JSON objects
     * ({fulfilled, shoe_id, threshold, type, user_id} if the user has notifications.
     */
    public getUserNotifications(userId: any) {
        const notifications = DbClient.connect()
            .then((db) => {
                return db!.collection("notifications").find({user_id: userId}).toArray();
            })
            .then((notif: any) => {
                return notif;
            })
            .catch((err) => {
                console.log("Getting user notifications has failed");
            });
        return notifications;
    }

    /**
     * Fulfills (sets fulfilled to true) a notification.
     *
     * @class NotificationModel
     * @method fulfill
     * @param Id {Any} the Object id of the notification.
     * @return true if the notification was successfully fulfilled, otherwise false.
     */
    public fulfill(Id: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").updateOne({_id: ObjectID(Id)}, {$set: {fulfilled: true}});
                return true;
            })
            .catch((err) => {
                console.log("Notification fulfillment has failed");
                return false;
            });
        return result;
    }

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
    public addNotification(userId: number, shoeId: number, threshold: any, type: any) {
        const nAdd = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").insertOne({fulfilled: false,
                    shoe_id: shoeId, threshold, type , user_id: userId});
                return true;
            })
            .catch((err) => {
                console.log("Adding a notification has failed");
                return false;
            });
        return nAdd;
    }

    /**
     * Removes a notification for a specific user.
     *
     * @class NotificationModel
     * @method remove_notif
     * @param id {Any} the Object id of the notification.
     * @return true if the notification was successfully removed, otherwise false.
     */
    public remove_notif(id: any) {
        const nRemove = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").deleteOne({_id: ObjectID(id)});
                return true;
            })
            .catch((err) => {
                console.log("Removing a notification has failed");
                return false;
            });
        return nRemove;
    }

    /**
     * Gets a single notification.
     *
     * @class NotificationModel
     * @method get_notif
     * @param Id {Any} the Object id of the notification.
     * @return An array containing one notification, if the notification exists.
     */
    public get_notif(id: any) {
        const notification = DbClient.connect()
            .then((db) => {
                return db!.collection("notifications").find({_id: ObjectID(id)}).toArray();
            })
            .then((notif: any) => {
                return notif;
                // res.send(sneakers);
            })
            .catch((err) => {
                console.log("Getting a notification has failed");
            });
        return notification;
    }

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
    public edit_notif(id: any, threshold: any, type: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").updateOne({_id: ObjectID(id)},
                    {$set: {threshold, type, fulfilled: false}});
                return true;
            })
            .catch((err) => {
                console.log("Editing a notification has failed");
                return false;
            });
        return result;
    }
}
