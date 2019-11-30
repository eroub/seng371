"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Helpers = require("../helperFunctions");
var customerModel_1 = require("../models/customerModel");
var router_1 = require("../routes/router");
var userJson;
var userShoes;
var netGain = 0;
var sunkCost = 0;
var totalRevenue = 0;
var CustomerController = /** @class */ (function (_super) {
    __extends(CustomerController, _super);
    function CustomerController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerController.create = function (router) {
        // sorting all the shoes the user (id) owns from low to high
        router.get("/user/:id/shoes/sort/price_low", function (req, res, next) {
            new CustomerController().sortPriceLow(req, res, next);
        });
        // sorting the shoes the user (id) owns from high to low
        router.get("/user/:id/shoes/sort/price_high", function (req, res, next) {
            new CustomerController().sortPriceHigh(req, res, next);
        });
        // adds a shoe (id2) to a users (id) portfolio
        router.post("/user/:id/add_shoe/:id2", function (req, res, next) {
            new CustomerController().addShoe(req, res, next);
        });
        // removes a shoe (id2) from a users (id) portfolio
        router.post("/user/:id/remove_shoe/:id2", function (req, res, next) {
            new CustomerController().removeShoe(req, res, next);
        });
        // users home page showing all the shoes the user (id) owns
        router.get("/user/:id/shoes", function (req, res, next) {
            new CustomerController().getAll(req, res, next);
        });
        // showing a specific shoe (id2) that the user (id) owns
        router.get("/user/:id/shoes/:id2", function (req, res, next) {
            new CustomerController().getOne(req, res, next);
        });
        router.post("/user/:id/edit_shoe/:id2", function (req, res, next) {
            new CustomerController().editShoe(req, res, next);
        });
    };
    CustomerController.prototype.sortPriceLow = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, sortedShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(queryint)];
                    case 1:
                        if (_a.sent()) {
                            sortedShoes = userShoes;
                            sortedShoes.sort(function (a, b) { return a.current_price - b.current_price; });
                            this.render(req, res, "allShoes", { data: sortedShoes, id: queryint, net: netGain, sunk: sunkCost,
                                title: "Shoes", total: totalRevenue, username: userJson.username });
                        }
                        else {
                            res.status(404);
                            res.send("invalid user");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.sortPriceHigh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, sortedShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(queryint)];
                    case 1:
                        if (_a.sent()) {
                            sortedShoes = userShoes;
                            sortedShoes.sort(function (a, b) { return b.current_price - a.current_price; });
                            this.render(req, res, "allShoes", { data: sortedShoes, id: queryint, net: netGain, sunk: sunkCost,
                                title: "Shoes", total: totalRevenue, username: userJson.username });
                        }
                        else {
                            res.status(404);
                            res.send("invalid user");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.addShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, shoeIdString, shoeId, uif, price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        shoeIdString = "id2";
                        shoeId = parseInt(req.params[shoeIdString], 10);
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        uif = new customerModel_1.CustomerModel();
                        price = req.body.purchase_price;
                        if (!price) {
                            price = 0;
                        }
                        return [4 /*yield*/, uif.add_shoe(userId, shoeId, price)];
                    case 2:
                        _a.sent();
                        res.redirect("/user/" + userId + "/shoes/");
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404)
                            .send({
                            message: "No user with associated ID. Check the entered number.",
                            status: res.status,
                        });
                        res.send("invalid user");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.editShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, idString, userID, shoeID, uIF;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        idString = "id2";
                        userID = parseInt(req.params[uString], 10);
                        shoeID = req.params[idString];
                        uIF = new customerModel_1.CustomerModel();
                        if (!req.body.threshold) {
                            req.body.threshold = 0;
                        }
                        return [4 /*yield*/, uIF.edit_shoe(shoeID, req.body.purchase_price)];
                    case 1:
                        _a.sent();
                        res.redirect('/user/' + userID + '/shoes');
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.removeShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, idString, docID, uif;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (!(_a.sent())) {
                            res.status(404)
                                .send({
                                message: "No user with associated ID. Check the entered number.",
                                status: res.status,
                            });
                        }
                        idString = "id2";
                        docID = req.params[idString];
                        uif = new customerModel_1.CustomerModel();
                        return [4 /*yield*/, uif.remove_shoe(docID)];
                    case 2:
                        _a.sent();
                        res.redirect("/user/" + userId + "/shoes/");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GET all Shoes. Take user id from the url parameter. Then get all shoes for that user.
     */
    CustomerController.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.setLocal(queryint)];
                    case 1:
                        if (_a.sent()) {
                            userShoes.sort(function (a, b) {
                                if (a.name < b.name) {
                                    return -1;
                                }
                                if (a.name > b.name) {
                                    return 1;
                                }
                                return 0;
                            });
                            this.render(req, res, "allShoes", { data: userShoes, id: queryint, net: netGain, sunk: sunkCost,
                                title: "Shoes", total: totalRevenue, username: userJson.username });
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No user found with the given id.",
                                status: res.status,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, shoeIdString, shoeId, shoe, diff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        shoeIdString = "id2";
                        shoeId = req.params[shoeIdString];
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (_a.sent()) {
                            shoe = Helpers.findUserShoe(shoeId, userShoes);
                            if (shoe) {
                                diff = shoe.current_price - shoe.purchase_price;
                                this.render(req, res, "oneShoe", { id: userId, diff: diff, purchase: shoe.purchase_price, shoe: shoe });
                            }
                            else {
                                res.status(404)
                                    .send({
                                    message: "No shoe found with the given id.",
                                    status: res.status,
                                });
                            }
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No user found with the given id.",
                                status: res.status,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CustomerController.prototype.check_local = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!(userJson && userShoes)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setLocal(userID)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(userJson.user_id !== userID)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.setLocal(userID)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    CustomerController.prototype.setLocal = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userShoes = [];
                        netGain = 0;
                        sunkCost = 0;
                        totalRevenue = 0;
                        return [4 /*yield*/, Helpers.getUserInfo(userID)];
                    case 1:
                        userJson = _a.sent();
                        if (!userJson) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, Helpers.getUserShoes(userID)];
                    case 2:
                        userShoes = _a.sent();
                        return [4 /*yield*/, this.setNet(userShoes)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    CustomerController.prototype.setNet = function (userShoes) {
        var _a;
        _a = Helpers.setNet(userShoes), netGain = _a[0], sunkCost = _a[1], totalRevenue = _a[2];
    };
    return CustomerController;
}(router_1.BaseRoute));
exports.CustomerController = CustomerController;
//# sourceMappingURL=customerController.js.map