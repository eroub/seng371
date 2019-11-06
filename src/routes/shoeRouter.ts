import { NextFunction, Request, Response, Router} from "express";
import DbClient = require("../DbClient");
import { ShoeModel } from "../models/shoe_model";
import { UserModel } from "../models/user_model";
import { BaseRoute } from "./router";

let userJson: any;
let userShoes: any;

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

        router.get("/user/:id/shoes/sort/price_low", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().sortPriceLow(req, res, next);
        });

        router.get("/user/:id/shoes/sort/price_high", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().sortPriceHigh(req, res, next);
        });

        router.get("/user/:id/add_shoes", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().addShoe(req, res, next);
        });

        router.get("/user/:id/notifications", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().notificationCentre(req, res, next);
        });
    }

    // constructor() {
        // not much here yet
    // }

    public async notificationCentre(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        this.render(req, res, "notificationCentre", {id: userId, title: "Shoes"});
    }

    public async addShoe(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        const shoeIf = new ShoeModel();
        const allShoes = await shoeIf.get_all();
        this.render(req, res, "addSSes", {id: userId, title: "Shoes", data: allShoes});
    }

    public async sortPriceLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        console.log(userShoes);
        const sortedShoes: any = userShoes;
        console.log(sortedShoes);
        sortedShoes.sort((a: any, b: any) => a.current_price - b.current_price);
        // Below used to be != (linting error)
        if (sortedShoes.length !== 0) {
            console.log(sortedShoes);
            this.render(req, res, "allShoes",
              {id: queryint, username: userJson.username, title: "Shoes", data: sortedShoes});
        } else {
            res.send("this user has no shoes");
        }
    }

    public async sortPriceHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        console.log(userShoes);
        const sortedShoes: any = userShoes;
        console.log(sortedShoes);
        sortedShoes.sort((a: any, b: any) => b.current_price - a.current_price);
        // Below used to be != (linting error)
        if (sortedShoes.length !== 0) {
            console.log(sortedShoes);
            this.render(req, res, "allShoes",
              {id: queryint, username: userJson.username, title: "Shoes", data: sortedShoes});
        } else {
            res.send("this user has no shoes");
        }
    }

    /**
     * GET all Shoes. Take user id from the url parameter. Then get all shoes for that user.
     */

    public async getAll(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);

        userJson = await this.getUserInfo(queryint);
        userShoes = await this.getUserShoes(userJson);
        console.log("Here's the user info lol: " + userJson);
        console.log("Here's the shoes lol: " + userShoes);
        if (userShoes) {
            this.render(req, res, "allShoes",
              {id: queryint, title: "Shoes", username: userJson.username, data: userShoes});
        } else {
            res.send("404 not found lol");
        }
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
        console.log(shoeArray); */
    }

    /**
     * GET one shoe by id
     */

    public async getOne(req: Request, res: Response, next: NextFunction) {
        const shoeIf = new ShoeModel();
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = parseInt(req.params[shoeIdString], 10);
        const purchase = this.getPurchasePrice(userJson.shoelist, shoeId);
        console.log(purchase);
        console.log(shoeId, userId);
        const shoe = await shoeIf.getOneShoe(shoeId);
        if (shoe) {
            const diff = shoe.current_price - purchase;
            this.render(req, res, "oneShoe",
              {id: userJson.userId, diff, purchase, shoe});
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

    private getPurchasePrice(userShoes: any, id: number) {
        let purchase = 0;
        for (const item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                const shoeid: number = userShoes[item].shoeId;
                if (shoeid === id) {
                    purchase = userShoes[item].purchase_price;
                }
            }
        }
        return purchase;
    }

    private async getUserInfo(queryint: number) {
        const userIf = new UserModel();
        const userInfo = await userIf.get_all(queryint);
        const uJson = JSON.parse(JSON.stringify(userInfo[0]));
        return uJson;
    }

    private async getUserShoes(userJson: any) {
        const shoeIf = new ShoeModel();
        const uShoes = await shoeIf.getAllShoes(userJson.shoelist);
        return uShoes;
    }

}
