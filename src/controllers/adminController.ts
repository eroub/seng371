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
        router.get("/admin/edit_user/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().editUserForm(req, res, next);
        });

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

    public async editUserForm(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(req.params[uString], 10);
        console.log(userID)
        let CM = new CustomerModel();
        let user = await CM.userInfo(userID);
        user = user[0];
        this.render(req, res, "editUser", {user: user, title: "Edit User"});
    }


    public async editUser(req: Request, res: Response, next: NextFunction) {



        res.redirect('/admin');
    }



}
