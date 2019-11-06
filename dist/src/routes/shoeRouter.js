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
var shoe_model_1 = require("../models/shoe_model");
var user_json;
var user_shoes;
var ShoeRouter = /** @class */ (function (_super) {
    __extends(ShoeRouter, _super);
    function ShoeRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShoeRouter.create = function (router) {
        // log
        console.log("[ShoeRoute::create] Creating ShoeRoutes route.");
        // add home page route
        router.get("/user/:id/shoes", function (req, res, next) {
            new ShoeRouter().getAll(req, res, next);
        });
        // add getOne route
        router.get("/user/:id/shoes/:id2", function (req, res, next) {
            new ShoeRouter().getOne(req, res, next);
        });
        router.get("/user/:id/shoes/sort/price_low", function (req, res, next) {
            new ShoeRouter().sortPriceLow(req, res, next);
        });
        router.get("/user/:id/shoes/sort/price_high", function (req, res, next) {
            new ShoeRouter().sortPriceHigh(req, res, next);
        });
        router.get("/user/:id/add_shoes", function (req, res, next) {
            new ShoeRouter().addShoe(req, res, next);
        });
        router.get("/user/:id/notifications", function (req, res, next) {
            new ShoeRouter().notificationCentre(req, res, next);
        });
    };
    // constructor() {
    // not much here yet
    // }
    ShoeRouter.prototype.notificationCentre = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, user_id;
            return __generator(this, function (_a) {
                idString = "id";
                user_id = parseInt(req.params[idString], 10);
                this.render(req, res, "notificationCentre", { id: user_id, title: "Shoes" });
                return [2 /*return*/];
            });
        });
    };
    ShoeRouter.prototype.addShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, user_id, shoe_if, all_shoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        user_id = parseInt(req.params[idString], 10);
                        shoe_if = new shoe_model_1.shoe_model();
                        return [4 /*yield*/, shoe_if.get_all()];
                    case 1:
                        all_shoes = _a.sent();
                        this.render(req, res, "addShoes", { id: user_id, title: "Shoes", data: all_shoes });
                        return [2 /*return*/];
                }
            });
        });
    };
    ShoeRouter.prototype.sortPriceLow = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, sorted_shoes;
            return __generator(this, function (_a) {
                idString = "id";
                queryint = parseInt(req.params[idString], 10);
                console.log(user_shoes);
                sorted_shoes = user_shoes;
                console.log(sorted_shoes);
                sorted_shoes.sort(function (a, b) { return a.current_price - b.current_price; });
                if (sorted_shoes.length != 0) {
                    console.log(sorted_shoes);
                    this.render(req, res, "allShoes", { id: queryint, username: user_json.username, title: "Shoes", data: sorted_shoes });
                }
                else
                    res.send("this user has no shoes");
                return [2 /*return*/];
            });
        });
    };
    ShoeRouter.prototype.sortPriceHigh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, sorted_shoes;
            return __generator(this, function (_a) {
                idString = "id";
                queryint = parseInt(req.params[idString], 10);
                console.log(user_shoes);
                sorted_shoes = user_shoes;
                console.log(sorted_shoes);
                sorted_shoes.sort(function (a, b) { return b.current_price - a.current_price; });
                if (sorted_shoes.length != 0) {
                    console.log(sorted_shoes);
                    this.render(req, res, "allShoes", { id: queryint, username: user_json.username, title: "Shoes", data: sorted_shoes });
                }
                else
                    res.send("this user has no shoes");
                return [2 /*return*/];
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
                        console.log("in ther other one");
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.get_user_info(queryint)];
                    case 1:
                        user_json = _a.sent();
                        return [4 /*yield*/, this.get_user_shoes(user_json)];
                    case 2:
                        user_shoes = _a.sent();
                        console.log("Here's the user info lol: " + user_json);
                        console.log("Here's the shoes lol: " + user_shoes);
                        if (user_shoes) {
                            this.render(req, res, "allShoes", { id: queryint, title: "Shoes", username: user_json.username, data: user_shoes });
                        }
                        else
                            res.send("404 not found lol");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * GET one shoe by id
     */
    ShoeRouter.prototype.getOne = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var shoe_if, user_id_string, user_id, shoe_id_string, shoe_id, purchase, shoe, diff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shoe_if = new shoe_model_1.shoe_model();
                        user_id_string = "id";
                        user_id = parseInt(req.params[user_id_string], 10);
                        shoe_id_string = "id2";
                        shoe_id = parseInt(req.params[shoe_id_string], 10);
                        purchase = this.get_purchase_price(user_json.shoelist, shoe_id);
                        console.log(purchase);
                        console.log(shoe_id, user_id);
                        return [4 /*yield*/, shoe_if.get_one_shoe(shoe_id)];
                    case 1:
                        shoe = _a.sent();
                        if (shoe) {
                            diff = shoe.current_price - purchase;
                            this.render(req, res, "oneShoe", { id: user_json.user_id, diff: diff, purchase: purchase, shoe: shoe });
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
    ShoeRouter.prototype.get_purchase_price = function (user_shoes, id) {
        var purchase = 0;
        for (var item in user_shoes) {
            if (user_shoes.hasOwnProperty(item)) {
                var shoeid = user_shoes[item].shoe_id;
                if (shoeid === id) {
                    purchase = user_shoes[item].purchase_price;
                }
            }
        }
        return purchase;
    };
    ShoeRouter.prototype.get_user_info = function (queryint) {
        return __awaiter(this, void 0, void 0, function () {
            var user_if, user_info, user_json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_if = new user_model_1.user_model();
                        return [4 /*yield*/, user_if.get_all(queryint)];
                    case 1:
                        user_info = _a.sent();
                        user_json = JSON.parse(JSON.stringify(user_info[0]));
                        return [2 /*return*/, user_json];
                }
            });
        });
    };
    ShoeRouter.prototype.get_user_shoes = function (user_json) {
        return __awaiter(this, void 0, void 0, function () {
            var shoe_if, user_shoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shoe_if = new shoe_model_1.shoe_model();
                        return [4 /*yield*/, shoe_if.get_all_shoes(user_json.shoelist)];
                    case 1:
                        user_shoes = _a.sent();
                        return [2 /*return*/, user_shoes];
                }
            });
        });
    };
    return ShoeRouter;
}(router_1.BaseRoute));
exports.ShoeRouter = ShoeRouter;
//# sourceMappingURL=shoeRouter.js.map