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
var notificationModel_1 = require("../models/notificationModel");
var productModel_1 = require("../models/productModel");
var router_1 = require("../routes/router");
var userNotifications;
var Shoes;
var id;
var NotificationController = /** @class */ (function (_super) {
    __extends(NotificationController, _super);
    function NotificationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates NotificationController routes.
     *
     * @class NotificationController extends BaseRoute
     * @method create
     * @param router {Router} The router object.
     * @return void
     */
    NotificationController.create = function (router) {
        router.get("/user/:id/notifications", function (req, res, next) {
            new NotificationController().notificationCentre(req, res, next);
        });
        router.get("/user/:id/add_notification/:id2", function (req, res, next) {
            new NotificationController().inputNotification(req, res, next);
        });
        router.get("/user/:id/edit_notification/:id2", function (req, res, next) {
            new NotificationController().editNotificationForm(req, res, next);
        });
        router.get("/user/:id/notifications/filter/fulfilled", function (req, res, next) {
            new NotificationController().filterFulfilled(req, res, next);
        });
        router.get("/user/:id/notifications/filter/unfulfilled", function (req, res, next) {
            new NotificationController().filterUnfulfilled(req, res, next);
        });
        router.post("/user/:id/add_notification/:id2", function (req, res, next) {
            new NotificationController().addNotification(req, res, next);
        });
        router.post("/user/:id/remove_notification/:id2", function (req, res, next) {
            new NotificationController().removeNotification(req, res, next);
        });
        router.post("/user/:id/edit_notification/:id2", function (req, res, next) {
            new NotificationController().editNotification(req, res, next);
        });
    };
    /**
     * Renders the notificationCentre view when user navigates to /user/<user_id>/notifications.
     *
     * @class NotificationController extends BaseRoute
     * @method notificationCentre
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    NotificationController.prototype.notificationCentre = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        return [4 /*yield*/, this.buildNotifications(userId)];
                    case 1:
                        if (_a.sent()) {
                            this.render(req, res, "notificationCentre", { id: userId, title: "Notifications", notifications: userNotifications });
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
     * Renders the notificationCentre view when user navigates to /user/<user_id>/notifications/filter/fulfilled.
     *
     * @class NotificationController extends BaseRoute
     * @method filterFulfilled
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    NotificationController.prototype.filterFulfilled = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId, fulfilledNots, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        fulfilledNots = [];
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (_a.sent()) {
                            for (item in userNotifications) {
                                if (userNotifications.hasOwnProperty(item)) {
                                    if (userNotifications[item].fulfilled) {
                                        fulfilledNots.push(userNotifications[item]);
                                    }
                                }
                            }
                            this.render(req, res, "notificationCentre", { id: userId, title: "Notifications", notifications: fulfilledNots });
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
     * Renders the notificationCentre view when user navigates to /user/<user_id>/notifications/filter/unfulfilled.
     *
     * @class NotificationController extends BaseRoute
     * @method filterUnulfilled
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    NotificationController.prototype.filterUnfulfilled = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var idString, userId, unfulfilledNots, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        idString = "id";
                        userId = parseInt(req.params[idString], 10);
                        unfulfilledNots = [];
                        return [4 /*yield*/, this.check_local(userId)];
                    case 1:
                        if (_a.sent()) {
                            for (item in userNotifications) {
                                if (userNotifications.hasOwnProperty(item)) {
                                    if (!userNotifications[item].fulfilled) {
                                        unfulfilledNots.push(userNotifications[item]);
                                    }
                                }
                            }
                            this.render(req, res, "notificationCentre", { id: userId, title: "Notifications", notifications: unfulfilledNots });
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
     * redirects to allShoes view when the user navigates to
     * /user/<user_id>/notifications/add_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method addNotification
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    NotificationController.prototype.addNotification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, sString, userID, shoeID, nIF, threshold;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        sString = "id2";
                        userID = parseInt(req.params[uString], 10);
                        shoeID = parseInt(req.params[sString], 10);
                        nIF = new notificationModel_1.NotificationModel();
                        threshold = req.body.threshold;
                        if (!threshold) {
                            threshold = 0;
                        }
                        return [4 /*yield*/, nIF.addNotification(userID, shoeID, threshold, req.body.type)];
                    case 1:
                        _a.sent();
                        res.redirect("/user/" + userID + "/allShoes");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * redirects to notifications view when the user navigates to /user/<user_id>/remove_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method removeNotification
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    NotificationController.prototype.removeNotification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, idString, userID, notifID, nIF;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        idString = "id2";
                        userID = parseInt(req.params[uString], 10);
                        notifID = req.params[idString];
                        nIF = new notificationModel_1.NotificationModel();
                        return [4 /*yield*/, nIF.remove_notif(notifID)];
                    case 1:
                        _a.sent();
                        res.redirect("/user/" + userID + "/notifications");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * redirects to notifications view when the user navigates to /user/<user_id>/edit_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method editNotifications
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    NotificationController.prototype.editNotification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, idString, userID, notifID, nIF;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        idString = "id2";
                        userID = parseInt(req.params[uString], 10);
                        notifID = req.params[idString];
                        nIF = new notificationModel_1.NotificationModel();
                        if (!req.body.threshold) {
                            req.body.threshold = 0;
                        }
                        return [4 /*yield*/, nIF.edit_notif(notifID, req.body.threshold, req.body.type)];
                    case 1:
                        _a.sent();
                        res.redirect("/user/" + userID + "/notifications");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * fetches the addNotification view when the user navigates to /user/<user_id>/add_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method inputNotifications
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    NotificationController.prototype.inputNotification = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, shoeIdString, shoeId, shoeIF, shoe, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        shoeIdString = "id2";
                        shoeId = parseInt(req.params[shoeIdString], 10);
                        shoeIF = new productModel_1.ProductModel();
                        return [4 /*yield*/, shoeIF.getOneShoe(shoeId)];
                    case 1:
                        shoe = _b.sent();
                        _a = shoe;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, Helpers.isUser(userId)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a) {
                            this.render(req, res, "addNotification", { id: userId, shoe: shoe });
                            res.status(200)
                                .send({
                                message: "Success",
                                status: res.status,
                            });
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
    /**
     * fetches the ditNotification view when the user navigates to /user/<user_id>/edit_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method editNotificationForm
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    NotificationController.prototype.editNotificationForm = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userIdString, userId, notIdString, notId, notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userIdString = "id";
                        userId = parseInt(req.params[userIdString], 10);
                        notIdString = "id2";
                        notId = req.params[notIdString];
                        return [4 /*yield*/, this.getNotif(notId)];
                    case 1:
                        notification = _a.sent();
                        this.render(req, res, "editNotification", { id: userId, title: "Notification", notification: notification });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * A helper function to set the usrs notifications.
     *
     * @class NotificationController extends BaseRoute
     * @method buildNotifications
     * @param UserID, the ID of the user for whom to return notifications for
     * @return boolean
     */
    NotificationController.prototype.buildNotifications = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _i, item, notification, shoe;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, Helpers.isUser(userID)];
                    case 1:
                        if (!_c.sent()) return [3 /*break*/, 7];
                        id = userID;
                        return [4 /*yield*/, this.setLocals(userID)];
                    case 2:
                        _c.sent();
                        _a = [];
                        for (_b in userNotifications)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        item = _a[_i];
                        if (!userNotifications.hasOwnProperty(item)) return [3 /*break*/, 5];
                        notification = userNotifications[item];
                        shoe = this.getShoe(notification.shoe_id);
                        notification["shoename"] = shoe.brand + " " + shoe.model + " " + shoe.colorway;
                        notification["current_price"] = shoe.current_price;
                        notification["size"] = shoe.size;
                        return [4 /*yield*/, this.checkFulfilled(notification, shoe.current_price)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        userNotifications.sort(function (a, b) {
                            console.log("false!!!", userID);
                            return a.shoename.toLowerCase().localeCompare(b.shoename.toLowerCase());
                        });
                        return [2 /*return*/, true];
                    case 7: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * A helper function that checks if a notification has been fulfilled
     * @class NotificationController extends BaseRoute
     * @method editNotificationForm
     * @param notification
     * @param currentPrice
     * @return void
     */
    NotificationController.prototype.checkFulfilled = function (notification, currentPrice) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!notification.fulfilled) return [3 /*break*/, 4];
                        if (!((notification.type === "Below") && (notification.threshold > currentPrice))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fulfill(notification._id)];
                    case 1:
                        _a.sent();
                        notification.fulfilled = true;
                        _a.label = 2;
                    case 2:
                        if (!((notification.type === "Above") && (notification.threshold < currentPrice))) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.fulfill(notification._id)];
                    case 3:
                        _a.sent();
                        notification.fulfilled = true;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Queries the db to update status of a notification.
     *
     * @class NotificationController extends BaseRoute
     * @method fulfill
     * @param Notification  the notification Object.
     * @return true if the notification was successfully fulfilled, otherwise false.
     */
    NotificationController.prototype.fulfill = function (notification) {
        return __awaiter(this, void 0, void 0, function () {
            var nIF;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nIF = new notificationModel_1.NotificationModel();
                        return [4 /*yield*/, nIF.fulfill(notification._id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * calls buildNotifications is userNotifications is empty or if id != userID
     *
     * @class NotificationController extends BaseRoute
     * @method check_local
     * @param UserID  the id of the current user.
     * @return true if buildnotifications returns succesfully
     */
    NotificationController.prototype.check_local = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!userNotifications) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.buildNotifications(userID)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(id !== userID)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.buildNotifications(userID)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * calls local function setUserNotifications to set local variable userNotification
     *
     * @class NotificationController extends BaseRoute
     * @method setLocals
     * @param UserID  the id of the current user.
     * @return void
     */
    NotificationController.prototype.setLocals = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setUserNotifications(userID)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Helpers.getAllDbShoes()];
                    case 2:
                        Shoes = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Queries the DB to set local variable userNotification
     *
     * @class NotificationController extends BaseRoute
     * @method setUserNotifications
     * @param UserID  the id of the current user.
     * @return void
     */
    NotificationController.prototype.setUserNotifications = function (userID) {
        return __awaiter(this, void 0, void 0, function () {
            var notifIf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notifIf = new notificationModel_1.NotificationModel();
                        return [4 /*yield*/, notifIf.getUserNotifications(userID)];
                    case 1:
                        userNotifications = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * returns a shoe object
     *
     * @class NotificationController extends BaseRoute
     * @method getShoe
     * @param UserID  the id of the current user.
     * @return shoe object
     */
    NotificationController.prototype.getShoe = function (shoeID) {
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
     * returns a shoe object
     *
     * @class NotificationController extends BaseRoute
     * @method getShoe
     * @param id (any)   the id of the notification.
     * @return notification object
     */
    NotificationController.prototype.getNotif = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var nIF, notif;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nIF = new notificationModel_1.NotificationModel();
                        return [4 /*yield*/, nIF.get_notif(id)];
                    case 1:
                        notif = _a.sent();
                        return [2 /*return*/, notif[0]];
                }
            });
        });
    };
    return NotificationController;
}(router_1.BaseRoute));
exports.NotificationController = NotificationController;
//# sourceMappingURL=notificationController.js.map