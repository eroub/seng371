import DbClient = require("../DbClient");

export class ProductModel {

    constructor() {}
    /*
        input type: key value arr, example :  [{"1":300}, {"3":400},{"5":500}]
        returns an array of shoe objects ex: [ {shoe_1 ...}, {shoe_2 ...}, {shoe_3}...]
     */
    public getAllShoes(shoeKeysVal: any) {

        const keyArr: any[] = [];

        // get the keys from the input, keys_arr should be equal to [1,3,5] from the example above

        let prop;
        for (prop of shoeKeysVal) {
            keyArr.push(JSON.parse(JSON.stringify(prop)).shoe_id);
        }

        // an array of objects holding indvidual json objects for each of the shoes the user has
        const jsonShoeArr: any[] = [];

        const shoes = DbClient.connect()
            .then((db) => {
                // returns shoes in db
                return db!.collection("shoes").find().toArray();
            })
            .then((sneakers: any) => {
                // loop over all the shoes in db and push into jsonShoeArr only those that are
                // owned by user
                let id;
                let shoe;
                for (shoe of sneakers ) {
                    for (id of keyArr) {
                        // if current shoe is also a shoe owned by user, id is type string so we typecast to number
                        if (shoe.shoe_id === Number(id)) {
                            jsonShoeArr.push(shoe);
                            break;
                        }
                    }
                }
                return jsonShoeArr;
            })
            .catch((err) => {
                console.log("Getting all shoes has failed");
            });

        return shoes;
    }

    /*
     Input type: integer that refers to the shoe_id. ex: 3
     Output type: a json shoe obejct ex: {shoe_id:3 ... }
     */

    public getOneShoe(shoeID: any) {

        // an array of objects holding indvidual json objects for each of the shoes the user has
        const jsonShoeArr: any[] = [];

        const shoes = DbClient.connect()
            .then((db) => {
                // will return all the shoes in db
                return db!.collection("shoes").find().toArray();
            })
            .then((sneakers: any) => {
                // loop over all the shoes in db and push into jsonShoeArr only the shoe that has id
                // shoeID
                let shoe;
                for ( shoe of sneakers ) {
                    // if current shoe is also a shoe whose id is shoeID, shoeID is type string so we typecast to number
                    if (shoe.shoe_id === Number(shoeID)) {
                        jsonShoeArr.push(shoe);
                        break;
                    }
                }
                return jsonShoeArr[0];
            })
            .catch((err) => {
                console.log("Getting a shoe has failed");
            });

        return shoes;
    }

    /*
            Return all the shoes for the view where we need to see all shoes available in db
     */

    public updateShoes(priceChange: any) {
        const shoeUpdate = DbClient.connect()
            .then((db) => {
                db!.collection("shoes").updateMany({}, { $inc: { current_price: priceChange }});
                return true;
            })
            .catch((err) => {
                console.log("Failed to update shoes");
                return false;
            });
        return shoeUpdate;
    }

    public getAllDB() {
        const shoes = DbClient.connect()
            .then((db) => {
                return db!.collection("shoes").find().toArray();
            })
            .then((sneakers: any) => {
                return sneakers;
            })
            .catch((err) => {
                console.log("Returning all shoes in the database has failed");
            });

        return shoes;
    }

    public add_shoe(model: any, shoeId: any, size: any, cp: any, rp: any, brand: any, colorway: any) {
        const addShoes = DbClient.connect()
            .then((db) => {
                db!.collection("shoes").insertOne({ brand, colorway, current_price: cp,
                    model, retail_price: rp, shoe_id: shoeId, size});

                console.log("adding shoe");
                return true;
            })
            .catch((err) => {
                console.log("Adding a shoe to the database has failed");
                return false;
            });
        return addShoes;
    }

    public edit_shoe(model: any, shoeId: any, size: any, cp: any, rp: any, brand: any, colorway: any) {
        const result = DbClient.connect()
            .then((db) => {
                db!.collection("shoes").updateOne({shoe_id: shoeId},
                    {$set: {brand, colorway, current_price: cp, model, retail_price: rp, size}});
                return true;
            })
            .catch((err) => {
                console.log("Editing a shoe has failed");
                return false;
            });
        return result;
    }

    public remove_shoe(shoeId: any) {
        const removeUser = DbClient.connect()
            .then((db) => {
                db!.collection("shoes").deleteOne({ shoe_id: shoeId});
                db!.collection("user_shoes").deleteMany({ shoe_id: shoeId});
                db!.collection("notifications").deleteMany({ shoe_id: shoeId});
                db!.collection("users").deleteMany({ shoe_id: null});
                return true;
            })
            .catch((err) => {
                console.log("Removing a shoe has failed");
                return false;
            });
        return removeUser;
    }

}
