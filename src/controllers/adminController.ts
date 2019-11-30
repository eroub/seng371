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

        router.post("/admin/del_user/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().delUser(req, res, next);
        });

        router.post("/admin/add_shoe", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().addShoe(req, res, next);
        });

    }

    /*
    Shows all users in the db in a list.
     */

    public async showAllUsers(req: Request, res: Response, next: NextFunction) {
        let userArr: any[] = [];
        userArr = await Helpers.getUsers();
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
        newID = parseInt(newID, 10);
        console.log("this is new id",newID);
        await CM.add_user(newID,editedName);
        res.redirect('/admin');


    }

    public async delUser(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(req.params[uString], 10);
        let CM = new CustomerModel();
        await CM.remove_user(userID);
        res.redirect('/admin');


    }


    public async addShoe(req: Request, res: Response, next: NextFunction) {
        let CM = new CustomerModel();
        let shoeName, shoeCP, shoeRP,shoeid, shoeSize,brand,colorway: any;

        shoeName = req.body.name;
        colorway = req.body.colorway;
        brand = req.body.brand;
        shoeCP = req.body.current_price;
        shoeRP = req.body.retail_price;
        shoeSize = parseInt(req.body.size);
        shoeid = parseInt(req.body.id);
        let pm:any = new ProductModel();
        await pm.add_shoe(shoeName,shoeid, shoeSize, shoeCP, shoeRP,brand,colorway);
        res.redirect('/admin');


    }





}
