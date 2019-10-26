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
Object.defineProperty(exports, "__esModule", { value: true });
var Shoes = require("../../dist/data.json");
var router_1 = require("./router");
// import DbClient from '../DbClient'
var ShoeRouter = /** @class */ (function (_super) {
    __extends(ShoeRouter, _super);
    function ShoeRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShoeRouter.create = function (router) {
        // log
        console.log("[ShoeRoute::create] Creating ShoeRoutes route.");
        // add home page route
        router.get("/api/shoes", function (req, res, next) {
            new ShoeRouter().getAll(req, res, next);
        });
        // add getOne route
        router.get("/api/shoes/:id", function (req, res, next) {
            new ShoeRouter().getOne(req, res, next);
        });
        router.get("/api/sortpricelow", function (req, res, next) {
            new ShoeRouter().sortPriceLow(req, res, next);
        });
        router.get("/api/sortpricehigh", function (req, res, next) {
            new ShoeRouter().sortPriceHigh(req, res, next);
        });
    };
    // constructor() {
    // not much here yet
    // }
    ShoeRouter.prototype.sortPriceLow = function (req, res, next) {
        var shoes = [];
        Shoes.forEach(function (element) {
            shoes.push(JSON.parse(JSON.stringify(element)));
        });
        shoes.sort(function (a, b) { return a.current_price - b.current_price; });
        console.log(shoes);
        this.render(req, res, "allShoes", { title: "Shoes", data: shoes });
    };
    ShoeRouter.prototype.sortPriceHigh = function (req, res, next) {
        var shoes = [];
        Shoes.forEach(function (element) {
            shoes.push(JSON.parse(JSON.stringify(element)));
        });
        shoes.sort(function (a, b) { return b.current_price - a.current_price; });
        console.log(shoes);
        this.render(req, res, "allShoes", { title: "Shoes", data: shoes });
    };
    /**
     * GET all Shoes.
     */
    ShoeRouter.prototype.getAll = function (req, res, next) {
        /* DbClient.connect()
            .then((db) => {
                return db!.collection("sneakers").find().toArray();
            })
            .then((sneakers:any) => {
                console.log(sneakers);
                res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            }) */
        // res.send(Shoes);
        var shoeArray = [];
        Shoes.forEach(function (element) {
            shoeArray.push(JSON.parse(JSON.stringify(element)));
        });
        console.log(shoeArray);
        this.render(req, res, "allShoes", { title: "Shoes", data: shoeArray });
    };
    /**
     * GET one shoe by id
     */
    ShoeRouter.prototype.getOne = function (req, res, next) {
        // const query = parseInt(req.params['id'], 10);
        var query = req.params['id'];
        var shoe = Shoes[1];
        for (var item in Shoes) {
            if (Shoes[item].id == query) {
                shoe = Shoes[item];
            }
        }
        //const shoe:any = Shoes.find((element: any) => shoe.id === query);
        if (shoe) {
            var diff = "diff";
            shoe[diff] = shoe.current_price - shoe.retail_price;
            this.render(req, res, "oneShoe", shoe);
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
    };
    return ShoeRouter;
}(router_1.BaseRoute));
exports.ShoeRouter = ShoeRouter;
//# sourceMappingURL=shoeRouter.js.map