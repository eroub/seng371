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
var productModel_1 = require("../models/productModel");
var router_1 = require("../routes/router");
var AdminController = /** @class */ (function (_super) {
    __extends(AdminController, _super);
    function AdminController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdminController.create = function (router) {
        router.get("/admin", function (req, res, next) {
            new AdminController().showAdmin(req, res, next);
        });
        router.get("/admin/users", function (req, res, next) {
            new AdminController().showAllUsers(req, res, next);
        });
        router.get("/admin/shoes", function (req, res, next) {
            new AdminController().showAllShoes(req, res, next);
        });
        // edit user
        router.get("/admin/users/edit_user/:id", function (req, res, next) {
            new AdminController().editUserForm(req, res, next);
        });
        // edit shoe
        router.get("/admin/shoes/edit_shoe/:id", function (req, res, next) {
            new AdminController().editShoeForm(req, res, next);
        });
        router.post("/admin/shoes/edit_shoe/:id", function (req, res, next) {
            new AdminController().editShoe(req, res, next);
        });
        router.post("/admin/users/edit_user/:id", function (req, res, next) {
            new AdminController().editUser(req, res, next);
        });
        router.post("/admin/users/add_user", function (req, res, next) {
            new AdminController().addUser(req, res, next);
        });
        router.post("/admin/shoes/add_shoe", function (req, res, next) {
            new AdminController().addShoe(req, res, next);
        });
        router.post("/admin/users/del_user/:id", function (req, res, next) {
            new AdminController().delUser(req, res, next);
        });
        router.post("/admin/shoes/del_shoe/:id", function (req, res, next) {
            new AdminController().delShoe(req, res, next);
        });
    };
    AdminController.prototype.showAdmin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.status(200);
                this.render(req, res, "admin", { title: "Admin" });
                return [2 /*return*/];
            });
        });
    };
    /*
    Shows all users in the db in a list.
     */
    AdminController.prototype.showAllUsers = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userArr = [];
                        return [4 /*yield*/, Helpers.getUsers()];
                    case 1:
                        userArr = _a.sent();
                        this.render(req, res, "admin_user", { users: userArr, title: "All users" });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.showAllShoes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var shoeArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shoeArr = [];
                        return [4 /*yield*/, Helpers.getAllDbShoes()];
                    case 1:
                        shoeArr = _a.sent();
                        this.render(req, res, "admin_shoes", { shoes: shoeArr, title: "All shoes" });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.editUserForm = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, userID, CM, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        userID = parseInt(uString, 10);
                        CM = new customerModel_1.CustomerModel();
                        return [4 /*yield*/, CM.userInfo(userID)];
                    case 1:
                        user = _a.sent();
                        user = user[0];
                        this.render(req, res, "editUser", { user: user, title: "Edit User" });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.editUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, userID, CM, editedName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        userID = uString;
                        CM = new customerModel_1.CustomerModel();
                        editedName = req.body.editedusername;
                        return [4 /*yield*/, CM.edit_userName(userID, editedName)];
                    case 1:
                        _a.sent();
                        res.redirect("/admin/users");
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.addUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var CM, editedName, newID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        CM = new customerModel_1.CustomerModel();
                        editedName = req.body.newusername;
                        return [4 /*yield*/, Helpers.getMaxUser()];
                    case 1:
                        newID = (_a.sent()) + 1;
                        return [4 /*yield*/, CM.add_user(newID, editedName)];
                    case 2:
                        _a.sent();
                        res.redirect("/admin/users");
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.delUser = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, userID, CM;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        userID = parseInt(req.params[uString]);
                        CM = new customerModel_1.CustomerModel();
                        return [4 /*yield*/, CM.remove_user(userID)];
                    case 1:
                        _a.sent();
                        res.redirect("/admin/users");
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.addShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var PM, shoeModel, colorway, brand, shoeCP, shoeRP, shoeSize, shoeID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        PM = new productModel_1.ProductModel();
                        shoeModel = req.body.model;
                        colorway = req.body.colorway;
                        brand = req.body.brand;
                        shoeCP = parseInt(req.body.current_price, 10);
                        shoeRP = parseInt(req.body.retail_price, 10);
                        shoeSize = parseInt(req.body.size, 10);
                        return [4 /*yield*/, Helpers.getMaxShoe()];
                    case 1:
                        shoeID = (_a.sent()) + 1;
                        return [4 /*yield*/, PM.add_shoe(shoeModel, shoeID, shoeSize, shoeCP, shoeRP, brand, colorway)];
                    case 2:
                        _a.sent();
                        res.redirect("/admin/shoes");
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.editShoeForm = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, shoeID, PM, shoe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        shoeID = req.params[uString];
                        PM = new productModel_1.ProductModel();
                        return [4 /*yield*/, PM.getOneShoe(shoeID)];
                    case 1:
                        shoe = _a.sent();
                        this.render(req, res, "editShoe", { shoe: shoe, title: "Edit shoe" });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.editShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, shoeID, PM, shoeModel, colorway, brand, shoeCP, shoeRP, shoeSize;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        shoeID = parseInt(req.params[uString]);
                        PM = new productModel_1.ProductModel();
                        shoeModel = req.body.model;
                        colorway = req.body.colorway;
                        brand = req.body.brand;
                        shoeCP = parseInt(req.body.current_price, 10);
                        shoeRP = parseInt(req.body.retail_price, 10);
                        shoeSize = parseInt(req.body.size, 10);
                        return [4 /*yield*/, PM.edit_shoe(shoeModel, shoeID, shoeSize, shoeCP, shoeRP, brand, colorway)];
                    case 1:
                        _a.sent();
                        res.redirect("/admin/shoes");
                        return [2 /*return*/];
                }
            });
        });
    };
    AdminController.prototype.delShoe = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uString, shoeID, PM;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uString = "id";
                        shoeID = parseInt(req.params[uString]);
                        console.log("this is the shoe to be delted", shoeID);
                        PM = new productModel_1.ProductModel();
                        return [4 /*yield*/, PM.remove_shoe(shoeID)];
                    case 1:
                        _a.sent();
                        res.redirect("/admin/shoes");
                        return [2 /*return*/];
                }
            });
        });
    };
    return AdminController;
}(router_1.BaseRoute));
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map