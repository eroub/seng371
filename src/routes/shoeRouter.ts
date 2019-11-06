import { NextFunction, Request, Response, Router} from "express";
// import Shoes = require("../../dist/data.json");
import DbClient = require("../DbClient");
import { user_model } from "../models/user_model";
import { BaseRoute } from "./router";
import { shoe_model } from "../models/shoe_model";

let user_json:any;
let user_shoes:any;

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
        const user_id = parseInt(req.params[idString], 10);
        this.render(req, res, "notificationCentre", {id: user_id, title: "Shoes"});
    }

    public async addShoe(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const user_id = parseInt(req.params[idString], 10);
        const shoe_if = new shoe_model();
        const all_shoes = await shoe_if.get_all();
        this.render(req, res, "addShoes", {id: user_id, title: "Shoes", data: all_shoes});
    }

    public async sortPriceLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        console.log(user_shoes);
        const sorted_shoes:any = user_shoes;
        console.log(sorted_shoes);
        sorted_shoes.sort((a:any, b:any) => a.current_price - b.current_price);
        if (sorted_shoes.length != 0) {
            console.log(sorted_shoes);
            this.render(req, res, "allShoes", {id: queryint, username:user_json.username, title: "Shoes", data: sorted_shoes});
        }
        else res.send("this user has no shoes");
    }


    public async sortPriceHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        console.log(user_shoes);
        const sorted_shoes:any = user_shoes;
        console.log(sorted_shoes);
        sorted_shoes.sort((a:any, b:any) => b.current_price - a.current_price);
        if (sorted_shoes.length != 0) {
            console.log(sorted_shoes);
            this.render(req, res, "allShoes", {id: queryint, username:user_json.username, title: "Shoes", data: sorted_shoes});
        }
        else res.send("this user has no shoes");
    }



    /**
     * GET all Shoes. Take user id from the url parameter. Then get all shoes for that user.
     */
    public async getAll(req: Request, res: Response, next: NextFunction) {
        console.log("in ther other one")
            const idString = "id";
            const queryint = parseInt(req.params[idString], 10);

            user_json = await this.get_user_info(queryint);
            user_shoes = await this.get_user_shoes(user_json);
            console.log("Here's the user info lol: " + user_json);
            console.log("Here's the shoes lol: " + user_shoes);
            if(user_shoes) {
                this.render(req, res, "allShoes", {id: queryint, title: "Shoes", username: user_json.username, data: user_shoes});
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
            console.log(shoeArray); */


    }

    /**
     * GET one shoe by id
     */


    public async getOne(req: Request, res: Response, next: NextFunction) {
        const shoe_if = new shoe_model();
        const user_id_string = "id";
        const user_id = parseInt(req.params[user_id_string], 10);
        const shoe_id_string = "id2";
        const shoe_id = parseInt(req.params[shoe_id_string], 10);
        const purchase = this.get_purchase_price(user_json.shoelist, shoe_id);
        console.log(purchase);
        console.log(shoe_id, user_id);
        const shoe = await shoe_if.get_one_shoe(shoe_id);
        if (shoe) {
            const diff = shoe.current_price - purchase;
            this.render(req, res, "oneShoe", {id:user_json.user_id, diff:diff, purchase:purchase, shoe:shoe});
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

    private get_purchase_price(user_shoes:any, id:number) {
        let purchase = 0;
        for (const item in user_shoes) {
            if (user_shoes.hasOwnProperty(item)) {
                const shoeid: number = user_shoes[item].shoe_id;
                if (shoeid === id) {
                    purchase = user_shoes[item].purchase_price;
                }
            }
        }
        return purchase;
    }

    private async get_user_info(queryint:number) {
        const user_if = new user_model();
        const user_info = await user_if.get_all(queryint);
        const user_json = JSON.parse(JSON.stringify(user_info[0]));
        return user_json;
    }

    private async get_user_shoes(user_json:any){
        const shoe_if = new shoe_model();
        const user_shoes =  await shoe_if.get_all_shoes(user_json.shoelist);
        return user_shoes;
    }

}
