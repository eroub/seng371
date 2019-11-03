import DbClient = require("../DbClient");

export default class shoe_model {

    constructor(){}
/*
    input type: key value arr, example :  [{"1":300}, {"3":400},{"5":500}]
    returns an array of shoe objects ex: [ {shoe_1 ...}, {shoe_2 ...}, {shoe_3}...]
 */
    public get_all_shoes(shoeKeys_val:any) {

        let key_arr:any[] =[];

        // get the keys from the input, keys_arr should be equal to [1,3,5] from the example above

        let prop;
        for ( prop of shoeKeys_val){
            key_arr.push(Object.keys(prop)[0])
        }
        console.log(key_arr);

        // an array of objects holding indvidual json objects for each of the shoes the user has
        let json_shoe_Arr:any[] = []

        const shoes = DbClient.connect()
            .then((db) => {

                // will return all the shoes in db
                return db!.collection("shoes").find().toArray();

            })

            .then((sneakers:any) => {

                // loop over all the shoes in db and push into json_shoe_Arr only those that are
                // owned by user
                let shoe;
                let id;
                for ( shoe of sneakers ) {
                    for(  id of key_arr) {
                        // if current shoe is also a shoe owned by user, id is type string so we typecast to number

                        if (shoe.shoe_id === Number(id)){
                            json_shoe_Arr.push(shoe);
                            break;
                        }
                    }
                }

                return json_shoe_Arr;
            })
            .catch((err) => {
                console.log("err.message");
            })

        return shoes;
    }

    /*
     Input type: integer that refers to the shoe_id. ex: 3
     Output type: a json shoe obejct ex: {shoe_id:3 ... }
     */

    public get_one_shoe(shoeID:any) {


        console.log(shoeID);

        // an array of objects holding indvidual json objects for each of the shoes the user has
        let json_shoe_Arr:any[] = []

        const shoes = DbClient.connect()
            .then((db) => {

                // will return all the shoes in db
                return db!.collection("shoes").find().toArray();

            })

            .then((sneakers:any) => {

                // loop over all the shoes in db and push into json_shoe_Arr only the shoe that has id
                // shoeID
                let shoe;
                for ( shoe of sneakers ) {
                        // if current shoe is also a shoe whose id is shoeID, shoeID is type string so we typecast to number
                        if (shoe.shoe_id === Number(shoeID)){
                            json_shoe_Arr.push(shoe);
                            break;
                        }
                }
                return json_shoe_Arr[0];
            })
            .catch((err) => {
                console.log("err.message");
            })

        return shoes;
    }

}