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
var router_1 = require("./router");
//import DbClient from '../DbClient'
var Heroes = require('../../dist/data.json');
var HeroRouter = /** @class */ (function (_super) {
    __extends(HeroRouter, _super);
    function HeroRouter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeroRouter.create = function (router) {
        //log
        console.log("[HeroRoute::create] Creating HeroRoutes route.");
        //add home page route
        router.get("/api/shoes", function (req, res, next) {
            new HeroRouter().getAll(req, res, next);
        });
        // add getOne route
        router.get("/api/shoes/:id", function (req, res, next) {
            new HeroRouter().getOne(req, res, next);
        });
        router.get("/api/sortpricelow", function (req, res, next) {
            new HeroRouter().sortPriceLow(req, res, next);
        });
        router.get("/api/sortpricehigh", function (req, res, next) {
            new HeroRouter().sortPriceHigh(req, res, next);
        });
        //router.get("/api/heroes/")
    };
    //constructor() {
    // not much here yet
    //}
    HeroRouter.prototype.sortPriceLow = function (req, res, next) {
        var shoes = [];
        Heroes.forEach(function (element) { shoes.push(JSON.parse(JSON.stringify(element))); });
        shoes.sort(function (a, b) { return a.current_price - b.current_price; });
        console.log(shoes);
        this.render(req, res, "allShoes", { title: "Shoes", data: shoes });
    };
    HeroRouter.prototype.sortPriceHigh = function (req, res, next) {
        var shoes = [];
        Heroes.forEach(function (element) { shoes.push(JSON.parse(JSON.stringify(element))); });
        shoes.sort(function (a, b) { return b.current_price - a.current_price; });
        console.log(shoes);
        this.render(req, res, "allShoes", { title: "Shoes", data: shoes });
    };
    /**
     * GET all Heroes.
     */
    HeroRouter.prototype.getAll = function (req, res, next) {
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
        //res.send(Heroes);
        var hero_array = [];
        Heroes.forEach(function (element) { hero_array.push(JSON.parse(JSON.stringify(element))); });
        console.log(hero_array);
        this.render(req, res, "allShoes", { title: "Shoes", data: hero_array });
    };
    /**
     * GET one hero by id
     */
    HeroRouter.prototype.getOne = function (req, res, next) {
        var query = parseInt(req.params.id);
        var hero = Heroes.find(function (hero) { return hero.id === query; });
        if (hero) {
            hero["diff"] = hero.current_price - hero.retail_price;
            this.render(req, res, "oneShoe", hero);
            /* res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    hero
                }); */
        }
        else {
            res.status(404)
                .send({
                message: 'No hero found with the given id.',
                status: res.status
            });
        }
    };
    return HeroRouter;
}(router_1.BaseRoute));
exports.HeroRouter = HeroRouter;
//# sourceMappingURL=heroRouter.js.map