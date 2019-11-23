import { NextFunction, Request, Response, Router} from "express";
import { UserModel } from "../models/user_model";
import { BaseRoute } from "./router";
import helpers = require("../helperFunctions");

let userJson: any;
let userShoes: any[] = [];
let userKeys: any;
let netGain: number = 0;
let sunkCost: number = 0;
let totalRevenue: number = 0;

export class CustomerRouter extends BaseRoute {

    public static create(router: Router) {
        // sorting all the shoes the user owns from low to high
        router.get("/user/:id/shoes/sort/price_low", (req: Request, res: Response, next: NextFunction) => {
            new CustomerRouter().sortPriceLow(req, res, next);
        });
        // sorting the shoes the user owns from high to low
        router.get("/user/:id/shoes/sort/price_high", (req: Request, res: Response, next: NextFunction) => {
            new CustomerRouter().sortPriceHigh(req, res, next);
        });
        router.post("/user/:id/add_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new CustomerRouter().addShoe(req, res, next);
        });

        router.post("/user/:id/remove_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new CustomerRouter().removeShoe(req, res, next);
        });
        // users home page showing all the shoes the user owns
        router.get("/user/:id/shoes", (req: Request, res: Response, next: NextFunction) => {
            new CustomerRouter().getAll(req, res, next);
        });
    }

    public async sortPriceLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await helpers.check_local(queryint)) {
            const sortedShoes: any = userShoes;
            sortedShoes.sort((a: any, b: any) => a.current_price - b.current_price);
            this.render(req, res, "allShoes",
                {id: queryint, username: userJson.username, title: "Shoes", data: sortedShoes, net: netGain,
                total: totalRevenue, sunk: sunkCost});
        } else {
            res.status(404);
            res.send("invalid user");
        }

    }

    public async sortPriceHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await helpers.check_local(queryint)) {
            const sortedShoes: any = userShoes;
            sortedShoes.sort((a: any, b: any) => b.current_price - a.current_price);
            this.render(req, res, "allShoes",
                {id: queryint, username: userJson.username, title: "Shoes", data: sortedShoes, net: netGain,
                total: totalRevenue, sunk: sunkCost});
        } else {
            res.status(404);
            res.send("invalid user");
        }

    }


    public async addShoe(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = parseInt(req.params[shoeIdString], 10);
        if (await helpers.check_local(userId)) {
            const uif = new UserModel();
            let price = req.body.purchase_price;
            if (!price) {
                price = 0;
            }
            await uif.add_shoe(userId, shoeId, price);
            res.redirect("/user/" + userId + "/shoes/");
        } else {
            res.status(404)
            .send({
                message: "No user with associated ID. Check the entered number.",
                status: res.status,
            });
            res.send("invalid user");

        }
    }

    public async removeShoe(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        if (!(await helpers.check_local(userId))) {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });
        }
        const idString = "id2";
        const docID = req.params[idString];
        const uif = new UserModel();
        await uif.remove_shoe(docID);
        res.redirect("/user/" + userId + "/shoes/");
    }

    
    /**
     * GET all Shoes. Take user id from the url parameter. Then get all shoes for that user.
     */
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        userShoes = [];
        netGain = 0;
        sunkCost = 0;
        totalRevenue = 0;
        userJson = await helpers.getUserInfo(queryint);
        if (userJson) {
            userKeys = await helpers.getUserKeys(queryint);
            await helpers.setUserShoes(userKeys);
            await helpers.setNet(userShoes);
            console.log(userShoes);
            console.log(netGain);
            this.render(req, res, "allShoes",
                {id: queryint, title: "Shoes", username: userJson.username, data: userShoes,
                    net: netGain, sunk: sunkCost, total:totalRevenue, keys: userKeys});
        } else {
            res.status(404)
                .send({
                    message: "No user found with the given id.",
                    status: res.status,
                });
        }
    }
    
}
