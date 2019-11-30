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
var productModel_1 = require("../models/productModel");
var router_1 = require("../routes/router");
var ProductController = /** @class */ (function (_super) {
    __extends(ProductController, _super);
    function ProductController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProductController.create = function (router) {
        // show all shoes
        router.get("/user/:id/allShoes", function (req, res, next) {
            new ProductController().allShoes(req, res, next);
        });
        // show all shoes sorted from high to low
        router.get("/user/:id/allShoes/sort/price_high", function (req, res, next) {
            new ProductController().sortPriceHighDb(req, res, next);
        });
        // show all shoes sorted from low to high
        router.get("/user/:id/allShoes/sort/price_low", function (req, res, next) {
            new ProductController().sortPriceLowDb(req, res, next);
        });
        // Add shoe (id2) to user (id) portfolio, redirect to price input
        router.get("/user/:id/add_shoe/:id2", function (req, res, next) {
            new ProductController().inputShoe(req, res, next);
        });
    };
    ProductController.prototype.inputShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, shoeIdString, shoeId, shoe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        shoeIdString = "id2";
                        shoeId = parseInt(req.params[shoeIdString], 10);
                        return [4 /*yield*/, Helpers.getShoe(shoeId)];
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
    // get all the shoes from the db and render to shoesList view
    ProductController.prototype.allShoes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId, shoeIf, allShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, Helpers.isUser(userId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        shoeIf = new productModel_1.ProductModel();
                        return [4 /*yield*/, shoeIf.getAllDB()];
                    case 2:
                        allShoes = _a.sent();
                        this.render(req, res, "shoeList", { id: userId, title: "Shoes", data: allShoes });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404)
                            .send({
                            message: "No user found with the given user id.",
                            status: res.status,
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.sortPriceLowDb = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, shoeIf, allShoes, sortedShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, Helpers.isUser(queryint)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        shoeIf = new productModel_1.ProductModel();
                        return [4 /*yield*/, shoeIf.getAllDB()];
                    case 2:
                        allShoes = _a.sent();
                        sortedShoes = allShoes;
                        sortedShoes.sort(function (a, b) { return a.current_price - b.current_price; });
                        this.render(req, res, "shoeList", {
                            data: sortedShoes,
                            id: queryint,
                            title: "Shoes",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404);
                        res.send("invalid user");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.sortPriceHighDb = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, queryint, shoeIf, allShoes, sortedShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        queryint = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, Helpers.isUser(queryint)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        shoeIf = new productModel_1.ProductModel();
                        return [4 /*yield*/, shoeIf.getAllDB()];
                    case 2:
                        allShoes = _a.sent();
                        sortedShoes = allShoes;
                        sortedShoes.sort(function (a, b) { return b.current_price - a.current_price; });
                        this.render(req, res, "shoeList", {
                            data: sortedShoes,
                            id: queryint,
                            title: "Shoes",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(404);
                        res.send("invalid user");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}(router_1.BaseRoute));
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map