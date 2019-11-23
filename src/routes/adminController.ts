import { NextFunction, Request, Response, Router} from "express";
import { ProductModel } from "../models/productModel";
import { NotificationModel } from "../models/notificationModel";
import { CustomerModel } from "../models/customerModel";
import { BaseRoute } from "./router";
import helpers = require("../helperFunctions");

export class AdminController extends BaseRoute {

    public static create(router: Router) {
        router.get('/admin', (req: Request, res: Response, next: NextFunction) => {
            new AdminController().showAllUsers(req, res, next);
        });
    }

    /*
    Shows all users in the db in a list.
     */

    public async showAllUsers(req: Request, res: Response, next: NextFunction) {
        let user_Arr: any[] = [];
         user_Arr = await helpers.getUsers();
        console.log(user_Arr);
        this.render(req, res, "admin", {users: user_Arr, title: "All users"});

    }


}