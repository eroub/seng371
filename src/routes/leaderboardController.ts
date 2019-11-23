import { NextFunction, Request, Response, Router} from "express";
import { ShoeModel } from "../models/shoe_model";
import { NotificationModel } from "../models/notification_model";
import { UserModel } from "../models/user_model";
import { BaseRoute } from "./router";

let leaderboard: any[] = [];
let Shoes: any;
let users: any;
let allUserShoes: any;
let id:any;

export class LeaderboardController extends BaseRoute {

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

    public async avgNetHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.check_local(userId)) {
                leaderboard.sort((a: any, b: any) => b.avg_net - a.avg_net);
                this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        }
        else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    public async avgNetLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.check_local(userId)) {
            leaderboard.sort((a: any, b: any) => a.avg_net - b.avg_net);
            this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        }
        else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    public async netLow(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.check_local(userId)) {
            leaderboard.sort((a: any, b: any) => a.net - b.net);
            this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        }
        else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    public async netHigh(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.check_local(userId)) {
            leaderboard.sort((a: any, b: any) => b.net - a.net);
            this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        }
        else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    private async check_local(userID: any) {
        if (leaderboard.length == 0) {
            return await this.createBoard(userID);
        }
        else if (userID != id) {
            return await this.createBoard(userID);
        }
        return true;
    }

    private async createBoard(userID: any) {
        leaderboard = [];
        if (await this.isUser(userID)) {
            id = userID;
            await this.setLocals();
            for (const item in users) {
                if (users.hasOwnProperty(item)) {
                    const ranking = users[item];
                    //console.log(ranking);
                    const userShoes: any = this.getUserShoes(users[item].user_id);
                    console.log(userShoes);
                    let net: number = 0;
                    let sunk: number = 0;
                    let revenue: number = 0;
                    for (const shoe in userShoes) {
                        if (userShoes.hasOwnProperty(shoe)) {
                            net = net + userShoes[shoe].current_price - userShoes[shoe].purchase_price;
                            sunk = sunk + userShoes[shoe].purchase_price;
                            revenue = revenue + userShoes[shoe].current_price;
                        }
                    }
                    let avg_net: number;
                    if (userShoes.length === 0) {
                        avg_net = 0;
                    }
                    else avg_net = net/userShoes.length;
                    ranking["net"] = net;
                    ranking["sunk"] = sunk;
                    ranking["revenue"] = revenue;
                    ranking["avg_net"] = avg_net;
                    ranking["num"] = userShoes.length;
                    leaderboard.push(ranking);
                }
            }
            leaderboard.sort((a: any, b: any) => b.net - a.net);
            return true;
        }
        else return false;
    }

    private async setLocals() {
        await this.setUsers();
        await this.setShoes();
    }

    private async setUsers() {
        const uif = new UserModel();
        users = await uif.get_users();
        allUserShoes = await uif.get_all_keys();
    }

    private async setShoes() {
        const shoeIF = new ShoeModel();
        Shoes = await shoeIF.getAllDB();
    }

    private getShoe(shoeID:number) {
        for (const item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                const shoe = Shoes[item];
                if (shoe.shoe_id === shoeID) return shoe;
            }
        }
    }

    private getUserShoes(userID: any) {
        let userShoes: any[] = [];
        for (const item in allUserShoes) {
            if (allUserShoes.hasOwnProperty(item)) {
                if (allUserShoes[item].user_id === userID) {
                    const shoe = allUserShoes[item];
                    const shoe_info = this.getShoe(allUserShoes[item].shoe_id);
                    shoe["current_price"] = shoe_info.current_price;
                    userShoes.push(shoe);
                }
            }
        }
        return userShoes;
    }

    private async isUser(userID: any) {
        const userIF = new UserModel();
        return await userIF.isUser(userID);
    }
}
