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
var user_model_1 = require("../models/user_model");
var router_1 = require("./router");
var helpers = require("../helperFunctions");
var userJson;
var userShoes = [];
var userKeys;
var netGain = 0;
var sunkCost = 0;
var totalRevenue = 0;
var CustomerRouter = /** @class */ (function (_super) {
    __extends(CustomerRouter, _super);
    function CustomerRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerRouter.create = function (router) {
        // sorting all the shoes the user owns from low to high
        router.get("/user/:id/shoes/sort/price_low", function (req, res, next) {
            new CustomerRouter().sortPriceLow(req, res, next);
        });
        // sorting the shoes the user owns from high to low
        router.get("/user/:id/shoes/sort/price_high", function (req, res, next) {
            new CustomerRouter().sortPriceHigh(req, res, next);
        });
        router.post("/user/:id/add_shoe/:id2", function (req, res, next) {
            new CustomerRouter().addShoe(req, res, next);
        });
        router.post("/user/:id/remove_shoe/:id2", function (req, res, next) {
            new CustomerRouter().removeShoe(req, res, next);
        });
        // users home page showing all the shoes the user owns
        router.get("/user/:id/shoes", function (req, res, next) {
            new CustomerRouter().getAll(req, res, next);
        });
    };
    CustomerRouter.prototype.sortPriceLow = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, sortedShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, helpers.check_local(queryint)];
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
    CustomerRouter.prototype.sortPriceHigh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, sortedShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, helpers.check_local(queryint)];
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
    CustomerRouter.prototype.addShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, shoeIdString, shoeId, uif, price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        shoeIdString = "id2";
                        shoeId = parseInt(req.params[shoeIdString], 10);
                        return [4 /*yield*/, helpers.check_local(userId)];
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
    CustomerRouter.prototype.removeShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, idString, docID, uif;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        return [4 /*yield*/, helpers.check_local(userId)];
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
    /**
     * GET all Shoes. Take user id from the url parameter. Then get all shoes for that user.
     */
    CustomerRouter.prototype.getAll = function (req, res, next) {
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
                        return [4 /*yield*/, helpers.getUserInfo(queryint)];
                    case 1:
                        userJson = _a.sent();
                        if (!userJson) return [3 /*break*/, 5];
                        return [4 /*yield*/, helpers.getUserKeys(queryint)];
                    case 2:
                        userKeys = _a.sent();
                        return [4 /*yield*/, helpers.setUserShoes(userKeys)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, helpers.setNet(userShoes)];
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
    return CustomerRouter;
}(router_1.BaseRoute));
exports.CustomerRouter = CustomerRouter;
//# sourceMappingURL=customerRouter.js.map