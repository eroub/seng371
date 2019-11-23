import { NextFunction, Request, Response, Router} from "express";
import DbClient = require("../DbClient");
import { ShoeModel } from "../models/shoe_model";
import { UserModel } from "../models/user_model";
import { BaseRoute } from "./router";

let userJson: any;
let userKeys: any;
let userShoes: any[] = [];
let netGain: number = 0;
let sunkCost: number = 0;
let totalRevenue: number = 0;
let Shoes: any;

export class ShoeRouter extends BaseRoute {

    public static create(router: Router) {
        // users home page showing all the shoes the user owns
        router.get("/user/:id/shoes", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().getAll(req, res, next);
        });
        // showing a specific shoe that the user owns
        router.get("/user/:id/shoes/:id2", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().getOne(req, res, next);
        });
        // sorting all the shoes the user owns from low to high
        router.get("/user/:id/shoes/sort/price_low", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().sortPriceLow(req, res, next);
        });
        // sorting the shoes the user owns from high to low
        router.get("/user/:id/shoes/sort/price_high", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().sortPriceHigh(req, res, next);
        });



        router.get("/user/:id/add_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().inputShoe(req, res, next);
        });

        router.post("/user/:id/add_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().addShoe(req, res, next);
        });

        router.post("/user/:id/remove_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().removeShoe(req, res, next);
        });
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
        const uif = new UserModel();
        await uif.remove_shoe(docID);
        res.redirect("/user/" + userId + "/shoes/");
    }




    public async addShoe(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = parseInt(req.params[shoeIdString], 10);
        if (await this.check_local(userId)) {
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

    public async inputShoe(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = parseInt(req.params[shoeIdString], 10);
        const shoe = await this.getShoe(shoeId);
        if (shoe) {
            this.render(req, res, "addShoe", {id: userId, shoe});

        } else {
            res.status(404)
                .send({
                    message: "No shoe found with the given id.",
                    status: res.status,
                });
        }

    }

    public async sortPriceLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
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
        if (await this.check_local(queryint)) {
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
        userJson = await this.getUserInfo(queryint);
        if (userJson) {
            userKeys = await this.getUserKeys(queryint);
            await this.setUserShoes(userKeys);
            await this.setNet(userShoes);
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

    /**
     * GET one shoe by id
     */

    public async getOne(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = req.params[shoeIdString];
        if (await this.check_local(userId)) {
            const shoe = this.findShoe(shoeId);
            if (shoe) {
                const diff = shoe.current_price - shoe.purchase_price;
                this.render(req, res, "oneShoe", {id: userId, diff, purchase:shoe.purchase_price, shoe});
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

    private getShoeInfo(shoeID:number) {
        for (const item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                const shoe = Shoes[item];
                if (shoe.shoe_id === shoeID) return shoe;
            }
        }
    }

    private findShoe(shoeID: any) {
        console.log(shoeID);
        for (const item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                const shoe = userShoes[item];
                if (shoe._id == shoeID) return shoe;
            }
        }
    }

    private async check_local(userID: number) {
        if (!(userJson && userShoes)) {
            userJson = await this.getUserInfo(userID);
            if (!userJson) {
                return false;
            }
            console.log("setting shoes");
            userKeys = await this.getUserKeys(userID);
            await this.setUserShoes(userKeys);
            await this.setNet(userShoes);
            return true;
        }
        else if (userJson.user_id != userID) {
            userJson = await this.getUserInfo(userID);
            if (!userJson) {
                return false;
            }
            userShoes = [];
            netGain = 0;
            sunkCost = 0;
            totalRevenue = 0;
            userKeys = await this.getUserKeys(userID);
            await this.setUserShoes(userKeys);
            await this.setNet(userShoes);
            return true;
        }

        return true;
    }

    private async setUserShoes(userKeys: any) {
        Shoes = await this.getAllDbShoes();
        for (const item in userKeys) {
            if (userKeys.hasOwnProperty(item)) {
                const key = userKeys[item];
                const shoe = this.getShoeInfo(key.shoe_id);
                key["name"] = shoe.brand + ' ' + shoe.model + ' ' + shoe.colorway;
                key["size"] = shoe.size;
                key["current_price"] = shoe.current_price;
                key["retail_price"] = shoe.retail_price;
                userShoes.push(key);
            }
        }
    }

    private async getUserKeys(userID: any) {
        const user_if = new UserModel();
        const userKeys:any = await user_if.get_keys(userID);
        console.log(userKeys);
        return userKeys;
    }

    private has_shoe(userShoes: any, shoeID: number) {
        for (const item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                const shoeid: number = userShoes[item].shoe_id;
                if (shoeid === shoeID) {
                   return true;
                }
            }
        }
        return false;
    }

    private getPurchasePrice(id: number) {
        let purchase = 0;
        for (const item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                const shoeid: number = userKeys[item].shoe_id;
                if (shoeid === id) {
                    purchase = userKeys[item].purchase_price;
                }
            }
        }
        return purchase;
    }

    private async getUserInfo(queryint: number) {
        const userIf = new UserModel();
        let userInfo = null;
        try {
            userInfo = await userIf.userInfo(queryint);
        } catch {
            return false;
        }
        if (userInfo.length !== 0) {
            return userInfo[0];
        } else {
            return false;
        }
    }

    private async getUserShoes(userKeys: any) {
        const shoeIf = new ShoeModel();
        const uShoes = await shoeIf.getAllShoes(userKeys);
        return uShoes;
    }

    private async getShoe(shoeId: number) {
        const shoeIf = new ShoeModel();
        const shoe = await shoeIf.getOneShoe(shoeId);
        if (shoe) {
            return shoe;
        } else {
            return;
        }
    }

    private async setNet(shoelist: any) {
        for (const item in shoelist) {
            if (shoelist.hasOwnProperty(item)) {
                const shoe = shoelist[item];
                netGain = netGain + shoe.current_price - shoe.purchase_price;
                sunkCost = sunkCost + parseInt(shoe.purchase_price);
                totalRevenue = totalRevenue + shoe.current_price;
            }
        }
    }

    /* returns every shoe in db */
    private async getAllDbShoes() {
        let allShoes = null;
        const shoeIf = new ShoeModel();
        try {
            allShoes = await shoeIf.getAllDB();
        } catch {
            return false;
        }
        if (allShoes) {
            return allShoes;
        }
        return;
    }

}
