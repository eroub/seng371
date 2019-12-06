import "mocha";
import DbClient = require("./DbClient");
import { ProductModel } from "./models/productModel";

const chai = require("chai");
const request = require("request");

const cron = require("node-cron");
const fs = require("fs");

const datab = DbClient.connect();
let updateSuccess = false;
let integrityNew;
let integrityOld;

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/*************
 * CRON JOBS *
 *************/
/**
 * The purpose of this cron job is to update the database every minute (in an attempt to mock data)
 * If the mock is successful, the job appends a success log to the end of a local log file
 */
function update() {
    const shoeUpdate = new ProductModel();
    cron.schedule("* * * * *", (err: any) => {
        if (err) {
            throw err;
        }
        const date = new Date();
        const update = datab.then((db) => {
            db!.collection("shoes").updateMany({}, { $inc: { current_price: 1 } });
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
            updateSuccess = false;
        }
    });
}

/**
 * *** INTEGRITY QUALITY ATTRIBUTE AUTOMATIC TEST ***
 *
 * The purpose of this cron job is to automatically test our integrity quality attribute (issue #14)
 * The cron job open it's own connection to the database and grab the list of shoes. It will then
 * compare this list of shoes to the shoe list post update to verify an price change has occured.
 * From there it will use one of the apps routes that will run a similar query, and compare the results.
 * If there are any discrepencies the cron job will log it. This is done at the beginning of every hour.
 */
function integrity() {
    cron.schedule("0 * * * *", async (err: any) => {
        if (err) {
            throw err;
        }
        const date = new Date();

        // Grab integral data to be compared
        integrityOld = await datab.then((db) => {
            return db!.collection("shoes").find().toArray();
        })
            .catch((err) => {
                console.log("Failed to grab shoe array");
                return false;
            });

        // Wait just over one minute. Enough time to data to update
        await delay(63000);

        // If the last update was successful continue, otherwise no need
        if (updateSuccess) {
            // Grab new data to be compared
            integrityNew = await datab.then((db) => {
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
            chai.expect(integrityNew).to.not.deep.equal(integrityOld);
        } catch {
            fs.appendFile("./logs/integrity.log",
                date.toLocaleString() +
                " --- FATAL ERROR: OLD DATA == NEW DATA. SOMETHING WEIRD HAPPENED\n", (err: any) => {
                    if (err) {
                        throw err;
                    }
                });
        }

        const shoes = new ProductModel();
        const allShoes = await shoes.getAllDB();

        // Verify that the shoe list is the same
        try {
            chai.expect(allShoes).to.deep.equal(integrityNew);
        } catch {
            fs.appendFile("./logs/integrity.log",
                date.toLocaleString() + " --- FATAL ERROR: NEW DATA NOT REFLECTED ON APP\n", (err: any) => {
                    if (err) {
                        throw err;
                    }
                });
        }
    });
}

/**
 * *** AVAILABILITY QUALITY ATTRIBUTE AUTOMATIC TEST ***
 *
 * The purpose of this cron job is to send a request to the live application every 15 minutes.
 * This is to check if the app is live (i.e. available). If the app is live, make a log of it
 * otherwise, log an error and shuts down the node process (process exit code 1).
 */
function availability() {
    cron.schedule("0,15,30,45 * * * *", () => {
        const date = new Date();
        request("https://seng350.roubekas.com", async (error: any, response: any, body: any) => {
            if (response.statusCode === 200) {
                fs.appendFile("./logs/availability.log",
                    date.toLocaleString() + " --- Heartbeat confirmed, server is alive and well\n", (err: any) => {
                        if (err) {
                            throw err;
                        }
                    });
            } else {
                fs.appendFile("./logs/availability.log",
                    date.toLocaleString() + " --- FATAL ERROR: Heartbeat dead, shutting down\n", (err: any) => {
                        if (err) {
                            throw err;
                        }
                    });
                await delay(10000);
                return process.exit(1);
            }
        });
    });
}

/**
 * The purpose of this cron job is to renew the log files at the end of every Sunday and Thursday
 * This is done with the goal of not having 20gb log files that crash the server
 */
function renew() {
    cron.schedule("59 23 * * 3,7", () => {
        fs.unlink("./logs/update.log", (err: any) => {
            if (err) {
                throw err;
            }
        });
        fs.link("./logs/update.log", (err: any) => {
            if (err) {
                throw err;
            }
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
        });
        fs.unlink("./logs/availability.log", (err: any) => {
            if (err) {
                throw err;
            }
        });
        fs.link("./logs/availability.log", (err: any) => {
            if (err) {
                throw err;
            }
        });
        console.log("All log files successfully re-created!");
    });
}

update();
integrity();
availability();
renew();
