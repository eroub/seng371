import { NextFunction, Request, Response, Router} from "express";
import Shoes = require("../../dist/data.json");
import { BaseRoute } from "./router";
import DbClient = require("../DbClient");
import { user_model } from "../models/user_model";

export class ShoeRouter extends BaseRoute {
    public static create(router: Router) {
        // log
        console.log("[ShoeRoute::create] Creating ShoeRoutes route.");

        // add home page route
        router.get("/user/:id/shoes", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().getAll(req, res, next);
        });

        // add getOne route
        router.get("/user/:id/shoes/:id2", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().getOne(req, res, next);
        });

        router.get("/api/sortpricelow", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().sortPriceLow(req, res, next);
        });

        router.get("/api/sortpricehigh", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().sortPriceHigh(req, res, next);
        });

    }

    // constructor() {
        // not much here yet
    // }

    public sortPriceLow(req: Request, res: Response, next: NextFunction) {
        const shoes: any[] = [];
        Shoes.forEach((element: any) => {
            shoes.push(JSON.parse(JSON.stringify(element)));
        });
        shoes.sort((a, b) => a.current_price - b.current_price);
        console.log(shoes);
        this.render(req, res, "allShoes", {title: "Shoes", data: shoes});

    }

    public sortPriceHigh(req: Request, res: Response, next: NextFunction) {
        const shoes: any[] = [];
        Shoes.forEach((element: any) => {
            shoes.push(JSON.parse(JSON.stringify(element)));
        });
        shoes.sort((a, b) => b.current_price - a.current_price);
        console.log(shoes);
        this.render(req, res, "allShoes", {title: "Shoes", data: shoes});

    }

    /**
     * GET all Shoes.
     */
    public async getAll(req: Request, res: Response, next: NextFunction) {
            const idString = "id";
            const queryint = parseInt(req.params[idString], 10);
            const yeet = new user_model();
            const shoes = await yeet.get_all(queryint);
            console.log(shoes);
            if(shoes.length != 0) {
                res.send(shoes);
            }
            else res.send("404 not found lol");
           /* DbClient.connect()
            .then((db) => {
                return db!.collection("users").find().toArray();
            })
            .then((sneakers:any) => {
                console.log(sneakers);
                res.send(sneakers);
            })
            .catch((err) => {
                console.log("err.message");
            })
            // res.send(Shoes);
            /* const shoeArray: any[] = [];
            Shoes.forEach((element: any) => {
                shoeArray.push(JSON.parse(JSON.stringify(element)));
            });
            console.log(shoeArray);
            this.render(req, res, "allShoes", {title: "Shoes", data: shoeArray}); */
    }

    /**
     * GET one shoe by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        let shoe: any = Shoes[1];
        for (const item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                const shoeid: number = Shoes[item].id;
                if (shoeid === queryint) {
                    shoe = Shoes[item];
                }
            }
        }
        if (shoe) {
            const diff = "diff";
            shoe[diff] = shoe.current_price - shoe.retail_price;
            this.render(req, res, "oneShoe", shoe);
            /* res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    shoe
                }); */
        } else {
            res.status(404)
                .send({
                    message: "No shoe found with the given id.",
                    status: res.status,
                });
        }

    }

}
