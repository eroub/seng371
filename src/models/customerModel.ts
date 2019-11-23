import DbClient = require("../DbClient");
const ObjectID = require("mongodb").ObjectID;

export class CustomerModel {

    constructor() {}

    public userInfo(userId: any) {
        const users = DbClient.connect()
            .then((db) => {
                return db!.collection("users").find({user_id: userId}).toArray();
            })
            .then((sneakers: any) => {
                // console.log(sneakers);
                return sneakers;
                // res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            });

        // console.log(users);

        return users;
    }

    public add_shoe(userId: any, shoeID: number, purchase: number) {
        const shoeAdd = DbClient.connect()
            .then((db) => {
                db!.collection("user_shoes").insertOne({user_id: userId, shoe_id: shoeID, purchase_price: purchase});
                console.log("adding shoe");
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return shoeAdd;
    }

    public remove_shoe(id: any) {
        const shoeRemove = DbClient.connect()
            .then((db) => {
                db!.collection("user_shoes").deleteOne({_id: ObjectID(id)});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
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
                console.log("err.message");
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
                // res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
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
                // res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            });
        return users;
    }

    public get_all_keys() {
        const userKeys = DbClient.connect()
            .then((db) => {
                return db!.collection("user_shoes").find().toArray();
            })
            .then((sneakers: any) => {
                // console.log(sneakers);
                console.log(sneakers);
                return sneakers;
                // res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            });
        return userKeys;
    }
}
