import {Router, Request, Response, NextFunction} from 'express';
import DbClient = require("../DbClient");
import { BaseRoute } from "./router";
//import DbClient from '../DbClient'
const Heroes = require('../../dist/data.json');
export class HeroRouter extends BaseRoute {
    public static create(router: Router) {
        //log
        console.log("[HeroRoute::create] Creating HeroRoutes route.");

        //add home page route
        router.get("/api/heroes", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().getAll(req, res, next);
        });

        // add getOne route
        router.get("/api/heroes/:id", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().getOne(req, res, next);
        });

        //router.get("/api/heroes/")
    }

    //constructor() {
        // not much here yet
    //}

    /**
     * GET all Heroes.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
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
            res.send(Heroes);
    }

    /**
     * GET one hero by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find((hero:any) => hero.id === query);
        if (hero) {
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


    }


}