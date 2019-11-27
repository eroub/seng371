import mongodb = require("mongodb");
import DbClient = require("../DbClient");

const ObjectID: any = mongodb.ObjectID;

export class NotificationModel {

    constructor() {}

    public getUserNotifications(userId: any) {
        const notifications = DbClient.connect()
            .then((db) => {
                return db!.collection("notifications").find({user_id: userId}).toArray();
            })
            .then((notif: any) => {
                return notif;
                // res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            });
        return notifications;
    }

    public fulfill(Id: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").updateOne({_id: ObjectID(Id)}, {$set: {fulfilled: true}});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return result;
    }

    public addNotification(userId: number, shoeId: number, threshold: any, type: any) {
        const nAdd = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").insertOne({fulfilled: false,
                    shoe_id: shoeId, threshold, type , user_id: userId});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return nAdd;
    }

    public remove_notif(id: any) {
        const nRemove = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").deleteOne({_id: ObjectID(id)});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return nRemove;
    }

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
                console.log("err.message");
            });
        return notification;
    }

    public edit_notif(id: any, threshold: any, type: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").updateOne({_id: ObjectID(id)},
                    {$set: {threshold, type, fulfilled: false}});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return result;
    }
}
