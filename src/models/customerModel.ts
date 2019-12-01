import mongodb = require("mongodb");
import DbClient = require("../DbClient");

const ObjectID: any = mongodb.ObjectID;

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

    public edit_shoe(id: any, purchasePrice: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("user_shoes").updateOne({_id: ObjectID(id)},
                    {$set: {purchase_price: purchasePrice}});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
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

    public edit_userName(id:any, editedName:any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("users").updateOne({user_id: id},
                    {$set: {username:editedName}});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return result;
    }



    public add_user(userId: any, username: any) {
        const add_user = DbClient.connect()
            .then((db) => {
                db!.collection("users").insertOne({ isAdmin: false, user_id: userId, username:username});
                console.log("adding user");
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return add_user;
    }


    public remove_user(userId: any) {
        const remove_user = DbClient.connect()
            .then((db) => {
                db!.collection("users").deleteOne({ user_id: userId});
                //db!.collection("users").deleteMany({ user_id: null});

                console.log("deleted user");
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return remove_user;
    }




}
