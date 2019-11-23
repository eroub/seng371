import { NextFunction, Request, Response, Router} from "express";
import { ShoeModel } from "../models/shoe_model";
import { BaseRoute } from "./router";
import helpers = require("../helperFunctions");


export class productController extends BaseRoute {

// show all shoes from db
    public static create(router: Router) {

        router.get("/user/:id/allShoes", (req: Request, res: Response, next: NextFunction) => {
            new productController().allShoes(req, res, next);
        });
        // show all shoes sorted from high to low
        router.get("/user/:id/allShoes/sort/price_high", (req: Request, res: Response, next: NextFunction) => {
            new productController().sortPriceHighDb(req, res, next);
        });
        // show all shoes sorted from low to high
        router.get("/user/:id/allShoes/sort/price_low", (req: Request, res: Response, next: NextFunction) => {
            new productController().sortPriceLowDb(req, res, next);
        });

    }


    // get all the shoes from the db and render to shoesList view
    public async allShoes(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await helpers.isUser(userId)) {
            const shoeIf = new ShoeModel();
            const allShoes = await shoeIf.getAllDB();
            this.render(req, res, "shoeList", {id: userId, title: "Shoes", data: allShoes});
        } else {
            res.status(404)
                .send({
                    message: "No user found with the given user id.",
                    status: res.status,
                });
        }
    }


    public async sortPriceLowDb(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await helpers.isUser(queryint)) {
            const shoeIf = new ShoeModel();
            const allShoes = await shoeIf.getAllDB();
            const sortedShoes: any = allShoes;
            sortedShoes.sort((a: any, b: any) => a.current_price - b.current_price);
            this.render(req, res, "shoeList", {
                data: sortedShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async sortPriceHighDb(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await helpers.isUser(queryint)) {
            const shoeIf = new ShoeModel();
            const allShoes = await shoeIf.getAllDB();
            const sortedShoes: any = allShoes;
            sortedShoes.sort((a: any, b: any) => b.current_price - a.current_price);
            this.render(req, res, "shoeList", {
                data: sortedShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

}

