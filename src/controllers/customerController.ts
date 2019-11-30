import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { CustomerModel } from "../models/customerModel";
import { BaseRoute } from "../routes/router";

let userJson: any;
let userShoes: any;
let netGain: number = 0;
let sunkCost: number = 0;
let totalRevenue: number = 0;

export class CustomerController extends BaseRoute {

    public static create(router: Router) {
        // sorting all the shoes the user (id) owns from low to high
        router.get("/user/:id/shoes/sort/price_low", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().sortPriceLow(req, res, next);
        });
        // sorting the shoes the user (id) owns from high to low
        router.get("/user/:id/shoes/sort/price_high", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().sortPriceHigh(req, res, next);
        });
        // adds a shoe (id2) to a users (id) portfolio
        router.post("/user/:id/add_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().addShoe(req, res, next);
        });
        // removes a shoe (id2) from a users (id) portfolio
        router.post("/user/:id/remove_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().removeShoe(req, res, next);
        });
        // users home page showing all the shoes the user (id) owns
        router.get("/user/:id/shoes", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().getAll(req, res, next);
        });
        // showing a specific shoe (id2) that the user (id) owns
        router.get("/user/:id/shoes/:id2", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().getOne(req, res, next);
        });

        router.post("/user/:id/edit_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().editShoe(req, res, next);
        });

    }

    public async sortPriceLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            const sortedShoes: any = userShoes;
            sortedShoes.sort((a: any, b: any) => a.current_price - b.current_price);
            this.render(req, res, "allShoes",
                {data: sortedShoes, id: queryint, net: netGain, sunk: sunkCost,
                    title: "Shoes", total: totalRevenue, username: userJson.username});
        } else {
            res.status(404);
            res.send("invalid user");
        }

    }

    public async sortPriceHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            const sortedShoes: any = userShoes;
            sortedShoes.sort((a: any, b: any) => b.current_price - a.current_price);
            this.render(req, res, "allShoes",
                {data: sortedShoes, id: queryint, net: netGain, sunk: sunkCost,
                    title: "Shoes", total: totalRevenue, username: userJson.username});
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
        if (await this.check_local(userId)) {
            const uif = new CustomerModel();
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

    public async editShoe(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const idString = "id2";
        const userID = parseInt(req.params[uString], 10);
        const shoeID = req.params[idString];
        const uIF = new CustomerModel();
        if (!req.body.threshold) {
            req.body.threshold = 0;
        }
        await uIF.edit_shoe(shoeID, req.body.purchase_price);
        res.redirect("/user/" + userID + "/shoes");
    }

    public async removeShoe(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        if (!(await this.check_local(userId))) {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });
        }
        const idString = "id2";
        const docID = req.params[idString];
        const uif = new CustomerModel();
        await uif.remove_shoe(docID);
        res.redirect("/user/" + userId + "/shoes/");
    }

    /**
     * GET all Shoes. Take user id from the url parameter. Then get all shoes for that user.
     */
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.setLocal(queryint)) {
            userShoes.sort((a: any, b: any) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            });
            this.render(req, res, "allShoes",
                {data: userShoes, id: queryint, net: netGain, sunk: sunkCost,
                    title: "Shoes", total: totalRevenue, username: userJson.username});
        } else {
            res.status(404)
                .send({
                    message: "No user found with the given id.",
                    status: res.status,
                });
        }
    }

    public async getOne(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = req.params[shoeIdString];
        if (await this.check_local(userId)) {
            const shoe = Helpers.findUserShoe(shoeId, userShoes);
            if (shoe) {
                const diff = shoe.current_price - shoe.purchase_price;
                this.render(req, res, "oneShoe", {id: userId, diff, purchase: shoe.purchase_price, shoe});
            } else {
                res.status(404)
                    .send({
                        message: "No shoe found with the given id.",
                        status: res.status,
                    });
            }
        } else {
            res.status(404)
                .send({
                    message: "No user found with the given id.",
                    status: res.status,
                });
        }

    }

    private async check_local(userID: number) {
        if (!(userJson && userShoes)) {
            return await this.setLocal(userID);
        } else if (userJson.user_id !== userID) {
            return await this.setLocal(userID);
        }
        return true;
    }

    private async setLocal(userID: any) {
        userShoes = [];
        netGain = 0;
        sunkCost = 0;
        totalRevenue = 0;
        userJson = await Helpers.getUserInfo(userID);
        if (!userJson) {
            return false;
        }
        userShoes = await Helpers.getUserShoes(userID);
        await this.setNet(userShoes);
        return true;
    }

    private setNet(userShoes: any) {
        [netGain, sunkCost, totalRevenue] = Helpers.setNet(userShoes);
    }

}
