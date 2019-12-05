import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { CustomerModel } from "../models/customerModel";
import { NotificationModel } from "../models/notificationModel";
import { ProductModel } from "../models/productModel";
import { BaseRoute } from "../routes/router";

export class AdminController extends BaseRoute {

    /**
     * Creates admin routes.
     *
     * @class AdminController extends BaseRoute
     * @method create
     * @param router {Router} The router object.
     * @return void
     */
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

    /**
     * Renders the admin view when user navigates to /admin.
     *
     * @class AdminController extends BaseRoute
     * @method showAdmin
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async showAdmin(req: Request, res: Response, next: NextFunction) {
        res.status(200);
        this.render(req, res, "admin", { title: "Admin"});
    }

    /**
     * Renders the admin_user view when user navigates to /admin/users.
     *
     * @class AdminController extends BaseRoute
     * @method showAllUsers
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async showAllUsers(req: Request, res: Response, next: NextFunction) {
        let userArr: any[] = [];
        userArr = await Helpers.getUsers();
        this.render(req, res, "admin_user", {users: userArr, title: "All users"});
    }

    /**
     * Renders the admin_shoes view when user navigates to /admin/shoes.
     *
     * @class AdminController extends BaseRoute
     * @method showAllShoes
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async showAllShoes(req: Request, res: Response, next: NextFunction) {
        let shoeArr: any[] = [];
        shoeArr = await Helpers.getAllDbShoes();
        this.render(req, res, "admin_shoes", {shoes: shoeArr, title: "All shoes"});
    }

    /**
     * Renders the editUser view for a specific user when an admin navigates to /admin/users/edit_user/<user_id>.
     *
     * @class AdminController extends BaseRoute
     * @method editUserForm
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async editUserForm(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(req.params[uString]);
        const CM = new CustomerModel();
        let user = await CM.userInfo(userID);
        user = user[0];
        this.render(req, res, "editUser", {user, title: "Edit User"});
    }

    /**
     * Handles the POST request sent by the editUser view to edit a user.
     *
     * @class AdminController extends BaseRoute
     * @method editUser
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async editUser(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(req.params[uString]);
        const CM = new CustomerModel();
        let editedName: any = req.body.newusername;
        if(!editedName) {
            editedName = "USER";
        }
        await CM.edit_userName(userID, editedName);
        res.redirect("/admin/users");
    }

    /**
     * Handles the POST request sent from the admin_users view to add a user.
     *
     * @class AdminController extends BaseRoute
     * @method addUser
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async addUser(req: Request, res: Response, next: NextFunction) {
        const CM = new CustomerModel();
        let editedName: any = req.body.newusername;
        if(!editedName) {
            editedName = "USER";
        }
        const newID: any = (await Helpers.getMaxUser()) + 1;
        await CM.add_user(newID, editedName);
        res.redirect("/admin/users");
    }

    /**
     * Handles the POST request sent from the admin_users view to delete a user.
     *
     * @class AdminController extends BaseRoute
     * @method delUser
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async delUser(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const userID = parseInt(req.params[uString]);
        const CM = new CustomerModel();
        await CM.remove_user(userID);
        res.redirect("/admin/users");
    }

    /**
     * Handles the POST request sent from the admin_shoes view to add a shoe.
     *
     * @class AdminController extends BaseRoute
     * @method addShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async addShoe(req: Request, res: Response, next: NextFunction) {
        const PM = new ProductModel();

        let shoeModel: any;
        let colorway: any;
        let brand: any;
        let shoeCP: number;
        let shoeRP: number;
        let shoeSize: number;
        let shoeID = (await Helpers.getMaxShoe()) + 1;

        if(!req.body.model) {
            shoeModel = "MODEL";
            colorway = "COLORWAY";
            brand = "BRAND";
            shoeCP = 0;
            shoeRP = 0;
            shoeSize = 0;
            shoeID = (await Helpers.getMaxShoe()) + 1;
        }
        else {
            shoeModel = req.body.model;
            colorway = req.body.colorway;
            brand = req.body.brand;
            shoeCP = parseInt(req.body.current_price, 10);
            shoeRP = parseInt(req.body.retail_price, 10);
            shoeSize = parseInt(req.body.size, 10);
        }


        await PM.add_shoe(shoeModel, shoeID, shoeSize, shoeCP, shoeRP, brand, colorway);
        res.redirect("/admin/shoes");
    }

    /**
     * Renders the editShoe view for a specific shoe when an admin navigates to /admin/shoes/edit_shoe/<shoe_id>.
     *
     * @class AdminController extends BaseRoute
     * @method editShoeForm
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async editShoeForm(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const shoeID = req.params[uString];
        const PM = new ProductModel();
        const shoe = await PM.getOneShoe(shoeID);
        this.render(req, res, "editShoe", {shoe, title: "Edit shoe"});
    }

    /**
     * Handles the POST request sent from the editShoe view to edit a shoe.
     *
     * @class AdminController extends BaseRoute
     * @method editShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async editShoe(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const shoeID = parseInt(req.params[uString]);
        const PM = new ProductModel();



        let shoeModel: any;
        let colorway: any;
        let brand: any;
        let shoeCP: number;
        let shoeRP: number;
        let shoeSize: number;

        if(!req.body.model) {
            shoeModel = "MODEL";
            colorway = "COLORWAY";
            brand = "BRAND";
            shoeCP = 0;
            shoeRP = 0;
            shoeSize = 0;
        }
        else {
            shoeModel = req.body.model;
            colorway = req.body.colorway;
            brand = req.body.brand;
            shoeCP = parseInt(req.body.current_price, 10);
            shoeRP = parseInt(req.body.retail_price, 10);
            shoeSize = parseInt(req.body.size, 10);
        }

        await PM.edit_shoe(shoeModel, shoeID, shoeSize, shoeCP, shoeRP, brand, colorway);

        res.redirect("/admin/shoes");
    }

    /**
     * Handles the POST request sent from the admin_shoes view to delete a shoe.
     *
     * @class AdminController extends BaseRoute
     * @method delShoe
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async delShoe(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const shoeID = parseInt(req.params[uString]);
        const PM = new ProductModel();
        await PM.remove_shoe(shoeID);
        res.redirect("/admin/shoes");
    }

}
