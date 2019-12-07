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
var router_1 = require("../routes/router");
var leaderboard = [];
var Shoes;
var users;
var allUserShoes;
var id;
var LeaderboardController = /** @class */ (function (_super) {
    __extends(LeaderboardController, _super);
    function LeaderboardController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates LeaderboardController routes.
     *
     * @class LeaderboardController extends BaseRoute
     * @method create
     * @param router {Router} The router object.
     * @return void
     */
    LeaderboardController.create = function (router) {
        router.get("/user/:id/leaderboard", function (req, res, next) {
            new LeaderboardController().leaderboard(req, res, next);
        });
        router.get("/user/:id/leaderboard/avgNetHigh", function (req, res, next) {
            new LeaderboardController().avgNetHigh(req, res, next);
        });
        router.get("/user/:id/leaderboard/avgNetLow", function (req, res, next) {
            new LeaderboardController().avgNetLow(req, res, next);
        });
        router.get("/user/:id/leaderboard/netHigh", function (req, res, next) {
            new LeaderboardController().netHigh(req, res, next);
        });
        router.get("/user/:id/leaderboard/netLow", function (req, res, next) {
            new LeaderboardController().netLow(req, res, next);
        });
    };
    /**
     * Renders the leaderboard view when user navigates to /user/<user_id>/leaderboard.
     *
     * @class leaderboard extends BaseRoute
     * @method leaderboard
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    LeaderboardController.prototype.leaderboard = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.createBoard(userId)];
                    case 1:
                        if (_a.sent()) {
                            this.render(req, res, "leaderboard", { id: userId, title: "Leaderboard", leaderboard: leaderboard });
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No user with associated ID. Check the entered number.",
                                status: res.status,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Renders the leaderboard view in sorted order when user navigates to /user/<user_id>/leaderboard/avgNetHigh.
     *
     * @class leaderboard extends BaseRoute
     * @method avgNetHigh
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    LeaderboardController.prototype.avgNetHigh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (_a.sent()) {
                            leaderboard.sort(function (a, b) { return b.avg_net - a.avg_net; });
                            this.render(req, res, "leaderboard", { id: userId, title: "Leaderboard", leaderboard: leaderboard });
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No user with associated ID. Check the entered number.",
                                status: res.status,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Renders the leaderboard view in sorted order when user navigates to /user/<user_id>/leaderboard/avgNetLow.
     *
     * @class leaderboard extends BaseRoute
     * @method avgNetLow
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    LeaderboardController.prototype.avgNetLow = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (_a.sent()) {
                            leaderboard.sort(function (a, b) { return a.avg_net - b.avg_net; });
                            this.render(req, res, "leaderboard", { id: userId, title: "Leaderboard", leaderboard: leaderboard });
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No user with associated ID. Check the entered number.",
                                status: res.status,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Renders the leaderboard view in sorted order when user navigates to /user/<user_id>/leaderboard/netLow.
     *
     * @class leaderboard extends BaseRoute
     * @method netLow
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    LeaderboardController.prototype.netLow = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (_a.sent()) {
                            leaderboard.sort(function (a, b) { return a.net - b.net; });
                            this.render(req, res, "leaderboard", { id: userId, title: "Leaderboard", leaderboard: leaderboard });
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No user with associated ID. Check the entered number.",
                                status: res.status,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Renders the leaderboard view in sorted order when user navigates to /user/<user_id>/leaderboard/netHigh.
     *
     * @class leaderboard extends BaseRoute
     * @method netHigh
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    LeaderboardController.prototype.netHigh = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (_a.sent()) {
                            leaderboard.sort(function (a, b) { return b.net - a.net; });
                            this.render(req, res, "leaderboard", { id: userId, title: "Leaderboard", leaderboard: leaderboard });
                        }
                        else {
                            res.status(404)
                                .send({
                                message: "No user with associated ID. Check the entered number.",
                                status: res.status,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if the leaderboard array has already been set otherwise it will call createBoard to query the db
     * @class LeaderboardController extends BaseRoute
     * @method check_local
     * @param userID The ID number of the user currently viewing the leaderboard.

     * @return void
     */
    LeaderboardController.prototype.check_local = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(leaderboard.length === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createBoard(userID)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(userID !== id)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.createBoard(userID)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     *  query the db to get the ranking data
     * @class LeaderboardController extends BaseRoute
     * @method createBoard
     * @param userID The ID number of the user currently viewing the leaderboard.
     * @return void
     */
    LeaderboardController.prototype.createBoard = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var item, ranking, userShoes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        leaderboard = [];
                        return [4 /*yield*/, Helpers.isUser(userID)];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        id = userID;
                        return [4 /*yield*/, this.setLocals()];
                    case 2:
                        _a.sent();
                        for (item in users) {
                            if (users.hasOwnProperty(item)) {
                                ranking = users[item];
                                userShoes = this.getUserShoes(users[item].user_id);
                                this.buildRanking(userShoes, ranking);
                            }
                        }
                        leaderboard.sort(function (a, b) { return b.net - a.net; });
                        return [2 /*return*/, true];
                    case 3: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     *  sets the data for a users ranking (net, sunk,revenue,avg_net,num) for leaderboard
     * @class LeaderboardController extends BaseRoute
     * @method buildRanking
     * @param userShoes an array of the users shoe objects.
     * @param An object that holds the properties important for ranking (net, sunk,revenue,avg_net,num) .

     * @return void
     */
    LeaderboardController.prototype.buildRanking = function (userShoes, ranking) {
        var _a;
        var net;
        var sunk;
        var revenue;
        _a = Helpers.setNet(userShoes), net = _a[0], sunk = _a[1], revenue = _a[2];
        var avgNet;
        if (userShoes.length === 0) {
            avgNet = 0;
        }
        else {
            avgNet = net / userShoes.length;
        }
        ranking["net"] = net;
        ranking["sunk"] = sunk;
        ranking["revenue"] = revenue;
        ranking["avg_net"] = avgNet;
        ranking["num"] = userShoes.length;
        leaderboard.push(ranking);
    };
    /**
     *  sets the data for users,shoes and allUserShoes variables by querying helpers class
     * @class LeaderboardController extends BaseRoute
     * @method setLocals
     * @return void
     */
    LeaderboardController.prototype.setLocals = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Helpers.getUsers()];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, Helpers.getAllDbShoes()];
                    case 2:
                        Shoes = _a.sent();
                        return [4 /*yield*/, Helpers.getAllUserShoes()];
                    case 3:
                        allUserShoes = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @class LeaderboardController extends BaseRoute
     * @method getShoe
     * @return shoe object
     */
    LeaderboardController.prototype.getShoe = function (shoeID) {
        for (var item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                var shoe = Shoes[item];
                if (shoe.shoe_id === shoeID) {
                    return shoe;
                }
            }
        }
    };
    /**
     * gets all the shoes for a user

     * @class LeaderboardController extends BaseRoute
     * @method getUserShoes
     * @return array of shoe objects
     */
    LeaderboardController.prototype.getUserShoes = function (userID) {
        var userShoes = [];
        for (var item in allUserShoes) {
            if (allUserShoes.hasOwnProperty(item)) {
                if (allUserShoes[item].user_id === userID) {
                    var shoe = allUserShoes[item];
                    var shoeInfo = this.getShoe(allUserShoes[item].shoe_id);
                    shoe["current_price"] = shoeInfo.current_price;
                    userShoes.push(shoe);
                }
            }
        }
        return userShoes;
    };
    return LeaderboardController;
}(router_1.BaseRoute));
exports.LeaderboardController = LeaderboardController;
//# sourceMappingURL=leaderboardController.js.map