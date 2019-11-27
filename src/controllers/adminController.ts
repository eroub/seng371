import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { CustomerModel } from "../models/customerModel";
import { NotificationModel } from "../models/notificationModel";
import { ProductModel } from "../models/productModel";
import { BaseRoute } from "../routes/router";

export class AdminController extends BaseRoute {

    public static create(router: Router) {
        router.get("/admin", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().showAllUsers(req, res, next);
        });


        // edit user
        router.post("/admin/edit_user/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().editUser(req, res, next);
        });


    }

    /*
    Shows all users in the db in a list.
     */

    public async showAllUsers(req: Request, res: Response, next: NextFunction) {
        let userArr: any[] = [];
        userArr = await Helpers.getUsers();
        console.log(userArr);
        this.render(req, res, "admin", {users: userArr, title: "All users"});
    }

    public async editUser(req: Request, res: Response, next: NextFunction) {
        let userArr: any[] = [];
        userArr = await Helpers.getUsers();
        console.log(userArr);
        this.render(req, res, "admin", {users: userArr, title: "All users"});
    }


}
