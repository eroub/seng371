import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { ProductModel } from "../models/productModel";
import { BaseRoute } from "../routes/router";

let allShoes: any;
let id: any;

export class ProductController extends BaseRoute {

    public static create(router: Router) {
        // show all shoes
        router.get("/user/:id/allShoes", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().allShoes(req, res, next);
        });
        // show all shoes sorted from high to low
        router.get("/user/:id/allShoes/sort/current_price_high", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().sortCurrentPriceHighDb(req, res, next);
        });
        // show all shoes sorted from low to high
        router.get("/user/:id/allShoes/sort/current_price_low", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().sortCurrentPriceLowDb(req, res, next);
        });
        router.get("/user/:id/allShoes/sort/retail_price_high", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().sortRetailPriceHighDb(req, res, next);
        });
        // show all shoes sorted from low to high
        router.get("/user/:id/allShoes/sort/retail_price_low", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().sortRetailPriceLowDb(req, res, next);
        });

        router.get("/user/:id/allShoes/sort/diff_high", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().sortDiffPriceHighDb(req, res, next);
        });
        // show all shoes sorted from low to high
        router.get("/user/:id/allShoes/sort/diff_low", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().sortDiffPriceLowDb(req, res, next);
        });

        router.get("/user/:id/allShoes/sort/alpha_desc", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().sortAlphaDesc(req, res, next);
        });

        router.get("/user/:id/allShoes/sort/alpha_asc", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().sortAlphaAsc(req, res, next);
        });

        router.get("/user/:id/allShoes/filter/under_retail", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().underRetail(req, res, next);
        });
        // Add shoe (id2) to user (id) portfolio, redirect to price input
        router.get("/user/:id/add_shoe/:id2", (req: Request, res: Response, next: NextFunction) => {
            new ProductController().inputShoe(req, res, next);
        });
    }

    public async inputShoe(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = parseInt(req.params[shoeIdString], 10);
        const shoe = await Helpers.getShoe(shoeId);
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

    // get all the shoes from the db and render to shoesList view
    public async allShoes(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        id = userId;
        if (await this.setLocal(userId)) {
            allShoes.sort((a: any, b: any) => {
                const aname = a.brand + ' ' + a.model + ' ' + a.colorway;
                const bname = b.brand + ' ' + b.model + ' ' + b.colorway;
                return aname.toLowerCase().localeCompare(bname.toLowerCase());
            });
            this.render(req, res, "shoeList", {id: userId, title: "Shoes", data: allShoes});
        } else {
            res.status(404)
                .send({
                    message: "No user found with the given user id.",
                    status: res.status,
                });
        }
    }

    public async setLocal(userID: any) {
        if (Helpers.isUser(userID)) {
            const shoeIf = new ProductModel();
            allShoes = await shoeIf.getAllDB();
            id = userID;
            return true;
        }
        else return false;

    }

    public async check_local(userID: any) {
        if (!allShoes) {
            return await this.setLocal(userID);
        }
        else if (userID != id) {
            return await this.setLocal(userID);
        }
        return true;
    }

    public async sortCurrentPriceLowDb(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            allShoes.sort((a: any, b: any) => a.current_price - b.current_price);
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async sortAlphaDesc(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            allShoes.sort((a: any, b: any) => {
                const aname = a.brand + ' ' + a.model + ' ' + a.colorway;
                const bname = b.brand + ' ' + b.model + ' ' + b.colorway;
                return bname.toLowerCase().localeCompare(aname.toLowerCase());
            });
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async sortAlphaAsc(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            allShoes.sort((a: any, b: any) => {
                const aname = a.brand + ' ' + a.model + ' ' + a.colorway;
                const bname = b.brand + ' ' + b.model + ' ' + b.colorway;
                return aname.toLowerCase().localeCompare(bname.toLowerCase());
            });
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async sortCurrentPriceHighDb(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            allShoes.sort((a: any, b: any) => b.current_price - a.current_price);
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async sortRetailPriceLowDb(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            allShoes.sort((a: any, b: any) => a.retail_price - b.retail_price);
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async sortRetailPriceHighDb(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            allShoes.sort((a: any, b: any) => b.retail_price - a.retail_price);
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async sortDiffPriceLowDb(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            allShoes.sort((a: any, b: any) => (a.current_price - a.retail_price) - (b.current_price - b.retail_price));
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async sortDiffPriceHighDb(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            allShoes.sort((a: any, b: any) => (b.current_price - b.retail_price) - (a.current_price - a.retail_price));
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: queryint,
                title: "Shoes",
            });
        } else {
            res.status(404);
            res.send("invalid user");
        }
    }

    public async underRetail(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        let underRetail: any = [];
        if(await this.check_local(userId)) {
            for(const item in allShoes) {
                if(allShoes.hasOwnProperty(item)) {
                    if((allShoes[item].current_price - allShoes[item].retail_price) < 0) {
                        underRetail.push(allShoes[item]);
                    }
                }
            }
            allShoes = underRetail;
            this.render(req, res, "shoeList", {
                data: allShoes,
                id: userId,
                title: "Shoes",
            });
        }
        else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

}
