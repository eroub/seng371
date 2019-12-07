import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { CustomerModel } from "../models/customerModel";
import { BaseRoute } from "../routes/router";

let userJson: any;
let userShoes: any;
let netGain: number = 0;
let sunkCost: number = 0;
let totalRevenue: number = 0;
let numShoes: number = 0;

export class CustomerController extends BaseRoute {

    /**
     * Creates customer routes.
     *
     * @class CustomerController extends BaseRoute
     * @method create
     * @param router {Router} The router object.
     * @return void
     */
    public static create(router: Router) {
        // sorting all the shoes the user (id) owns from low to high
        router.get("/user/:id/shoes/sort/current_price_low", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().sortCurrentPriceLow(req, res, next);
        });
        // sorting the shoes the user (id) owns from high to low
        router.get("/user/:id/shoes/sort/current_price_high", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().sortCurrentPriceHigh(req, res, next);
        });
        router.get("/user/:id/shoes/sort/purchase_price_low", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().sortPurchasePriceLow(req, res, next);
        });
        // sorting the shoes the user (id) owns from high to low
        router.get("/user/:id/shoes/sort/purchase_price_high", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().sortPurchasePriceHigh(req, res, next);
        });
        router.get("/user/:id/settings", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().settings(req, res, next);
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

        router.post("/user/:id/edit_username", (req: Request, res: Response, next: NextFunction) => {
            new CustomerController().editUsername(req, res, next);
        });

    }

    /**
     * Renders the settings view for a specific user when they navigate to /user/<user_id>/settings.
     *
     * @class CustomerController extends BaseRoute
     * @method settings
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async settings(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            this.render(req, res, "settings",
                {id: queryint,
                    title: "Settings", username: userJson.username});
        } else {
            res.status(404);
            res.send("invalid user");
        }

    }

    /**
     * Handles the POST request sent from the settings view to edit a user's username.
     *
     * @class CustomerController extends BaseRoute
     * @method editUsername
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async editUsername(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(req.params[uString], 10);
        const uIF = new CustomerModel();
        if (!req.body.uname && this.check_local(userID)) {
            req.body.uname = userJson.username;
        }
        await uIF.edit_userName(userID, req.body.uname);
        res.redirect("/user/" + userID + "/shoes");
    }

    /**
     * Renders the allShoes view for a specific user with shoes sorted by the lowest current price to the highest current price.
     *
     * @class CustomerController extends BaseRoute
     * @method sortCurrentPriceLow
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async sortCurrentPriceLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            const sortedShoes: any = userShoes;
            sortedShoes.sort((a: any, b: any) => a.current_price - b.current_price);
            this.render(req, res, "allShoes",
                {data: sortedShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
                    title: "Shoes", total: totalRevenue, username: userJson.username});
        } else {
            res.status(404);
            res.send("invalid user");
        }

    }

    /**
     * Renders the allShoes view for a specific user with shoes sorted by the highest current price to the lowest current price.
     *
     * @class CustomerController extends BaseRoute
     * @method sortCurrentPriceHigh
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async sortCurrentPriceHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            const sortedShoes: any = userShoes;
            sortedShoes.sort((a: any, b: any) => b.current_price - a.current_price);
            this.render(req, res, "allShoes",
                {data: sortedShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
                    title: "Shoes", total: totalRevenue, username: userJson.username});
        } else {
            res.status(404);
            res.send("invalid user");
        }

    }

    /**
     * Renders the allShoes view for a specific user with shoes sorted by the lowest purchase price to the highest purchase price.
     *
     * @class CustomerController extends BaseRoute
     * @method sortPurchasePriceLow
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async sortPurchasePriceLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            const sortedShoes: any = userShoes;
            sortedShoes.sort((a: any, b: any) => a.purchase_price - b.purchase_price);
            this.render(req, res, "allShoes",
                {data: sortedShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
                    title: "Shoes", total: totalRevenue, username: userJson.username});
        } else {
            res.status(404);
            res.send("invalid user");
        }

    }

    /**
     * Renders the allShoes view for a specific user with shoes sorted by the highest purchase price to the lowest purchase price.
     *
     * @class CustomerController extends BaseRoute
     * @method sortPurchasePriceHigh
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async sortPurchasePriceHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.check_local(queryint)) {
            const sortedShoes: any = userShoes;
            sortedShoes.sort((a: any, b: any) => b.purchase_price - a.purchase_price);
            this.render(req, res, "allShoes",
                {data: sortedShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
                    title: "Shoes", total: totalRevenue, username: userJson.username});
        } else {
            res.status(404);
            res.send("invalid user");
        }

    }

    /**
     * Handles the POST request sent by the addShoe view to add a shoe to a specific user's portfolio.
     *
     * @class CustomerController extends BaseRoute
     * @method addShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async addShoe(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = parseInt(req.params[shoeIdString], 10);
        if (await this.check_local(userId)) {
            const uif = new CustomerModel();
            let price = parseInt(req.body.purchase_price, 10);
            if (!price) {
                price = 0;
            }
            await uif.add_shoe(userId, shoeId, price);
            res.redirect("/user/" + userId + "/shoes/");
        } else {
            Helpers.ID404(res);
        }
    }

    /**
     * Handles the POST request sent by the oneShoe view to edit a shoe in a specific user's portfolio.
     *
     * @class CustomerController extends BaseRoute
     * @method editShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async editShoe(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const idString = "id2";
        const userID = parseInt(req.params[uString], 10);
        const shoeID = req.params[idString];
        const uIF = new CustomerModel();
        if (!req.body.threshold) {
            req.body.threshold = 0;
        }
        await uIF.edit_shoe(shoeID, parseInt(req.body.purchase_price, 10));
        res.redirect("/user/" + userID + "/shoes");
    }

    /**
     * Handles the POST request sent by the allShoes view to remove a shoe in a specific user's portfolio.
     *
     * @class CustomerController extends BaseRoute
     * @method removeShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async removeShoe(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        if (!(await this.check_local(userId))) {
            Helpers.ID404(res);
        }
        const idString = "id2";
        const docID = req.params[idString];
        const uif = new CustomerModel();
        await uif.remove_shoe(docID);
        res.redirect("/user/" + userId + "/shoes/");
    }

    /**
     * Renders the allShoes view (with shoes sorted alphabetically ascending) when a user navigates to /user/<user_id>/shoes.
     *
     * @class CustomerController extends BaseRoute
     * @method getAll
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async getAll(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const queryint = parseInt(req.params[idString], 10);
        if (await this.setLocal(queryint)) {
            userShoes.sort((a: any, b: any) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
            this.render(req, res, "allShoes",
                {data: userShoes, id: queryint, net: netGain, num: numShoes, sunk: sunkCost,
                    title: "Shoes", total: totalRevenue, username: userJson.username});
        } else {
            Helpers.ID404(res);
        }
    }

    /**
     * Renders the oneShoe view when a user navigates to /user/<user_id>/shoes/<shoe_id>.
     *
     * @class CustomerController extends BaseRoute
     * @method getAll
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
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
                Helpers.shoe404(res);
            }
        } else {
            Helpers.ID404(res);
        }

    }

    /**
     * Checks if local variables are set for sorting functions, and whether or not the local variables are correct for the current user.
     *
     * @class CustomerController extends BaseRoute
     * @method check_local
     * @param userID {Number} The id of the current user.
     * @return true
     */
    private async check_local(userID: number) {
        if (!(userJson && userShoes)) {
            return await this.setLocal(userID);
        } else if (userJson.user_id !== userID) {
            return await this.setLocal(userID);
        }
        return true;
    }

    /**
     * Sets local variables for a specific user.
     *
     * @class CustomerController extends BaseRoute
     * @method setLocal
     * @param userID {Any} The id of the user.
     * @return true if the local variables were set, false if the user does not exist and the local variables could not be set.
     */
    private async setLocal(userID: any) {
        userShoes = [];
        netGain = 0;
        sunkCost = 0;
        totalRevenue = 0;
        numShoes = 0;
        userJson = await Helpers.getUserInfo(userID);
        if (!userJson) {
            return false;
        }
        userShoes = await Helpers.getUserShoes(userID);
        await this.setNet(userShoes);
        return true;
    }

    /**
     * Sets local variables for net gain/loss, etc. for a users shoe list.
     *
     * @class CustomerController extends BaseRoute
     * @method setNet
     * @param userShoes {Any} A list of user shoe JSON objects.
     * @return true
     */
    private setNet(userShoes: any) {
        [netGain, sunkCost, totalRevenue, numShoes] = Helpers.setNet(userShoes);
    }

}
