import "mocha";
import DbClient = require("./DbClient");
import { ProductModel } from "./models/productModel";
import { exists } from "fs";

let chai = require("chai");

const cron = require("node-cron");
const fs = require("fs");

const datab = DbClient.connect()
const date = new Date();
var updateSuccess = false;
var integrity_new;
var integrity_old;

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*************
 * CRON JOBS *
 *************/

/**
 * The purpose of this cron job is to update the database every minute (in an attempt to mock data)
 * If the mock is successful, the job appends a success log to the end of a local log file
 */
const shoeUpdate = new ProductModel();
cron.schedule("* * * * *", (err: any) => {
    if (err) {
        throw err;
    }
    const update = datab.then(db => {
        db!.collection("shoes").updateMany({}, { $inc: { current_price: 2 } });
        return true;
    })
    .catch((err) => {
        console.log("Failed to update shoes");
        return false;
    });

    if (update) {
        fs.appendFile("./logs/update.log",
            date.toLocaleString() + " --- Updated all shoes by $2 successfully\n", (err: any) => {
                if (err) {
                    throw err;
                }
        });
        updateSuccess = true;
    } else {
        fs.appendFile("./logs/update.log",
            date.toLocaleString() + " --- FATAL ERROR: FAILED TO UPDATE SHOES ***********\n", (err: any) => {
                if (err) {
                    throw err;
                }
        });
        updateSuccess = false
    }
});


/**
 * The purpose of this log file is to automatically test our integrity quality attribute (issue #14)
 * The cron job will open it's own connection to the database and grab the list of shoes. It will then 
 * compare this list of shoes to the shoe list before being updated list to verify an update has been made. From there it
 * will use one of the apps routes that will run a similar query, and compare the results. If there are any
 * discrepencies the cron job will log it. This is done at the beginning of every hour.
 */
cron.schedule("0 * * * *", async (err: any) => {
    if (err) {
        throw err;
    }

    // Grab integral data to be compared
    integrity_old = await datab.then(db => {
        return db!.collection("shoes").find().toArray();
        })
        .catch((err) => {
            console.log("Failed to grab shoe array");
            return false;
        });

    // Wait just over one minute. Enough time to data to update
    await delay(63000);

    // If the last update was successful continue, otherwise no need
    if(updateSuccess) {
        // Grab new data to be compared
        integrity_new = await datab.then(db => {
            return db!.collection("shoes").find().toArray();
        })
        .catch((err) => {
            console.log("Failed to grab shoe array");
            return false;
        });
    } else {
        fs.appendFile("./logs/integrity.log",
            date.toLocaleString() + " --- FATAL ERROR: LAST UPDATE FAILED\n", (err: any) => {
                if (err) {
                    throw err;
                }
            });
        return;
    }
    
    // Verify that the update occured
    try {
        chai.expect(integrity_new).to.not.deep.equal(integrity_old)
    } catch {
        fs.appendFile("./logs/integrity.log",
            date.toLocaleString() + " --- FATAL ERROR: OLD DATA == NEW DATA. SOMETHING WEIRD HAPPENED\n", (err: any) => {
                if (err) {
                    throw err;
                }
            });
    }

    const shoes = new ProductModel();
    const allShoes = await shoes.getAllDB();

    // Verify that the shoe list is the same
    try {
        chai.expect(allShoes).to.deep.equal(integrity_new)
    } catch {
        fs.appendFile("./logs/integrity.log",
            date.toLocaleString() + " --- FATAL ERROR: NEW DATA NOT REFLECTED ON APP\n", (err: any) => {
                if (err) {
                    throw err;
                }
            });
    }
});

/**
 * The pusepose of this cron jobs is to renew the log files at the end of every Sunday
 * This is done with the goal of not having 20gb log files that crash the server
 */
cron.schedule("59 23 * * 0", () => {
    fs.unlink("./logs/update.log", (err: any) => {
        if (err) {
            throw err;
        }
    });
    fs.link("./logs/update.log", (err: any) => {
        if (err) {
            throw err;
        }
        console.log("Update file successfully re-created!");
    });
    fs.unlink("./logs/integrity.log", (err: any) => {
        if (err) {
            throw err;
        }
    });
    fs.link("./logs/integrity.log", (err: any) => {
        if (err) {
            throw err;
        }
        console.log("Integrity file successfully re-created!");
    });

});
