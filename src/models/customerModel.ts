import mongodb = require("mongodb");
import DbClient = require("../DbClient");

const datab = DbClient.connect();
const ObjectID: any = mongodb.ObjectID;

export class CustomerModel {

    constructor() {}

    /**
     * Get user info for a specific user specified by user_id.
     *
     * @class CustomerModel
     * @method userInfo
     * @param userId {Number} The user_id of the user.
     * @return An array containing a JSON object with the users info
     * ({isAdmin, user_id, username}) if the id is valid.
     */
    public userInfo(userId: number) {
        const users = datab
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

    /**
     * Adds a shoe to a users portfolio.
     *
     * @class CustomerModel
     * @method add_shoe
     * @param userId {Any} The user_id of the user.
     * @param shoeID {Number} The id of the shoe being added.
     * @param purchase {Number} The purchase price that the user bought the shoe for.
     * @return true if the shoe was added successfully, otherwise false.
     */
    public add_shoe(userId: any, shoeID: number, purchase: number) {
        const shoeAdd = datab
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

    /**
     * Edits the purchase price of a users shoe.
     *
     * @class CustomerModel
     * @method edit_shoe
     * @param id {Any} The Object id of the user's shoe in the database.
     * @param purchasePrice {Number} The new purchase price.
     * @return true if the shoe was edited successfully, otherwise false.
     */
    public edit_shoe(id: any, purchasePrice: number) {
        const result = datab
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

    /**
     * Removes a shoe from a user's portfolio.
     *
     * @class CustomerModel
     * @method remove_shoe
     * @param id {Any} The Object id of the user's shoe in the database.
     * @return true if the shoe was removed successfully, otherwise false.
     */
    public remove_shoe(id: any) {
        const shoeRemove = datab
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

    /**
     * Checks the database to see if a specific user_id corresponds to an actual user in the database.
     *
     * @class CustomerModel
     * @method isUser
     * @param userID {Any} The user_id to be checked.
     * @return true if the user_id exists, otherwise false
     */
    public isUser(userID: any) {
        const result = datab
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

    /**
     * Gets all of the shoe keys (numbers referencing shoes in the database) for a specific user.
     *
     * @class CustomerModel
     * @method getKeys
     * @param userID {Any} The user_id to get keys for.
     * @return An array of user key JSON objects
     * ({user_id, shoe_id, purchase_price}) if the user has shoes. Otherwise an empty array.
     */
    public getKeys(userID: any) {
        const userKeys = datab
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

    /**
     * Gets info for all users.
     *
     * @class CustomerModel
     * @method get_users
     * @return An array of user JSON objects ({isAdmin, user_id, username}).
     */
    public get_users() {
        const users = datab
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

    /**
     * Gets keys for all users.
     *
     * @class CustomerModel
     * @method get_all_keys
     * @return An array of user key JSON objects ({user_id, shoe_id, purchase_price}).
     */
    public get_all_keys() {
        const userKeys = datab
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

    /**
     * Edits a specific user's username.
     *
     * @class CustomerModel
     * @method edit_userName
     * @param id {Any} the user_id of the user being edited.
     * @param editedName {Any} the new username.
     * @return true if the username was edited successfully, otherwise false.
     */
    public edit_userName(id: any, editedName: any) {
        const result = datab
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

    /**
     * Adds a (regular) user to the database.
     *
     * @class CustomerModel
     * @method add_user
     * @param userId {Number} the user_id of the user being added.
     * @param username {Any} the username of the new user.
     * @return true if the user was added successfully, otherwise false.
     */
    public add_user(userId: number, username: any) {
        const addUser = datab
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

    /**
     * Removes a user from the database.
     *
     * @class CustomerModel
     * @method remove_user
     * @param userId {Any} the user_id of the user being removed.
     * @return true if the user was removed successfully, otherwise false.
     */
    public remove_user(userId: any) {
        const removeUser = datab
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
