import { NextFunction, Request, Response, Router} from "express";
import { BaseRoute } from "../routes/router";
import { CustomerModel } from "../models/customerModel";
import { ProductModel } from "../models/productModel";
import { NotificationModel } from "../models/notificationModel";
import helpers = require("../helperFunctions");

export class AdminController extends BaseRoute {

    public static create(router: Router) {
        router.get("/admin", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().showAllUsers(req, res, next);
        });
    }

    /*
    Shows all users in the db in a list.
     */

    public async showAllUsers(req: Request, res: Response, next: NextFunction) {
        let userArr: any[] = [];
        userArr = await helpers.getUsers();
        console.log(userArr);
        this.render(req, res, "admin", {users: userArr, title: "All users"});
    }

}
