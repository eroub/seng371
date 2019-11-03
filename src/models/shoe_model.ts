import DbClient = require("../DbClient");

export default class shoe_model {

    constructor(){}
/*
    input type: arr [{"1":300, "3":400,"5":500}]
 */
    public get_all_shoes(shoeKeys_val:any) {

        let key_arr =[];

        // get the keys from the input, keys_arr should be equal to [1,3,5] from the example above

        for (let prop of shoeKeys_val){
            key_arr.push(Object.keys(prop)[0])
        }

        // an array of objects holding indvidual json objects for each of the shoes the user has
        let json_shoe_Arr:any[] = []

        const shoes = DbClient.connect()
            .then((db) => {

                // inefficient will return all the shoes in db

                return db!.collection("shoes").find().toArray();

            })

            .then((sneakers:any) => {
                //console.log(sneakers);
                sneakers.forEach(function(shoe:any){
                    json_shoe_Arr.push(shoe);
                })
                console.log(json_shoe_Arr);
                return json_shoe_Arr;
                //res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            })

        //console.log(users);

        return shoes;
    }

}