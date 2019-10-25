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
        router.get("/api/shoes", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().getAll(req, res, next);
        });

        // add getOne route
        router.get("/api/shoes/:id", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().getOne(req, res, next);
        });

        router.get("/api/sortpricelow", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().sortPriceLow(req, res, next);
        });

        router.get("/api/sortpricehigh", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().sortPriceHigh(req, res, next);
        });

        //router.get("/api/heroes/")
    }

    //constructor() {
        // not much here yet
    //}

    public sortPriceLow (req: Request, res: Response, next: NextFunction){
        let shoes: any[] = [];
        Heroes.forEach((element:any) => {shoes.push(JSON.parse(JSON.stringify(element)))});
        shoes.sort((a, b) => a.current_price - b.current_price)
        console.log(shoes);
        this.render(req, res, "allShoes", {title: "Shoes", data: shoes});

    }

    public sortPriceHigh (req: Request, res: Response, next: NextFunction){
        let shoes: any[] = [];
        Heroes.forEach((element:any) => {shoes.push(JSON.parse(JSON.stringify(element)))});
        shoes.sort((a, b) => b.current_price - a.current_price)
        console.log(shoes);
        this.render(req, res, "allShoes", {title: "Shoes", data: shoes});

    }

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
            //res.send(Heroes);
            let hero_array: any[] = [];
            Heroes.forEach((element:any) => {hero_array.push(JSON.parse(JSON.stringify(element)))});
            console.log(hero_array);
            this.render(req, res, "allShoes", {title: "Shoes", data: hero_array});
    }

    /**
     * GET one hero by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find((hero:any) => hero.id === query);
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


    }


}