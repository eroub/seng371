import { ProductModel } from "./models/productModel";

const cron = require("node-cron");
const fs = require("fs");

// Start cron jobs
const shoeUpdate = new ProductModel();
cron.schedule("* * * * *", (err: any) => {
    if (err) {
        throw err;
    }
    const date = new Date();
    if (shoeUpdate.updateShoes(2)) {
        fs.appendFile("./update.log",
            date.toLocaleString() + " --- Updated all shoes by $2 successfully\n", (err: any) => {
                if (err) {
                    throw err;
                }
        });
    } else {
        fs.appendFile("./update.log",
            date.toLocaleString() + " --- FAILED TO UPDATE SHOES ***********\n", (err: any) => {
                if (err) {
                    throw err;
                }
        });
    }
});

// Renew update.log. Done every sunday night
cron.schedule("59 23 * * 0", () => {
    fs.unlink("./update.log", (err: any) => {
        if (err) {
            throw err;
        }
    });
    fs.link("./update.log", (err: any) => {
        if (err) {
            throw err;
        }
        console.log("Update file successfully re-created!");
    });

});
