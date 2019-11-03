import DbClient = require("../DbClient");

export class UserModel {

    constructor() {}

    public getAll(userId: any) {
        const users = DbClient.connect()
            .then((db) => {
                return db!.collection("users").find({userId}).toArray();
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
}
