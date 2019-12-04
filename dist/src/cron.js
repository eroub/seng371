"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var DbClient = require("./DbClient");
var productModel_1 = require("./models/productModel");
var chai = require("chai");
var cron = require("node-cron");
var fs = require("fs");
var datab = DbClient.connect();
var date = new Date();
var updateSuccess = false;
var integrity_new;
var integrity_old = datab.then(function (db) {
    return db.collection("shoes").find().toArray();
})
    .catch(function (err) {
    console.log("Failed to grab shoe array");
    return false;
});
/*************
 * CRON JOBS *
 *************/
/**
 * The purpose of this cron job is to update the database every minute (in an attempt to mock data)
 * If the mock is successful, the job appends a success log to the end of a local log file
 */
var shoeUpdate = new productModel_1.ProductModel();
cron.schedule("* * * * *", function (err) {
    if (err) {
        throw err;
    }
    var update = datab.then(function (db) {
        db.collection("shoes").updateMany({}, { $inc: { current_price: 2 } });
        return true;
    })
        .catch(function (err) {
        console.log("Failed to update shoes");
        return false;
    });
    if (update) {
        fs.appendFile("./logs/update.log", date.toLocaleString() + " --- Updated all shoes by $2 successfully\n", function (err) {
            if (err) {
                throw err;
            }
        });
        updateSuccess = true;
    }
    else {
        fs.appendFile("./logs/update.log", date.toLocaleString() + " --- FATAL ERROR: FAILED TO UPDATE SHOES ***********\n", function (err) {
            if (err) {
                throw err;
            }
        });
        updateSuccess = false;
    }
});
/**
 * The purpose of this log file is to automatically test our integrity quality attribute (issue #14)
 * The cron job will open it's own connection to the database and grab the list of shoes. It will then
 * compare this list of shoes to the previous hours list to verify a change has been made. From there it
 * will use one of the apps routes that will run a similar query, and compare the results. If there are any
 * discrepencies the cron job will send the developers an e-mail. This is done at the beginning of every hour.
 */
cron.schedule("* * * * *", function (err) {
    if (err) {
        throw err;
    }
    // If the last update was successful continue, otherwise no need
    if (updateSuccess) {
        var integrity_new = datab.then(function (db) {
            return db.collection("shoes").find().toArray();
        })
            .catch(function (err) {
            console.log("Failed to grab shoe array");
            return false;
        });
    }
    else {
        fs.appendFile("./logs/integrity.log", date.toLocaleString() + " --- FATAL ERROR: LAST UPDATE FAILED\n", function (err) {
            if (err) {
                throw err;
            }
        });
        return;
    }
    // Verify that the update occured
    chai.expect(integrity_new).to.not.equal(integrity_old);
    // .catch((e: any) => {
    //     fs.appendFile("./logs/integrity.log",
    //         date.toLocaleString() + " --- FATAL ERROR: OLD DATA == NEW DATA. SOMETHING WEIRD HAPPENED\n", (err: any) => {
    //             if (err) {
    //                 throw err;
    //             }
    //         });
    //     throw e
    // });
    var shoes = new productModel_1.ProductModel();
    var allShoes = shoes.getAllDB();
    console.log(integrity_new);
    console.log("***************");
    console.log(allShoes);
    // Verify that the shoe list is the same
    chai.expect(allShoes).to.equal(integrity_new);
    // .catch((e: any) => {
    //     fs.appendFile("./logs/integrity.log",
    //         date.toLocaleString() + " --- FATAL ERROR: NEW DATA NOT REFLECTED ON APP\n", (err: any) => {
    //             if (err) {
    //                 throw err;
    //             }
    //         });
    //     throw e
    // });
    fs.appendFile("./logs/integrity.log", date.toLocaleString() + " --- Data integrity test passed.\n", function (err) {
        if (err) {
            throw err;
        }
    });
    // Update integrity_old
    integrity_old = integrity_new;
});
/**
 * The pusepose of this cron jobs is to renew the log files at the end of every Sunday
 * This is done with the goal of not having a 20gb log file that ends up crashing the server
 */
cron.schedule("59 23 * * 0", function () {
    fs.unlink("./logs/update.log", function (err) {
        if (err) {
            throw err;
        }
    });
    fs.link("./logs/update.log", function (err) {
        if (err) {
            throw err;
        }
        console.log("Integrity file successfully re-created!");
    });
    fs.unlink("./logs/integrity.log", function (err) {
        if (err) {
            throw err;
        }
    });
    fs.link("./logs/integrity.log", function (err) {
        if (err) {
            throw err;
        }
        console.log("Integrity file successfully re-created!");
    });
});
//# sourceMappingURL=cron.js.map