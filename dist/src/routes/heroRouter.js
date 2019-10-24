"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
//import DbClient from '../DbClient'
var Heroes = require('../../dist/data.json');
var HeroRouter = /** @class */ (function () {
    function HeroRouter() {
        // not much here yet
    }
    HeroRouter.create = function (router) {
        //log
        console.log("[HeroRoute::create] Creating HeroRoutes route.");
        //add home page route
        router.get("/api/heroes", function (req, res, next) {
            new HeroRouter().getAll(req, res, next);
        });
        // add getOne route
        router.get("/api/heroes/:id", function (req, res, next) {
            new HeroRouter().getOne(req, res, next);
        });
        //router.get("/api/heroes/")
    };
    /**
     * GET all Heroes.
     */
    HeroRouter.prototype.getAll = function (req, res, next) {
        DbClient.connect()
            .then(function (db) {
            return db.collection("sneakers").find().toArray();
        })
            .then(function (sneakers) {
            console.log(sneakers);
            res.send(sneakers);
        })
            .catch(function (err) {
            console.log("err.message");
        });
    };
    /**
     * GET one hero by id
     */
    HeroRouter.prototype.getOne = function (req, res, next) {
        var query = parseInt(req.params.id);
        var hero = Heroes.find(function (hero) { return hero.id === query; });
        if (hero) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                hero: hero
            });
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
}());
exports.HeroRouter = HeroRouter;
//# sourceMappingURL=heroRouter.js.map