import mongodb = require("mongodb");
import DbClient = require("../DbClient");

const ObjectID: any = mongodb.ObjectID;

export class CustomerModel {

    constructor() {}

    public userInfo(userId: number) {
        const users = DbClient.connect()
            .then((db) => {
                return db!.collection("users").find({user_id: userId}).toArray();
            })
            .then((sneakers: any) => {
                return sneakers;
            })
            .catch((err) => {
                console.log("Grabbing user info from the database has failed");
            });

        return users;
    }

    public add_shoe(userId: any, shoeID: number, purchase: number) {
        const shoeAdd = DbClient.connect()
            .then((db) => {
                db!.collection("user_shoes").insertOne({user_id: userId, shoe_id: shoeID, purchase_price: purchase});
                return true;
            })
            .catch((err) => {
                console.log("Adding a shoe to the database has failed");
                return false;
            });
        return shoeAdd;
    }

    public edit_shoe(id: any, purchasePrice: number) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("user_shoes").updateOne({_id: ObjectID(id)},
                    {$set: {purchase_price: purchasePrice}});
                return true;
            })
            .catch((err) => {
                console.log("Editing a shoe in the database has failed");
                return false;
            });
        return result;
    }

    public remove_shoe(id: any) {
        const shoeRemove = DbClient.connect()
            .then((db) => {
                db!.collection("user_shoes").deleteOne({_id: ObjectID(id)});
                return true;
            })
            .catch((err) => {
                console.log("Removing a shoe from the database has failed");
                return false;
            });
        return shoeRemove;
    }

    public isUser(userID: any) {
        const result = DbClient.connect()
            .then((db) => {
                return db!.collection("users").find({user_id: userID}).toArray();
            })
            .then((value: any) => {
                if (value.length === 0) {
                    return false;
                } else {
                    return true;
                }
            })
            .catch((err) => {
                console.log("Confirmation of user has failed");
            });
        return result;
    }

    public getKeys(userID: any) {
        const userKeys = DbClient.connect()
            .then((db) => {
                return db!.collection("user_shoes").find({user_id: userID}).toArray();
            })
            .then((sneakers: any) => {
                return sneakers;
            })
            .catch((err) => {
                console.log("Getting user keys has failed");
            });
        return userKeys;
    }

    public get_users() {
        const users = DbClient.connect()
            .then((db) => {
                return db!.collection("users").find().toArray();
            })
            .then((sneakers: any) => {
                return sneakers;
            })
            .catch((err) => {
                console.log("Getting user array has failed");
            });
        return users;
    }

    public get_all_keys() {
        const userKeys = DbClient.connect()
            .then((db) => {
                return db!.collection("user_shoes").find().toArray();
            })
            .then((sneakers: any) => {
                return sneakers;
            })
            .catch((err) => {
                console.log("Getting key array has failed");
            });
        return userKeys;
    }

    public edit_userName(id: any, editedName: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("users").updateOne({user_id: id},
                    {$set: {username: editedName}});
                return true;
            })
            .catch((err) => {
                console.log("Editing the user name has failed");
                return false;
            });
        return result;
    }

    public add_user(userId: number, username: any) {
        const addUser = DbClient.connect()
            .then((db) => {
                db!.collection("users").insertOne({ isAdmin: false, user_id: userId, username});
                return true;
            })
            .catch((err) => {
                console.log("Adding the user has failed");
                return false;
            });
        return addUser;
    }

    public remove_user(userId: any) {
        const removeUser = DbClient.connect()
            .then((db) => {
                db!.collection("users").deleteOne({ user_id: userId});
                db!.collection("user_shoes").deleteMany({ user_id: userId});
                db!.collection("notifications").deleteMany({ user_id: userId});
                return true;
            })
            .catch((err) => {
                console.log("Removing the user has failed");
                return false;
            });
        return removeUser;
    }

}
