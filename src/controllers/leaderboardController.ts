import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { BaseRoute } from "../routes/router";

let leaderboard: any[] = [];
let Shoes: any;
let users: any;
let allUserShoes: any;
let id: any;

export class LeaderboardController extends BaseRoute {

    /**
     * Creates LeaderboardController routes.
     *
     * @class LeaderboardController extends BaseRoute
     * @method create
     * @param router {Router} The router object.
     * @return void
     */

    public static create(router: Router) {
        router.get("/user/:id/leaderboard", (req: Request, res: Response, next: NextFunction) => {
            new LeaderboardController().leaderboard(req, res, next);
        });

        router.get("/user/:id/leaderboard/avgNetHigh", (req: Request, res: Response, next: NextFunction) => {
            new LeaderboardController().avgNetHigh(req, res, next);
        });

        router.get("/user/:id/leaderboard/avgNetLow", (req: Request, res: Response, next: NextFunction) => {
            new LeaderboardController().avgNetLow(req, res, next);
        });

        router.get("/user/:id/leaderboard/netHigh", (req: Request, res: Response, next: NextFunction) => {
            new LeaderboardController().netHigh(req, res, next);
        });

        router.get("/user/:id/leaderboard/netLow", (req: Request, res: Response, next: NextFunction) => {
            new LeaderboardController().netLow(req, res, next);
        });

    }

    /**
     * Renders the leaderboard view when user navigates to /user/<user_id>/leaderboard.
     *
     * @class leaderboard extends BaseRoute
     * @method leaderboard
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async leaderboard(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.createBoard(userId)) {
            this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        } else {
            res.status(404)
            .send({
                message: "No user with associated ID. Check the entered number.",
                status: res.status,
            });        }
    }

    /**
     * Renders the leaderboard view in sorted order when user navigates to /user/<user_id>/leaderboard/avgNetHigh.
     *
     * @class leaderboard extends BaseRoute
     * @method avgNetHigh
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async avgNetHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.check_local(userId)) {
                leaderboard.sort((a: any, b: any) => b.avg_net - a.avg_net);
                this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        } else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    /**
     * Renders the leaderboard view in sorted order when user navigates to /user/<user_id>/leaderboard/avgNetLow.
     *
     * @class leaderboard extends BaseRoute
     * @method avgNetLow
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async avgNetLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.check_local(userId)) {
            leaderboard.sort((a: any, b: any) => a.avg_net - b.avg_net);
            this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        } else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    /**
     * Renders the leaderboard view in sorted order when user navigates to /user/<user_id>/leaderboard/netLow.
     *
     * @class leaderboard extends BaseRoute
     * @method netLow
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async netLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.check_local(userId)) {
            leaderboard.sort((a: any, b: any) => a.net - b.net);
            this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        } else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    /**
     * Renders the leaderboard view in sorted order when user navigates to /user/<user_id>/leaderboard/netHigh.
     *
     * @class leaderboard extends BaseRoute
     * @method netHigh
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async netHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.check_local(userId)) {
            leaderboard.sort((a: any, b: any) => b.net - a.net);
            this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        } else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    /**
     * Checks if the leaderboard array has already been set otherwise it will call createBoard to query the db
     * @class LeaderboardController extends BaseRoute
     * @method check_local
     * @param userID The ID number of the user currently viewing the leaderboard.
     * @return void
     */

    private async check_local(userID: any) {
        if (leaderboard.length === 0) {
            return await this.createBoard(userID);
        } else if (userID !== id) {
            return await this.createBoard(userID);
        }
        return true;
    }

    /**
     *  query the db to get the ranking data
     * @class LeaderboardController extends BaseRoute
     * @method createBoard
     * @param userID The ID number of the user currently viewing the leaderboard.
     * @return void
     */
    private async createBoard(userID: any) {
        leaderboard = [];
        if (await Helpers.isUser(userID)) {
            id = userID;
            await this.setLocals();
            for (const item in users) {
                if (users.hasOwnProperty(item)) {
                    const ranking = users[item];
                    const userShoes: any = this.getUserShoes(users[item].user_id);
                    this.buildRanking(userShoes, ranking);
                }
            }
            leaderboard.sort((a: any, b: any) => b.net - a.net);
            return true;
        } else {
            return false;
        }
    }

    /**
     *  sets the data for a users ranking (net, sunk,revenue,avg_net,num) for leaderboard
     * @class LeaderboardController extends BaseRoute
     * @method buildRanking
     * @param userShoes an array of the users shoe objects.
     * @param An object that holds the properties important for ranking (net, sunk,revenue,avg_net,num) .
     * @return void
     */

    private buildRanking(userShoes: any, ranking: any) {
        let net: number;
        let sunk: number;
        let revenue: number;
        [net, sunk, revenue] = Helpers.setNet(userShoes);
        let avgNet: number;
        if (userShoes.length === 0) {
            avgNet = 0;
        } else {
            avgNet = net / userShoes.length;
        }
        ranking["net"] = net;
        ranking["sunk"] = sunk;
        ranking["revenue"] = revenue;
        ranking["avg_net"] = avgNet;
        ranking["num"] = userShoes.length;
        leaderboard.push(ranking);
    }

    /**
     *  sets the data for users,shoes and allUserShoes variables by querying helpers class
     * @class LeaderboardController extends BaseRoute
     * @method setLocals
     * @return void
     */
    private async setLocals() {
        users = await Helpers.getUsers();
        Shoes = await Helpers.getAllDbShoes();
        allUserShoes = await Helpers.getAllUserShoes();
    }

    /**
     * @class LeaderboardController extends BaseRoute
     * @method getShoe
     * @return shoe object
     */

    private getShoe(shoeID: number) {
        for (const item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                const shoe = Shoes[item];
                if (shoe.shoe_id === shoeID) {
                    return shoe;
                }
            }
        }
    }

    /**
     * gets all the shoes for a user
     * @class LeaderboardController extends BaseRoute
     * @method getUserShoes
     * @return array of shoe objects
     */

    private getUserShoes(userID: any) {
        const userShoes: any[] = [];
        for (const item in allUserShoes) {
            if (allUserShoes.hasOwnProperty(item)) {
                if (allUserShoes[item].user_id === userID) {
                    const shoe = allUserShoes[item];
                    const shoeInfo = this.getShoe(allUserShoes[item].shoe_id);
                    shoe["current_price"] = shoeInfo.current_price;
                    userShoes.push(shoe);
                }
            }
        }
        return userShoes;
    }

}
