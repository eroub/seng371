// @ts-ignore
import { Db, MongoClient } from "mongodb";

class DbClient {
    public db!: Db;

    public async connect() {

        try {
            const client = await MongoClient.connect("mongodb://157.245.131.120:27017");
            this.db = client.db("sneaker_app");
            console.log("Connected to db");
            return this.db;
        } catch (error) {
            console.log("Unable to connect to db");
        }

    }
}

export = new DbClient();
