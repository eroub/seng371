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
<<<<<<< HEAD
var productModel_1 = require("../models/productModel");
var customerModel_1 = require("../models/customerModel");
=======
var shoe_model_1 = require("../models/shoe_model");
var user_model_1 = require("../models/user_model");
>>>>>>> 3cd606248212a819bc63e99c081755e3a6df94f3
var router_1 = require("./router");
var leaderboard = [];
var Shoes;
var users;
var allUserShoes;
var LeaderboardController = /** @class */ (function (_super) {
    __extends(LeaderboardController, _super);
    function LeaderboardController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeaderboardController.create = function (router) {
        router.get("/user/:id/leaderboard", function (req, res, next) {
            new LeaderboardController().leaderboard(req, res, next);
        });
    };
    LeaderboardController.prototype.leaderboard = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.isUser(userId)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.createBoard()];
                    case 2:
                        _a.sent();
                        this.render(req, res, "leaderboard", { id: userId, title: "Leaderboard", leaderboard: leaderboard });
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
    LeaderboardController.prototype.createBoard = function () {
        return __awaiter(this, void 0, void 0, function () {
            var item, ranking, userShoes, net, sunk, revenue, shoe, avg_net;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        leaderboard = [];
                        return [4 /*yield*/, this.setLocals()];
                    case 1:
                        _a.sent();
                        for (item in users) {
                            if (users.hasOwnProperty(item)) {
                                ranking = users[item];
                                userShoes = this.getUserShoes(users[item].user_id);
                                console.log(userShoes);
                                net = 0;
                                sunk = 0;
                                revenue = 0;
                                for (shoe in userShoes) {
                                    if (userShoes.hasOwnProperty(shoe)) {
                                        net = net + userShoes[shoe].current_price - userShoes[shoe].purchase_price;
                                        sunk = sunk + userShoes[shoe].purchase_price;
                                        revenue = revenue + userShoes[shoe].current_price;
                                    }
                                }
                                avg_net = void 0;
                                if (userShoes.length === 0) {
                                    avg_net = 0;
                                }
                                else
                                    avg_net = net / userShoes.length;
                                ranking["net"] = net;
                                ranking["sunk"] = sunk;
                                ranking["revenue"] = revenue;
                                ranking["avg_net"] = avg_net;
                                ranking["num"] = userShoes.length;
                                leaderboard.push(ranking);
                            }
                        }
                        leaderboard.sort(function (a, b) { return b.net - a.net; });
                        return [2 /*return*/];
                }
            });
        });
    };
    LeaderboardController.prototype.setLocals = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setUsers()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.setShoes()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LeaderboardController.prototype.setUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uif;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
<<<<<<< HEAD
                        uif = new customerModel_1.CustomerModel();
=======
                        uif = new user_model_1.UserModel();
>>>>>>> 3cd606248212a819bc63e99c081755e3a6df94f3
                        return [4 /*yield*/, uif.get_users()];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, uif.get_all_keys()];
                    case 2:
                        allUserShoes = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LeaderboardController.prototype.setShoes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var shoeIF;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
<<<<<<< HEAD
                        shoeIF = new productModel_1.ProductModel();
=======
                        shoeIF = new shoe_model_1.ShoeModel();
>>>>>>> 3cd606248212a819bc63e99c081755e3a6df94f3
                        return [4 /*yield*/, shoeIF.getAllDB()];
                    case 1:
                        Shoes = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LeaderboardController.prototype.getShoe = function (shoeID) {
        for (var item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                var shoe = Shoes[item];
                if (shoe.shoe_id === shoeID)
                    return shoe;
            }
        }
    };
    LeaderboardController.prototype.getUserShoes = function (userID) {
        var userShoes = [];
        for (var item in allUserShoes) {
            if (allUserShoes.hasOwnProperty(item)) {
                if (allUserShoes[item].user_id === userID) {
                    var shoe = allUserShoes[item];
                    var shoe_info = this.getShoe(allUserShoes[item].shoe_id);
                    shoe["current_price"] = shoe_info.current_price;
                    userShoes.push(shoe);
                }
            }
        }
        return userShoes;
    };
    LeaderboardController.prototype.isUser = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var userIF;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
<<<<<<< HEAD
                        userIF = new customerModel_1.CustomerModel();
=======
                        userIF = new user_model_1.UserModel();
>>>>>>> 3cd606248212a819bc63e99c081755e3a6df94f3
                        return [4 /*yield*/, userIF.isUser(userID)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LeaderboardController;
}(router_1.BaseRoute));
exports.LeaderboardController = LeaderboardController;
//# sourceMappingURL=leaderboardController.js.map