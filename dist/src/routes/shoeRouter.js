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
var shoe_model_1 = require("../models/shoe_model");
var user_model_1 = require("../models/user_model");
var router_1 = require("./router");
var userJson;
var userKeys;
var userShoes = [];
var netGain = 0;
var sunkCost = 0;
var totalRevenue = 0;
var Shoes;
var ShoeRouter = /** @class */ (function (_super) {
    __extends(ShoeRouter, _super);
    function ShoeRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShoeRouter.create = function (router) {
        // users home page showing all the shoes the user owns
        router.get("/user/:id/shoes", function (req, res, next) {
            new ShoeRouter().getAll(req, res, next);
        });
        // showing a specific shoe that the user owns
        router.get("/user/:id/shoes/:id2", function (req, res, next) {
            new ShoeRouter().getOne(req, res, next);
        });
        // sorting all the shoes the user owns from low to high
        router.get("/user/:id/shoes/sort/price_low", function (req, res, next) {
            new ShoeRouter().sortPriceLow(req, res, next);
        });
        // sorting the shoes the user owns from high to low
        router.get("/user/:id/shoes/sort/price_high", function (req, res, next) {
            new ShoeRouter().sortPriceHigh(req, res, next);
        });
        router.get("/user/:id/add_shoe/:id2", function (req, res, next) {
            new ShoeRouter().inputShoe(req, res, next);
        });
        router.post("/user/:id/add_shoe/:id2", function (req, res, next) {
            new ShoeRouter().addShoe(req, res, next);
        });
        router.post("/user/:id/remove_shoe/:id2", function (req, res, next) {
            new ShoeRouter().removeShoe(req, res, next);
        });
    };
    ShoeRouter.prototype.removeShoe = function (req, res, next) {
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
                        uif = new user_model_1.UserModel();
                        return [4 /*yield*/, uif.remove_shoe(docID)];
                    case 2:
                        _a.sent();
                        res.redirect("/user/" + userId + "/shoes/");
                        return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.addShoe = function (req, res, next) {
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
                        uif = new user_model_1.UserModel();
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
    ShoeRouter.prototype.inputShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, shoeIdString, shoeId, shoe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        shoeIdString = "id2";
                        shoeId = parseInt(req.params[shoeIdString], 10);
                        return [4 /*yield*/, this.getShoe(shoeId)];
                    case 1:
                        shoe = _a.sent();
                        if (shoe) {
                            this.render(req, res, "addShoe", { id: userId, shoe: shoe });
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No shoe found with the given id.",
                                status: res.status,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.sortPriceLow = function (req, res, next) {
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
                            this.render(req, res, "allShoes", { id: queryint, username: userJson.username, title: "Shoes", data: sortedShoes, net: netGain,
                                total: totalRevenue, sunk: sunkCost });
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
    ShoeRouter.prototype.sortPriceHigh = function (req, res, next) {
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
                            this.render(req, res, "allShoes", { id: queryint, username: userJson.username, title: "Shoes", data: sortedShoes, net: netGain,
                                total: totalRevenue, sunk: sunkCost });
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
    /**
     * GET all Shoes. Take user id from the url parameter. Then get all shoes for that user.
     */
    ShoeRouter.prototype.getAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        userShoes = [];
                        netGain = 0;
                        sunkCost = 0;
                        totalRevenue = 0;
                        return [4 /*yield*/, this.getUserInfo(queryint)];
                    case 1:
                        userJson = _a.sent();
                        if (!userJson) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getUserKeys(queryint)];
                    case 2:
                        userKeys = _a.sent();
                        return [4 /*yield*/, this.setUserShoes(userKeys)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.setNet(userShoes)];
                    case 4:
                        _a.sent();
                        console.log(userShoes);
                        console.log(netGain);
                        this.render(req, res, "allShoes", { id: queryint, title: "Shoes", username: userJson.username, data: userShoes,
                            net: netGain, sunk: sunkCost, total: totalRevenue, keys: userKeys });
                        return [3 /*break*/, 6];
                    case 5:
                        res.status(404)
                            .send({
                            message: "No user found with the given id.",
                            status: res.status,
                        });
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GET one shoe by id
     */
    ShoeRouter.prototype.getOne = function (req, res, next) {
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
                            shoe = this.findShoe(shoeId);
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
    ShoeRouter.prototype.getShoeInfo = function (shoeID) {
        for (var item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                var shoe = Shoes[item];
                if (shoe.shoe_id === shoeID)
                    return shoe;
            }
        }
    };
    ShoeRouter.prototype.findShoe = function (shoeID) {
        console.log(shoeID);
        for (var item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                var shoe = userShoes[item];
                if (shoe._id == shoeID)
                    return shoe;
            }
        }
    };
    ShoeRouter.prototype.check_local = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!(userJson && userShoes)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getUserInfo(userID)];
                    case 1:
                        userJson = _a.sent();
                        if (!userJson) {
                            return [2 /*return*/, false];
                        }
                        console.log("setting shoes");
                        return [4 /*yield*/, this.getUserKeys(userID)];
                    case 2:
                        userKeys = _a.sent();
                        return [4 /*yield*/, this.setUserShoes(userKeys)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.setNet(userShoes)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 5:
                        if (!(userJson.user_id != userID)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getUserInfo(userID)];
                    case 6:
                        userJson = _a.sent();
                        if (!userJson) {
                            return [2 /*return*/, false];
                        }
                        userShoes = [];
                        netGain = 0;
                        sunkCost = 0;
                        totalRevenue = 0;
                        return [4 /*yield*/, this.getUserKeys(userID)];
                    case 7:
                        userKeys = _a.sent();
                        return [4 /*yield*/, this.setUserShoes(userKeys)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.setNet(userShoes)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 10: return [2 /*return*/, true];
                }
            });
        });
    };
    ShoeRouter.prototype.setUserShoes = function (userKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var item, key, shoe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllDbShoes()];
                    case 1:
                        Shoes = _a.sent();
                        for (item in userKeys) {
                            if (userKeys.hasOwnProperty(item)) {
                                key = userKeys[item];
                                shoe = this.getShoeInfo(key.shoe_id);
                                key["name"] = shoe.brand + ' ' + shoe.model + ' ' + shoe.colorway;
                                key["size"] = shoe.size;
                                key["current_price"] = shoe.current_price;
                                key["retail_price"] = shoe.retail_price;
                                userShoes.push(key);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.getUserKeys = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var user_if, userKeys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_if = new user_model_1.UserModel();
                        return [4 /*yield*/, user_if.get_keys(userID)];
                    case 1:
                        userKeys = _a.sent();
                        console.log(userKeys);
                        return [2 /*return*/, userKeys];
                }
            });
        });
    };
    ShoeRouter.prototype.has_shoe = function (userShoes, shoeID) {
        for (var item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                var shoeid = userShoes[item].shoe_id;
                if (shoeid === shoeID) {
                    return true;
                }
            }
        }
        return false;
    };
    ShoeRouter.prototype.getPurchasePrice = function (id) {
        var purchase = 0;
        for (var item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                var shoeid = userKeys[item].shoe_id;
                if (shoeid === id) {
                    purchase = userKeys[item].purchase_price;
                }
            }
        }
        return purchase;
    };
    ShoeRouter.prototype.getUserInfo = function (queryint) {
        return __awaiter(this, void 0, void 0, function () {
            var userIf, userInfo, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userIf = new user_model_1.UserModel();
                        userInfo = null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, userIf.userInfo(queryint)];
                    case 2:
                        userInfo = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4:
                        if (userInfo.length !== 0) {
                            return [2 /*return*/, userInfo[0]];
                        }
                        else {
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.getUserShoes = function (userKeys) {
        return __awaiter(this, void 0, void 0, function () {
            var shoeIf, uShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shoeIf = new shoe_model_1.ShoeModel();
                        return [4 /*yield*/, shoeIf.getAllShoes(userKeys)];
                    case 1:
                        uShoes = _a.sent();
                        return [2 /*return*/, uShoes];
                }
            });
        });
    };
    ShoeRouter.prototype.getShoe = function (shoeId) {
        return __awaiter(this, void 0, void 0, function () {
            var shoeIf, shoe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shoeIf = new shoe_model_1.ShoeModel();
                        return [4 /*yield*/, shoeIf.getOneShoe(shoeId)];
                    case 1:
                        shoe = _a.sent();
                        if (shoe) {
                            return [2 /*return*/, shoe];
                        }
                        else {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.setNet = function (shoelist) {
        return __awaiter(this, void 0, void 0, function () {
            var item, shoe;
            return __generator(this, function (_a) {
                for (item in shoelist) {
                    if (shoelist.hasOwnProperty(item)) {
                        shoe = shoelist[item];
                        netGain = netGain + shoe.current_price - shoe.purchase_price;
                        sunkCost = sunkCost + parseInt(shoe.purchase_price);
                        totalRevenue = totalRevenue + shoe.current_price;
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /* returns every shoe in db */
    ShoeRouter.prototype.getAllDbShoes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allShoes, shoeIf, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        allShoes = null;
                        shoeIf = new shoe_model_1.ShoeModel();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, shoeIf.getAllDB()];
                    case 2:
                        allShoes = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 4:
                        if (allShoes) {
                            return [2 /*return*/, allShoes];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ShoeRouter;
}(router_1.BaseRoute));
exports.ShoeRouter = ShoeRouter;
//# sourceMappingURL=shoeRouter.js.map