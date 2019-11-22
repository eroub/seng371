import DbClient = require("../DbClient");
const ObjectID = require("mongodb").ObjectID;

export class NotificationModel {

    constructor() {}

    public getUserNotifications(userId: any) {
        const notifications = DbClient.connect()
            .then((db) => {
                return db!.collection("notifications").find({user_id: userId}).toArray();
            })
            .then((notif: any) => {
                // console.log(sneakers);
                return notif;
                // res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            });

        // console.log(users);

        return notifications;
    }

    public fulfill(Id: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").updateOne({_id: ObjectID(Id)},{$set:{fulfilled:true}});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });

        // console.log(users);

        return result;
    }

    public add_notif(user_id: number, shoe_id: number, threshold: any, type: any) {
        const nAdd = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").insertOne({user_id: user_id,
                    shoe_id: shoe_id, threshold: threshold, type: type, fulfilled: false});
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
                // console.log(sneakers);
                return notif;
                // res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            });
        return notification;
    }

    public edit_notif(id: any, threshold:any, type: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("notifications").updateOne({_id: ObjectID(id)},
                    {$set:{threshold:threshold, type:type, fulfilled:false}});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return result;
    }
}
