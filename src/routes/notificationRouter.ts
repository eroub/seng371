import { NextFunction, Request, Response, Router} from "express";
import { ShoeModel } from "../models/shoe_model";
import { NotificationModel } from "../models/notification_model";
import { UserModel } from "../models/user_model";
import { BaseRoute } from "./router";

let userNotifications: any;
let Shoes: any;
let id:number;

export class NotificationRouter extends BaseRoute {

    public static create(router: Router) {
        router.get("/user/:id/notifications", (req: Request, res: Response, next: NextFunction) => {
            new NotificationRouter().notificationCentre(req, res, next);
        });

        router.get("/user/:id/add_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationRouter().inputNotification(req, res, next);
        });

        router.get("/user/:id/edit_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationRouter().editNotificationForm(req, res, next);
        });

        router.post("/user/:id/add_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationRouter().addNotification(req, res, next);
        });

        router.post("/user/:id/remove_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationRouter().removeNotification(req, res, next);
        });

        router.post("/user/:id/edit_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationRouter().editNotification(req, res, next);
        });


    }

    // constructor() {
        // not much here yet
    // }

    public async notificationCentre(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.buildNotifications(userId)) {
            this.render(req, res, "notificationCentre", {id: userId, title: "Notifications", notifications:userNotifications});
        } else {
            res.status(404)
            .send({
                message: "No user with associated ID. Check the entered number.",
                status: res.status,
            });        }
    }

    public async addNotification(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const sString = "id2";
        const userID = parseInt(req.params[uString]);
        const shoeID = parseInt(req.params[sString]);
        const nIF = new NotificationModel();
        let threshold = req.body.threshold;
        if (!threshold) {
            threshold = 0;
        }
        await nIF.add_notif(userID, shoeID, threshold, req.body.type);
        res.redirect('/user/' + userID + '/allShoes');
    }

    public async removeNotification(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const idString = "id2";
        const userID = parseInt(req.params[uString]);
        const notifID = req.params[idString];
        const nIF = new NotificationModel();
        await nIF.remove_notif(notifID);
        res.redirect('/user/' + userID + '/notifications');
    }

    public async editNotification(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const idString = "id2";
        const userID = parseInt(req.params[uString]);
        const notifID = req.params[idString];
        const nIF = new NotificationModel();
        if (!req.body.threshold) {
            req.body.threshold = 0;
        }
        await nIF.edit_notif(notifID, req.body.threshold, req.body.type);
        res.redirect('/user/' + userID + '/notifications');
    }

    private async buildNotifications(userID: number) {
        if (await this.isUser(userID)) {
            id = userID;
            await this.setLocals(userID);
            for (const item in userNotifications) {
                if (userNotifications.hasOwnProperty(item)) {
                    const notification = userNotifications[item];
                    const shoe = this.getShoe(notification.shoe_id);
                    notification["shoename"] = shoe.brand + ' ' + shoe.model + ' ' + shoe.colorway;
                    notification["current_price"] = shoe.current_price;
                    notification["size"] = shoe.size;
                    //console.log(notification);
                    this.checkFulfilled(notification, shoe.current_price);
                }
            }
            userNotifications.sort((a: any, b: any) => {
                if(a.shoename < b.shoename) { return -1; }
                if(a.shoename > b.shoename) { return 1; }
                return 0;
            });
            return true;
        }
        else return false;
    }

    private async checkFulfilled(notification: any, current_price: any) {
        if (!notification.fulfilled) {
            if ((notification.type == "Below") && (notification.threshold > current_price)) {
                await this.fulfill(notification._id);
                notification.fulfilled = true;
            }
            if ((notification.type == "Above") && (notification.threshold < current_price)) {
                console.log(notification._id);
                await this.fulfill(notification._id);
                notification.fulfilled = true;
            }
        }
    }

    private async fulfill(notification: any) {
        const nIF = new NotificationModel();
        await nIF.fulfill(notification._id);
    }

    private async check_local(userID: number) {
        if (!userNotifications) {
            return await this.buildNotifications(userID);
        }
        else if (id != userID) {
            return await this.buildNotifications(userID);
        }
        return true;
    }

    private async setLocals(userID: number) {
        await this.setUserNotifications(userID);
        await this.setShoes();
    }

    private async setUserNotifications(userID:number) {
        const notif_if = new NotificationModel();
        userNotifications = await notif_if.getUserNotifications(userID);

        return userNotifications;
    }

    private async setShoes() {
        const shoe_if = new ShoeModel();
        Shoes = await shoe_if.getAllDB();
    }

    public async inputNotification(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = parseInt(req.params[shoeIdString], 10);
        const shoeIF = new ShoeModel();
        const shoe = await shoeIF.getOneShoe(shoeId);
        if (shoe && await this.isUser(userId)) {
            this.render(req, res, "addNotification", {id: userId, shoe});
            /* res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    shoe
                }); */
        } else {
            res.status(404)
                .send({
                    message: "No shoe found with the given id.",
                    status: res.status,
                });
        }

    }

    public async editNotificationForm(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const notIdString = "id2";
        const notId = req.params[notIdString];
        const notification = await this.getNotif(notId);
        this.render(req, res, "editNotification", {id: userId, title: "Notification", notification:notification});
    }

    private getShoe(shoeID:number) {
        for (const item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                const shoe = Shoes[item];
                if (shoe.shoe_id === shoeID) return shoe;
            }
        }
    }

    private async getNotif(id: any) {
        const nIF = new NotificationModel();
        const notif = await nIF.get_notif(id);
        return notif[0];
    }

    private async isUser(userID: any) {
        const userIF = new UserModel();
        return await userIF.isUser(userID);
    }
}
