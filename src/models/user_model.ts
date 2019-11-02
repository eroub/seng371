import DbClient = require("../DbClient");

export class user_model {

    constructor(){}

    public get_all(user_id:any) {
        const users = DbClient.connect()
            .then((db) => {
                return db!.collection("users").find({"user_id":user_id}).toArray();
            })
            .then((sneakers:any) => {
                //console.log(sneakers);
                return sneakers;
                //res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            })

        //console.log(users);

        return users;
    }

}