import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { CustomerModel } from "../models/customerModel";
import { NotificationModel } from "../models/notificationModel";
import { ProductModel } from "../models/productModel";
import { BaseRoute } from "../routes/router";

export class AdminController extends BaseRoute {

    public static create(router: Router) {
        router.get("/admin", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().showAdmin(req, res, next);
        });


        router.get("/admin/users", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().showAllUsers(req, res, next);
        });

        router.get("/admin/shoes", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().showAllShoes(req, res, next);
        });

        // edit user
        router.get("/admin/users/edit_user/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().editUserForm(req, res, next);
        });

        // edit shoe
        router.get("/admin/shoes/edit_shoe/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().editShoeForm(req, res, next);
        });

        router.post("/admin/shoes/edit_shoe/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().editShoe(req, res, next);
        });

        router.post("/admin/users/edit_user/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().editUser(req, res, next);
        });

        router.post("/admin/users/add_user", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().addUser(req, res, next);
        });

        router.post("/admin/shoes/add_shoe", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().addShoe(req, res, next);
        });

        router.post("/admin/users/del_user/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().delUser(req, res, next);
        });

        router.post("/admin/shoes/del_shoe/:id", (req: Request, res: Response, next: NextFunction) => {
            new AdminController().delShoe(req, res, next);
        });


    }

    public async showAdmin(req: Request, res: Response, next: NextFunction) {
        res.status(200);
        this.render(req, res, "admin", { title: "Admin"});
    }

    /*
    Shows all users in the db in a list.
     */

    public async showAllUsers(req: Request, res: Response, next: NextFunction) {
        let userArr: any[] = [];
        userArr = await Helpers.getUsers();
        this.render(req, res, "admin_user", {users: userArr, title: "All users"});
    }

    public async showAllShoes(req: Request, res: Response, next: NextFunction) {
        let shoeArr: any[] = [];
        shoeArr = await Helpers.getAllDbShoes();
        this.render(req, res, "admin_shoes", {shoes: shoeArr, title: "All shoes"});
    }

    public async editUserForm(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(uString,10);
        let CM = new CustomerModel();
        let user = await CM.userInfo(userID);
        user = user[0];
        this.render(req, res, "editUser", {user: user, title: "Edit User"});
    }

    public async editUser(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = uString
        let CM = new CustomerModel();

        let editedName:any = req.body.editedusername;
        await CM.edit_userName(userID, editedName);
        res.redirect('/admin/users');

    }

    public async addUser(req: Request, res: Response, next: NextFunction) {
        let CM = new CustomerModel();
        let editedName:any = req.body.newusername;
        let newID: any = (await Helpers.getMaxUser()) + 1;

        console.log("this is new id",newID);
        await CM.add_user(newID, editedName);
        res.redirect('/admin/users');


    }

    public async delUser(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = uString;
        let CM = new CustomerModel();
        await CM.remove_user(userID);
        res.redirect('/admin/users');


    }

    public async addShoe(req: Request, res: Response, next: NextFunction) {
        let PM = new ProductModel();
        let shoeID, shoeModel, shoeCP, shoeRP, shoeSize, brand, colorway: any;

        shoeModel = req.body.model;
        colorway = req.body.colorway;
        brand = req.body.brand;
        shoeCP = parseInt(req.body.current_price);
        shoeRP = parseInt(req.body.retail_price);
        shoeSize = parseInt(req.body.size);
        shoeID = (await Helpers.getMaxShoe()) + 1;


        await PM.add_shoe(shoeModel, shoeID, shoeSize, shoeCP, shoeRP, brand, colorway);
        res.redirect('/admin/shoes');


    }

    public async editShoeForm(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const shoeID = req.params[uString];
        let PM = new ProductModel();
        console.log("this id",shoeID)
        let shoe = await PM.getOneShoe(shoeID);
        console.log("this shoe",shoe);
        this.render(req, res, "editShoe", {shoe: shoe, title: "Edit shoe"});
    }

    public async editShoe(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const shoeID = req.params[uString];
        let PM = new ProductModel();

        let shoeModel, shoeCP, shoeRP, shoeSize,brand,colorway: any;

        shoeModel = req.body.model;
        colorway = req.body.colorway;
        brand = req.body.brand;
        shoeCP = parseInt(req.body.current_price,10);
        shoeRP = parseInt(req.body.retail_price,10);
        shoeSize = parseInt(req.body.size);
        await PM.edit_shoe(shoeModel, shoeID, shoeSize, shoeCP, shoeRP, brand, colorway);

        res.redirect('/admin/shoes');

    }

    public async delShoe(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const shoeID = req.params[uString];
        let PM = new ProductModel();
        await PM.remove_shoe(shoeID);
        res.redirect('/admin/shoes');


    }

}
