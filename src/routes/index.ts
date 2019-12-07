import { NextFunction, Request, Response, Router } from "express";
import { CustomerModel } from "../models/customerModel";
import { BaseRoute } from "./router";

/**
 * / route
 *
 * @class IndexRoute
 */
export class IndexRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router) {
        // log
        // add home page route
        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @next {NextFunction} Execute the next method.
     */
    public async index(req: Request, res: Response, next: NextFunction) {
        // set custom title
        this.title = "StalkX";
        // set message
        const cIF = new CustomerModel();
        const users = await cIF.get_users();

        users.sort((a: any, b: any) => {
            return a.username.toLowerCase().localeCompare(b.username.toLowerCase());
        });

        const admins: any = [];
        const regularUsers: any = [];

        for (const item in users) {
            if (users.hasOwnProperty(item)) {
                if (users[item].isAdmin) {
                    admins.push(users[item]);
                } else {
                    regularUsers.push(users[item]);
                }
            }
        }

        const options: object = {
            admins,
            message: "Welcome!",
            regularUsers,
        };

        // render template
        this.render(req, res, "index", options);
    }
}
