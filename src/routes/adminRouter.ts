import { NextFunction, Request, Response, Router} from "express";
import { ShoeModel } from "../models/shoe_model";
import { NotificationModel } from "../models/notification_model";
import { UserModel } from "../models/user_model";
import { BaseRoute } from "./router";
export class adminRouter extends BaseRoute {

    public static create(router: Router) {
        router.get('/admin', (req: Request, res: Response, next: NextFunction) => {
            new adminRouter().showAllUsers(req, res, next);
        });

    }

    /*
                 Shows all users in the db in a list.
     */

    public async showAllUsers(req: Request, res: Response, next: NextFunction) {
        let user_Arr: any[] = [];
         user_Arr = await this.getUsers();
        console.log(user_Arr);
        this.render(req, res, "admin", {users: user_Arr, title: "All users"});

    }


    private async getUsers() {
        const user_arr = await new UserModel().get_users();
        return user_arr;
    }
}