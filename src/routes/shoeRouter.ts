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

        router.get("/user/:id/all_shoes", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().allShoe(req, res, next);
        });

        router.get("/user/:id/notifications", (req: Request, res: Response, next: NextFunction) => {
            new ShoeRouter().notificationCentre(req, res, next);
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

    // constructor() {
        // not much here yet
    // }

    public async notificationCentre(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        this.render(req, res, "notificationCentre", {id: userId, title: "Shoes"});
    }

    public async removeShoe(req:Request, res:Response, next:NextFunction) {
        const user_id_string = "id";
        const user_id = parseInt(req.params[user_id_string], 10);
        const shoe_id_string = "id2";
        const shoe_id = parseInt(req.params[shoe_id_string], 10);
        const uif = new user_model();
        await uif.remove_shoe(user_id,shoe_id);
        res.redirect('/user/' + user_id + '/shoes/');
    }

    public async allShoe(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const user_id = parseInt(req.params[idString], 10);
        const shoe_if = new shoe_model();
        const all_shoes = await shoe_if.get_all();
        this.render(req, res, "shoeList", {id: user_id, title: "Shoes", data: all_shoes});
    }

    public async addShoe(req: Request, res: Response, next: NextFunction) {
        console.log("yeet");
        console.log(req.body.purchase_price);
        const user_id_string = "id";
        const user_id = parseInt(req.params[user_id_string], 10);
        const shoe_id_string = "id2";
        const shoe_id = parseInt(req.params[shoe_id_string], 10);
        if (await this.check_local(user_id)) {
            if (this.has_shoe(user_shoes,shoe_id)) {
                //res.send("boi whatchu trynna do");
                res.redirect('/user/' + user_id + '/all_shoes/');
            }
            else {
                const uif = new user_model();
                let price = req.body.purchase_price;
                if (!price) {
                    price = 0;
                }
                await uif.add_shoe(user_id,shoe_id,price);
                res.redirect('/user/' + user_id + '/shoes/');
            }
        }
        else res.send("invalid user");

    }

    public async inputShoe(req: Request, res: Response, next: NextFunction) {
        const user_id_string = "id";
        const user_id = parseInt(req.params[user_id_string], 10);
        const shoe_id_string = "id2";
        const shoe_id = parseInt(req.params[shoe_id_string], 10);
        const shoe = await this.getShoe(shoe_id);
        if (shoe) {
            this.render(req, res, "addShoe", {id:user_id, shoe:shoe});
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

    public async sortPriceLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            console.log(user_shoes);
            const sorted_shoes:any = user_shoes;
            console.log(sorted_shoes);
            sorted_shoes.sort((a:any, b:any) => a.current_price - b.current_price);
            console.log(sorted_shoes);
            this.render(req, res, "allShoes", {id: queryint, username:user_json.username, title: "Shoes", data: sorted_shoes});
        }
        else res.send("invalid user");

    }

    public async sortPriceHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            console.log(user_shoes);
            const sorted_shoes:any = user_shoes;
            console.log(sorted_shoes);
            sorted_shoes.sort((a:any, b:any) => b.current_price - a.current_price);
            this.render(req, res, "allShoes", {id: queryint, username:user_json.username, title: "Shoes", data: sorted_shoes});
        }
        else res.send("invalid user");

    }

    /**
     * GET all Shoes. Take user id from the url parameter. Then get all shoes for that user.
     */
    public async getAll(req: Request, res: Response, next: NextFunction) {
        console.log("yeetus deletus the fetus is deletus")
            const idString = "id";
            const queryint = parseInt(req.params[idString], 10);

            user_json = await this.get_user_info(queryint);
            console.log(user_json);
            if (user_json) {
                user_shoes = await this.get_user_shoes(user_json);
                console.log("Here's the user info lol: " + user_json);
                console.log("Here's the shoes lol: " + user_shoes);
                this.render(req, res, "allShoes", {id: queryint, title: "Shoes", username: user_json.username, data: user_shoes});
            }
            else res.status(404)
                .send({
                    message: "No user found with the given id.",
                    status: res.status,
                });
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
        const user_id_string = "id";
        const user_id = parseInt(req.params[user_id_string], 10);
        const shoe_id_string = "id2";
        const shoe_id = parseInt(req.params[shoe_id_string], 10);
        if (await this.check_local(user_id)) {
            const purchase = this.get_purchase_price(user_json.shoelist, shoe_id);
            console.log(purchase);
            console.log(shoe_id, user_id);
            const shoe = await this.getShoe(shoe_id);
            if (shoe) {
                const diff = shoe.current_price - purchase;
                this.render(req, res, "oneShoe", {id:user_id, diff:diff, purchase:purchase, shoe:shoe});
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
        else res.send("oof");

    }

    private async check_local(userID:number) {
        if (!(user_json || user_shoes)) {
            user_json = await this.get_user_info(userID);
            if (user_json) {
                user_shoes = await this.get_user_shoes(user_json);
                return true
            }
            else return false;
        }
        else if (user_json.user_id != userID) {
            user_json = await this.get_user_info(userID);
            if (user_json) {
                user_shoes = await this.get_user_shoes(user_json);
                return true
            }
            else return false;
        }
        return true;
    }

    private has_shoe(user_shoes:any, shoeID:number) {
        for (let shoe of user_shoes) {
            console.log(shoe.shoe_id, shoeID);
            if (shoe.shoe_id == shoeID){
                return true;
            }
        }
        return false;
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

    private async get_user_info(queryint:number) {
        const user_if = new user_model();
        const user_info = await user_if.get_all(queryint);
        console.log(user_info);
        if (user_info.length != 0) {
            return JSON.parse(JSON.stringify(user_info[0]));
        }
        else return;
    }

    private async getUserShoes(userJson: any) {
        const shoeIf = new ShoeModel();
        const uShoes = await shoeIf.getAllShoes(userJson.shoelist);
        return uShoes;
    }

    private async getShoe(shoeId: number) {
        const shoe_if = new shoe_model();
        const shoe = await shoe_if.get_one_shoe(shoeId);
        if (shoe) {
            return shoe;
        }
        else return;
    }

}
