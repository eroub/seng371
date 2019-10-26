import { NextFunction, Request, Response, Router} from "express";
import Shoes = require("../../dist/data.json");
import { BaseRoute } from "./router";

export class ShoeRouter extends BaseRoute {
    public static create(router: Router) {
        // log
        console.log("[ShoeRoute::create] Creating ShoeRoutes route.");

        // add home page route
        router.get("/api/shoes", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().getAll(req, res, next);
        });

        // add getOne route
        router.get("/api/shoes/:id", (req: Request, res: Response, next: NextFunction) => {
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
            // res.send(Shoes);
            const shoeArray: any[] = [];
            Shoes.forEach((element: any) => {
                shoeArray.push(JSON.parse(JSON.stringify(element)));
            });
            console.log(shoeArray);
            this.render(req, res, "allShoes", {title: "Shoes", data: shoeArray});
    }

    /**
     * GET one shoe by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const query: any = req.params[idString];
        let shoe: any = Shoes[1];
        for (const item in Shoes) {
            if (Shoes[item].id === query) {
                shoe = Shoes[item];
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
