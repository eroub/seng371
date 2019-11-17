import DbClient = require("../DbClient");

export class UserModel {

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
                db!.collection("users").update({user_id: userId},
                    {$push: {shoelist: {shoe_id: shoeID, purchase_price: purchase}}});
                console.log("adding shoe");
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return shoeAdd;
    }

    public remove_shoe(userID: any, shoeID: number) {
        const shoeRemove = DbClient.connect()
            .then((db) => {
                db!.collection("users").update({user_id: userID},
                    {$pull: {shoelist: {shoe_id: shoeID}}});
                return true;
            })
            .catch((err) => {
                console.log("err.message");
                return false;
            });
        return shoeRemove;
    }
}
