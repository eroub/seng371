"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var integrity_old;
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
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
 * discrepencies the cron job will log it. This is done at the beginning of every hour.
 */
cron.schedule("* * * * *", function (err) { return __awaiter(void 0, void 0, void 0, function () {
    var shoes, allShoes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (err) {
                    throw err;
                }
                return [4 /*yield*/, datab.then(function (db) {
                        return db.collection("shoes").find().toArray();
                    })
                        .catch(function (err) {
                        console.log("Failed to grab shoe array");
                        return false;
                    })];
            case 1:
                // Grab integral data to be compared
                integrity_old = _a.sent();
                // Wait just over one minute. Enough time to data to update
                return [4 /*yield*/, delay(63000)];
            case 2:
                // Wait just over one minute. Enough time to data to update
                _a.sent();
                if (!updateSuccess) return [3 /*break*/, 4];
                return [4 /*yield*/, datab.then(function (db) {
                        return db.collection("shoes").find().toArray();
                    })
                        .catch(function (err) {
                        console.log("Failed to grab shoe array");
                        return false;
                    })];
            case 3:
                // Grab new data to be compared
                integrity_new = _a.sent();
                return [3 /*break*/, 5];
            case 4:
                fs.appendFile("./logs/integrity.log", date.toLocaleString() + " --- FATAL ERROR: LAST UPDATE FAILED\n", function (err) {
                    if (err) {
                        throw err;
                    }
                });
                return [2 /*return*/];
            case 5:
                // Verify that the update occured
                chai.expect(integrity_new).to.not.deep.equal(integrity_old);
                shoes = new productModel_1.ProductModel();
                return [4 /*yield*/, shoes.getAllDB()];
            case 6:
                allShoes = _a.sent();
                console.log(allShoes);
                console.log("***********");
                console.log(integrity_new);
                // Verify that the shoe list is the same
                chai.expect(allShoes).to.deep.equal(integrity_new);
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
                return [2 /*return*/];
        }
    });
}); });
/**
 * The pusepose of this cron jobs is to renew the log files at the end of every Sunday
 * This is done with the goal of not having 20gb log files that crash the server
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