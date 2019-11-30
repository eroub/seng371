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


        router.post("/admin/edit_user/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().editUser(req, res, next);
        });

        router.post("/admin/add_user", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().addUser(req, res, next);
        });

    }

    /*
    Shows all users in the db in a list.
     */

    public async showAllUsers(req: Request, res: Response, next: NextFunction) {
        let userArr: any[] = [];
        userArr = await Helpers.getUsers();
        console.log(userArr)
        this.render(req, res, "admin", {users: userArr, title: "All users"});
    }

    public async editUserForm(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(req.params[uString], 10);
        let CM = new CustomerModel();
        let user = await CM.userInfo(userID);
        user = user[0];
        this.render(req, res, "editUser", {user: user, title: "Edit User"});
    }


    public async editUser(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(req.params[uString], 10);
        let CM = new CustomerModel();

        let editedName:any = req.body.editedusername;
        console.log(editedName + userID)
        await CM.edit_userName(userID, editedName);
        res.redirect('/admin');

    }

    public async addUser(req: Request, res: Response, next: NextFunction) {
        let CM = new CustomerModel();
        let editedName:any = req.body.newusername;
        let newID:any = req.body.newuserid;
        await CM.add_user(newID,editedName);
        res.redirect('/admin');


    }


}
