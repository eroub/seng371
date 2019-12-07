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
var numShoes = 0;
var CustomerController = /** @class */ (function (_super) {
    __extends(CustomerController, _super);
    function CustomerController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates customer routes.
     *
     * @class CustomerController extends BaseRoute
     * @method create
     * @param router {Router} The router object.
     * @return void
     */
    CustomerController.create = function (router) {
        // sorting all the shoes the user (id) owns from low to high
        router.get("/user/:id/shoes/sort/current_price_low", function (req, res, next) {
            new CustomerController().sortCurrentPriceLow(req, res, next);
        });
        // sorting the shoes the user (id) owns from high to low
        router.get("/user/:id/shoes/sort/current_price_high", function (req, res, next) {
            new CustomerController().sortCurrentPriceHigh(req, res, next);
        });
        router.get("/user/:id/shoes/sort/purchase_price_low", function (req, res, next) {
            new CustomerController().sortPurchasePriceLow(req, res, next);
        });
        // sorting the shoes the user (id) owns from high to low
        router.get("/user/:id/shoes/sort/purchase_price_high", function (req, res, next) {
            new CustomerController().sortPurchasePriceHigh(req, res, next);
        });
        router.get("/user/:id/settings", function (req, res, next) {
            new CustomerController().settings(req, res, next);
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
        router.post("/user/:id/edit_username", function (req, res, next) {
            new CustomerController().editUsername(req, res, next);
        });
    };
    /**
     * Renders the settings view for a specific user when they navigate to /user/<user_id>/settings.
     *
     * @class CustomerController extends BaseRoute
     * @method settings
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    CustomerController.prototype.settings = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(queryint)];
                    case 1:
                        if (_a.sent()) {
                            this.render(req, res, "settings", { id: queryint,
                                title: "Settings", username: userJson.username });
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
     * Handles the POST request sent from the settings view to edit a user's username.
     *
     * @class CustomerController extends BaseRoute
     * @method editUsername
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    CustomerController.prototype.editUsername = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, userID, uIF;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        userID = parseInt(req.params[uString], 10);
                        uIF = new customerModel_1.CustomerModel();
                        if (!req.body.uname && this.check_local(userID)) {
                            req.body.uname = userJson.username;
                        }
                        return [4 /*yield*/, uIF.edit_userName(userID, req.body.uname)];
                    case 1:
                        _a.sent();
                        res.redirect("/user/" + userID + "/shoes");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Renders the allShoes view for a specific user with shoes sorted by the lowest current price to the highest current price.
     *
     * @class CustomerController extends BaseRoute
     * @method sortCurrentPriceLow
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    CustomerController.prototype.sortCurrentPriceLow = function (req, res, next) {
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
                            this.render(req, res, "allShoes", { data: sortedShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
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
    /**
     * Renders the allShoes view for a specific user with shoes sorted by the highest current price to the lowest current price.
     *
     * @class CustomerController extends BaseRoute
     * @method sortCurrentPriceHigh
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    CustomerController.prototype.sortCurrentPriceHigh = function (req, res, next) {
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
                            this.render(req, res, "allShoes", { data: sortedShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
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
    /**
     * Renders the allShoes view for a specific user with shoes sorted by the lowest purchase price to the highest purchase price.
     *
     * @class CustomerController extends BaseRoute
     * @method sortPurchasePriceLow
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    CustomerController.prototype.sortPurchasePriceLow = function (req, res, next) {
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
                            sortedShoes.sort(function (a, b) { return a.purchase_price - b.purchase_price; });
                            this.render(req, res, "allShoes", { data: sortedShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
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
    /**
     * Renders the allShoes view for a specific user with shoes sorted by the highest purchase price to the lowest purchase price.
     *
     * @class CustomerController extends BaseRoute
     * @method sortPurchasePriceHigh
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    CustomerController.prototype.sortPurchasePriceHigh = function (req, res, next) {
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
                            sortedShoes.sort(function (a, b) { return b.purchase_price - a.purchase_price; });
                            this.render(req, res, "allShoes", { data: sortedShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
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
    /**
     * Handles the POST request sent by the addShoe view to add a shoe to a specific user's portfolio.
     *
     * @class CustomerController extends BaseRoute
     * @method addShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
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
                        price = parseInt(req.body.purchase_price, 10);
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
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles the POST request sent by the oneShoe view to edit a shoe in a specific user's portfolio.
     *
     * @class CustomerController extends BaseRoute
     * @method editShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
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
                        return [4 /*yield*/, uIF.edit_shoe(shoeID, parseInt(req.body.purchase_price, 10))];
                    case 1:
                        _a.sent();
                        res.redirect("/user/" + userID + "/shoes");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Handles the POST request sent by the allShoes view to remove a shoe in a specific user's portfolio.
     *
     * @class CustomerController extends BaseRoute
     * @method removeShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
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
     * Renders the allShoes view (with shoes sorted alphabetically ascending) when a user navigates to /user/<user_id>/shoes.
     *
     * @class CustomerController extends BaseRoute
     * @method getAll
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
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
                                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                            });
                            this.render(req, res, "allShoes", { data: userShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
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
    /**
     * Renders the oneShoe view when a user navigates to /user/<user_id>/shoes/<shoe_id>.
     *
     * @class CustomerController extends BaseRoute
     * @method getAll
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
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
                                console.log("shoe wasn't found");
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
    /**
     * Checks if local variables are set for sorting functions, and whether or not the local variables are correct for the current user.
     *
     * @class CustomerController extends BaseRoute
     * @method check_local
     * @param userID {Number} The id of the current user.
     * @return true
     */
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
    /**
     * Sets local variables for a specific user.
     *
     * @class CustomerController extends BaseRoute
     * @method setLocal
     * @param userID {Any} The id of the user.
     * @return true if the local variables were set, false if the user does not exist and the local variables could not be set.
     */
    CustomerController.prototype.setLocal = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userShoes = [];
                        netGain = 0;
                        sunkCost = 0;
                        totalRevenue = 0;
                        numShoes = 0;
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
    /**
     * Sets local variables for net gain/loss, etc. for a users shoe list.
     *
     * @class CustomerController extends BaseRoute
     * @method setNet
     * @param userShoes {Any} A list of user shoe JSON objects.
     * @return true
     */
    CustomerController.prototype.setNet = function (userShoes) {
        var _a;
        _a = Helpers.setNet(userShoes), netGain = _a[0], sunkCost = _a[1], totalRevenue = _a[2], numShoes = _a[3];
    };
    return CustomerController;
}(router_1.BaseRoute));
exports.CustomerController = CustomerController;
//# sourceMappingURL=customerController.js.map