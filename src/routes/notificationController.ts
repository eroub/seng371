import { NextFunction, Request, Response, Router} from "express";
import { ShoeModel } from "../models/shoe_model";
import { NotificationModel } from "../models/notification_model";
import { UserModel } from "../models/user_model";
import { BaseRoute } from "./router";

let userNotifications: any;
let Shoes: any;

export class NotificationController extends BaseRoute {

    public static create(router: Router) {
        router.get("/user/:id/notifications", (req: Request, res: Response, next: NextFunction) => {
            new NotificationController().notificationCentre(req, res, next);
        });

        router.get("/user/:id/add_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationController().inputNotification(req, res, next);
        });

        router.get("/user/:id/edit_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationController().editNotificationForm(req, res, next);
        });

        router.post("/user/:id/add_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationController().addNotification(req, res, next);
        });

        router.post("/user/:id/remove_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationController().removeNotification(req, res, next);
        });

        router.post("/user/:id/edit_notification/:id2", (req: Request, res: Response, next: NextFunction) => {
            new NotificationController().editNotification(req, res, next);
        });


    }

    // constructor() {
        // not much here yet
    // }

    public async notificationCentre(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        const shoe_if = new ShoeModel();
        const notif_if = new NotificationModel();
        let notifArray: any[] = [];
        if (await this.isUser(userId)) {
            Shoes = await shoe_if.getAllDB();
            await this.getUserNotifications(userId);
            for (const item in userNotifications) {
                if (userNotifications.hasOwnProperty(item)) {
                    const notification = userNotifications[item];
                    const shoe = this.getShoe(notification.shoe_id);
                    notification["shoename"] = shoe.brand + ' ' + shoe.model + ' ' + shoe.colorway;
                    notification["current_price"] = shoe.current_price;
                    notification["size"] = shoe.size;
                    if (!notification.fulfilled) {
                        if ((notification.type == "Below") && (notification.threshold > shoe.current_price)) {
                            await notif_if.fulfill(notification._id);
                            notification.fulfilled = true;
                        }
                        if ((notification.type == "Above") && (notification.threshold < shoe.current_price)) {
                            console.log(notification._id);
                            await notif_if.fulfill(notification._id);
                            notification.fulfilled = true;
                        }
                    }
                    notifArray.push(notification);
                }
            }
            this.render(req, res, "notificationCentre", {id: userId, title: "Notifications", notifications:notifArray});
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

    private async getUserNotifications(userID:number) {
        const notif_if = new NotificationModel();
        userNotifications = await notif_if.getUserNotifications(userID);

        return userNotifications;
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
