import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { CustomerModel } from "../models/customerModel";
import { NotificationModel } from "../models/notificationModel";
import { ProductModel } from "../models/productModel";
import { BaseRoute } from "../routes/router";

let leaderboard: any[] = [];
let Shoes: any;
let users: any;
let allUserShoes: any;

export class LeaderboardController extends BaseRoute {

    public static create(router: Router) {
        router.get("/user/:id/leaderboard", (req: Request, res: Response, next: NextFunction) => {
            new LeaderboardController().leaderboard(req, res, next);
        });
    }

    public async leaderboard(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await Helpers.isUser(userId)) {
            await this.createBoard();
            this.render(req, res, "leaderboard", {id: userId, title: "Leaderboard", leaderboard});
        } else {
            res.status(404)
            .send({
                message: "No user with associated ID. Check the entered number.",
                status: res.status,
            });        }
    }

    private async createBoard() {
        leaderboard = [];
        await this.setLocals();
        for (const item in users) {
            if (users.hasOwnProperty(item)) {
                const ranking = users[item];
                // console.log(ranking);
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
                let avgNet: number;
                if (userShoes.length === 0) {
                    avgNet = 0;
                } else {
                    avgNet = net / userShoes.length;
                    ranking["net"] = net;
                    ranking["sunk"] = sunk;
                    ranking["revenue"] = revenue;
                    ranking["avg_net"] = avgNet;
                    ranking["num"] = userShoes.length;
                    leaderboard.push(ranking);
                }
            }
        }
        leaderboard.sort((a: any, b: any) => b.net - a.net);
    }

    private async setLocals() {
        await this.setUsers();
        await this.setShoes();
    }

    private async setUsers() {
        const uif = new CustomerModel();
        users = await uif.get_users();
        allUserShoes = await uif.get_all_keys();
    }

    private async setShoes() {
        const shoeIF = new ProductModel();
        Shoes = await shoeIF.getAllDB();
    }

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
