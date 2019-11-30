"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productModel_1 = require("./models/productModel");
var cron = require("node-cron");
var fs = require("fs");
// Start cron jobs
var shoeUpdate = new productModel_1.ProductModel();
cron.schedule("* * * * *", function (err) {
    if (err) {
        throw err;
    }
    var date = new Date();
    if (shoeUpdate.updateShoes(2)) {
        fs.appendFile("./update.log", date.toLocaleString() + " --- Updated all shoes by $2 successfully\n", function (err) {
            if (err) {
                throw err;
            }
        });
    }
    else {
        fs.appendFile("./update.log", date.toLocaleString() + " --- FAILED TO UPDATE SHOES ***********\n", function (err) {
            if (err) {
                throw err;
            }
        });
    }
});
// Renew update.log. Done every sunday night
cron.schedule("59 23 * * 0", function () {
    fs.unlink("./update.log", function (err) {
        if (err) {
            throw err;
        }
    });
    fs.link("./update.log", function (err) {
        if (err) {
            throw err;
        }
        console.log("Update file successfully re-created!");
    });
});
//# sourceMappingURL=cron.js.map