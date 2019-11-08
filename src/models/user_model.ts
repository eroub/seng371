import DbClient = require("../DbClient");

export class user_model {

    constructor() {}

    public get_all(userId: any) {
        const users = DbClient.connect()
            .then((db) => {
                return db!.collection("users").find({user_id:userId}).toArray();
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

    public add_shoe(userId: any, shoeID:number, purchase:number) {
        DbClient.connect()
            .then((db) => {
                db!.collection("users").update({user_id:userId},{$push:{shoelist: {"shoe_id":shoeID,"purchase_price":purchase}}});
            })
            .catch((err) => {
                console.log("err.message");
            });

        // console.log(users);

    }

    public remove_shoe(userID: any, shoeID:number) {
        DbClient.connect()
            .then((db) => {
                db!.collection("users").update({user_id:userID},{$pull:{shoelist: {"shoe_id":shoeID}}});
            })
            .catch((err) => {
                console.log("err.message");
            });
    }
}
