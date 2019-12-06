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
var request = require("request");
var cron = require("node-cron");
var fs = require("fs");
var datab = DbClient.connect();
var updateSuccess = false;
var integrityNew;
var integrityOld;
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
function update() {
    var shoeUpdate = new productModel_1.ProductModel();
    cron.schedule("* * * * *", function (err) {
        if (err) {
            throw err;
        }
        var date = new Date();
        var update = datab.then(function (db) {
            db.collection("shoes").updateMany({}, { $inc: { current_price: 1 } });
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
    var _this = this;
    cron.schedule("0 * * * *", function (err) { return __awaiter(_this, void 0, void 0, function () {
        var date, shoes, allShoes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err) {
                        throw err;
                    }
                    date = new Date();
                    return [4 /*yield*/, datab.then(function (db) {
                            return db.collection("shoes").find().toArray();
                        })
                            .catch(function (err) {
                            console.log("Failed to grab shoe array");
                            return false;
                        })];
                case 1:
                    // Grab integral data to be compared
                    integrityOld = _a.sent();
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
                    integrityNew = _a.sent();
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
                    try {
                        chai.expect(integrityNew).to.not.deep.equal(integrityOld);
                    }
                    catch (_b) {
                        fs.appendFile("./logs/integrity.log", date.toLocaleString() +
                            " --- FATAL ERROR: OLD DATA == NEW DATA. SOMETHING WEIRD HAPPENED\n", function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                    shoes = new productModel_1.ProductModel();
                    return [4 /*yield*/, shoes.getAllDB()];
                case 6:
                    allShoes = _a.sent();
                    // Verify that the shoe list is the same
                    try {
                        chai.expect(allShoes).to.deep.equal(integrityNew);
                    }
                    catch (_c) {
                        fs.appendFile("./logs/integrity.log", date.toLocaleString() + " --- FATAL ERROR: NEW DATA NOT REFLECTED ON APP\n", function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); });
}
/**
 * *** AVAILABILITY QUALITY ATTRIBUTE AUTOMATIC TEST ***
 *
 * The purpose of this cron job is to send a request to the live application every 15 minutes.
 * This is to check if the app is live (i.e. available). If the app is live, make a log of it
 * otherwise, log an error and shuts down the node process (process exit code 1).
 */
function availability() {
    var _this = this;
    cron.schedule("0,15,30,45 * * * *", function () {
        var date = new Date();
        request("https://seng350.roubekas.com", function (error, response, body) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(response.statusCode === 200)) return [3 /*break*/, 1];
                        fs.appendFile("./logs/availability.log", date.toLocaleString() + " --- Heartbeat confirmed, server is alive and well\n", function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                        return [3 /*break*/, 3];
                    case 1:
                        fs.appendFile("./logs/availability.log", date.toLocaleString() + " --- FATAL ERROR: Heartbeat dead, shutting down\n", function (err) {
                            if (err) {
                                throw err;
                            }
                        });
                        return [4 /*yield*/, delay(10000)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, process.exit(1)];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
}
/**
 * The purpose of this cron job is to renew the log files at the end of every Sunday and Thursday
 * This is done with the goal of not having 20gb log files that crash the server
 */
function renew() {
    cron.schedule("59 23 * * 3,7", function () {
        fs.unlink("./logs/update.log", function (err) {
            if (err) {
                throw err;
            }
        });
        fs.link("./logs/update.log", function (err) {
            if (err) {
                throw err;
            }
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
        });
        fs.unlink("./logs/availability.log", function (err) {
            if (err) {
                throw err;
            }
        });
        fs.link("./logs/availability.log", function (err) {
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
//# sourceMappingURL=cron.js.map