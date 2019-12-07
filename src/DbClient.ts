// @ts-ignore
import { Db, MongoClient } from "mongodb";

class DbClient {
    public db!: Db;

    public async connect() {

        try {
            const client = await MongoClient.connect("mongodb+srv://shaun:yeet@cluster0-rn1fn.gcp.mongodb.net/stalkx?retryWrites=true&w=majority", { useUnifiedTopology: true});
            this.db = client.db("stalkx");
            return this.db;
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }
}

export = new DbClient();
