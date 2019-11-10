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
var userShoes;
var ShoeRouter = /** @class */ (function (_super) {
    __extends(ShoeRouter, _super);
    function ShoeRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShoeRouter.create = function (router) {
        // log
        console.log("[ShoeRoute::create] Creating ShoeRoutes route.");
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
        // show all shoes from db
        router.get("/user/:id/allShoes", function (req, res, next) {
            new ShoeRouter().allShoe(req, res, next);
        });
        // show all shoes sorted from high to low
        router.get("/user/:id/allShoes/sort/price_high", function (req, res, next) {
            new ShoeRouter().sortPriceHigh(req, res, next);
        });
        // show all shoes sorted from low to high
        router.get("/user/:id/allShoes/sort/price_low", function (req, res, next) {
            new ShoeRouter().sortPriceLow(req, res, next);
        });
        router.get("/user/:id/notifications", function (req, res, next) {
            new ShoeRouter().notificationCentre(req, res, next);
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
    // constructor() {
    // not much here yet
    // }
    ShoeRouter.prototype.notificationCentre = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId;
            return __generator(this, function (_a) {
                idString = "id";
                userId = parseInt(req.params[idString], 10);
                this.render(req, res, "notificationCentre", { id: userId, title: "Shoes" });
                return [2 /*return*/];
            });
        });
    };
    ShoeRouter.prototype.removeShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, shoeIdString, shoeId, uif;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        shoeIdString = "id2";
                        shoeId = parseInt(req.params[shoeIdString], 10);
                        uif = new user_model_1.UserModel();
                        return [4 /*yield*/, uif.remove_shoe(userId, shoeId)];
                    case 1:
                        _a.sent();
                        res.redirect('/user/' + userId + '/shoes/');
                        return [2 /*return*/];
                }
            });
        });
    };
    // get all the shoes from the db
    ShoeRouter.prototype.allShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId, shoeIf, allShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        shoeIf = new shoe_model_1.ShoeModel();
                        return [4 /*yield*/, shoeIf.get_all_db()];
                    case 1:
                        allShoes = _a.sent();
                        this.render(req, res, "shoeList", { id: userId, title: "Shoes", data: allShoes });
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
                        console.log(req.body.purchase_price);
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        shoeIdString = "id2";
                        shoeId = parseInt(req.params[shoeIdString], 10);
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 5];
                        if (!this.has_shoe(userShoes, shoeId)) return [3 /*break*/, 2];
                        //res.send("boi whatchu trynna do");
                        res.redirect('/user/' + userId + '/allShoes/');
                        return [3 /*break*/, 4];
                    case 2:
                        uif = new user_model_1.UserModel();
                        price = req.body.purchase_price;
                        if (!price) {
                            price = 0;
                        }
                        return [4 /*yield*/, uif.add_shoe(userId, shoeId, price)];
                    case 3:
                        _a.sent();
                        res.redirect('/user/' + userId + '/shoes/');
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.send("invalid user");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
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
                            /* res.status(200)
                                .send({
                                    message: 'Success',
                                    status: res.status,
                                    shoe
                                }); */
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
            var idString, queryint, sorted_shoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(queryint)];
                    case 1:
                        if (_a.sent()) {
                            console.log(userShoes);
                            sorted_shoes = userShoes;
                            console.log(sorted_shoes);
                            sorted_shoes.sort(function (a, b) { return a.current_price - b.current_price; });
                            console.log(sorted_shoes);
                            this.render(req, res, "allShoes", { id: queryint, username: userJson.username, title: "Shoes", data: sorted_shoes });
                        }
                        else
                            res.send("invalid user");
                        return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.sortPriceHigh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, sorted_shoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(queryint)];
                    case 1:
                        if (_a.sent()) {
                            console.log(userShoes);
                            sorted_shoes = userShoes;
                            console.log(sorted_shoes);
                            sorted_shoes.sort(function (a, b) { return b.current_price - a.current_price; });
                            this.render(req, res, "allShoes", { id: queryint, username: userJson.username, title: "Shoes", data: sorted_shoes });
                        }
                        else
                            res.send("invalid user");
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
                        return [4 /*yield*/, this.getUserInfo(queryint)];
                    case 1:
                        userJson = _a.sent();
                        console.log(userJson);
                        if (!userJson) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getUserShoes(userJson)];
                    case 2:
                        userShoes = _a.sent();
                        console.log("Here's the user info: " + userJson);
                        console.log("Here's the shoes: " + userShoes);
                        this.render(req, res, "allShoes", { id: queryint, title: "Shoes", username: userJson.username, data: userShoes });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404)
                            .send({
                            message: "No user found with the given id.",
                            status: res.status,
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GET one shoe by id
     */
    ShoeRouter.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, shoeIdString, shoeId, purchase, shoe, diff;
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
                        purchase = this.getPurchasePrice(userJson.shoelist, shoeId);
                        console.log(purchase);
                        console.log(shoeId, userId);
                        return [4 /*yield*/, this.getShoe(shoeId)];
                    case 2:
                        shoe = _a.sent();
                        if (shoe) {
                            diff = shoe.current_price - purchase;
                            this.render(req, res, "oneShoe", { id: userId, diff: diff, purchase: purchase, shoe: shoe });
                            /* res.status(200)
                                .send({
                                    message: 'Success',
                                    status: res.status,
                                    shoe
                                }); */
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No shoe found with the given id.",
                                status: res.status,
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        res.send("oof");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.check_local = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!(userJson || userShoes)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getUserInfo(userID)];
                    case 1:
                        userJson = _a.sent();
                        if (!userJson) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getUserShoes(userJson)];
                    case 2:
                        userShoes = _a.sent();
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                    case 4: return [3 /*break*/, 9];
                    case 5:
                        if (!(userJson.userId != userID)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.getUserInfo(userID)];
                    case 6:
                        userJson = _a.sent();
                        if (!userJson) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.getUserShoes(userJson)];
                    case 7:
                        userShoes = _a.sent();
                        return [2 /*return*/, true];
                    case 8: return [2 /*return*/, false];
                    case 9: return [2 /*return*/, true];
                }
            });
        });
    };
    ShoeRouter.prototype.has_shoe = function (userShoes, shoeID) {
        for (var _i = 0, userShoes_1 = userShoes; _i < userShoes_1.length; _i++) {
            var shoe = userShoes_1[_i];
            console.log(shoe.shoeId, shoeID);
            if (shoe.shoeId == shoeID) {
                return true;
            }
        }
        return false;
    };
    ShoeRouter.prototype.getPurchasePrice = function (userShoes, id) {
        var purchase = 0;
        for (var item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                var shoeid = userShoes[item].shoeId;
                if (shoeid === id) {
                    purchase = userShoes[item].purchase_price;
                }
            }
        }
        return purchase;
    };
    ShoeRouter.prototype.getUserInfo = function (queryint) {
        return __awaiter(this, void 0, void 0, function () {
            var user_if, user_info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_if = new user_model_1.UserModel();
                        return [4 /*yield*/, user_if.get_all(queryint)];
                    case 1:
                        user_info = _a.sent();
                        console.log(user_info);
                        if (user_info.length != 0) {
                            return [2 /*return*/, JSON.parse(JSON.stringify(user_info[0]))];
                        }
                        else
                            return [2 /*return*/];
                        return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.getUserShoes = function (userJson) {
        return __awaiter(this, void 0, void 0, function () {
            var shoeIf, uShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shoeIf = new shoe_model_1.ShoeModel();
                        return [4 /*yield*/, shoeIf.getAllShoes(userJson.shoelist)];
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
                        else
                            return [2 /*return*/];
                        return [2 /*return*/];
                }
            });
        });
    };
    return ShoeRouter;
}(router_1.BaseRoute));
exports.ShoeRouter = ShoeRouter;
//# sourceMappingURL=shoeRouter.js.map