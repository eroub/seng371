import { NextFunction, Request, Response, Router} from "express";
import Helpers = require("../helperFunctions");
import { NotificationModel } from "../models/notificationModel";
import { ProductModel } from "../models/productModel";
import { BaseRoute } from "../routes/router";

let userNotifications: any;
let Shoes: any;
let id: number;

export class NotificationController extends BaseRoute {
    /**
     * Creates NotificationController routes.
     *
     * @class NotificationController extends BaseRoute
     * @method create
     * @param router {Router} The router object.
     * @return void
     */

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

        router.get("/user/:id/notifications/filter/fulfilled", (req: Request, res: Response, next: NextFunction) => {
            new NotificationController().filterFulfilled(req, res, next);
        });

        router.get("/user/:id/notifications/filter/unfulfilled", (req: Request, res: Response, next: NextFunction) => {
            new NotificationController().filterUnfulfilled(req, res, next);
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



    /**
     * Renders the notificationCentre view when user navigates to /user/<user_id>/notifications.
     *
     * @class NotificationController extends BaseRoute
     * @method notificationCentre
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async notificationCentre(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        if (await this.buildNotifications(userId)) {
            this.render(req, res, "notificationCentre",
                {id: userId, title: "Notifications", notifications: userNotifications});
        } else {
            res.status(404)
            .send({
                message: "No user with associated ID. Check the entered number.",
                status: res.status,
            });        }
    }


    /**
     * Renders the notificationCentre view when user navigates to /user/<user_id>/notifications/filter/fulfilled.
     *
     * @class NotificationController extends BaseRoute
     * @method filterFulfilled
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async filterFulfilled(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        const fulfilledNots: any = [];
        if (await this.check_local(userId)) {
            for (const item in userNotifications) {
                if (userNotifications.hasOwnProperty(item)) {
                    if (userNotifications[item].fulfilled) {
                        fulfilledNots.push(userNotifications[item]);
                    }
                }
            }
            this.render(req, res, "notificationCentre",
                {id: userId, title: "Notifications", notifications: fulfilledNots});
        } else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }


    /**
     * Renders the notificationCentre view when user navigates to /user/<user_id>/notifications/filter/unfulfilled.
     *
     * @class NotificationController extends BaseRoute
     * @method filterUnulfilled
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async filterUnfulfilled(req: Request, res: Response, next: NextFunction) {
        const idString = "id";
        const userId = parseInt(req.params[idString], 10);
        const unfulfilledNots: any = [];
        if (await this.check_local(userId)) {
            for (const item in userNotifications) {
                if (userNotifications.hasOwnProperty(item)) {
                    if (!userNotifications[item].fulfilled) {
                        unfulfilledNots.push(userNotifications[item]);
                    }
                }
            }
            this.render(req, res, "notificationCentre",
                {id: userId, title: "Notifications", notifications: unfulfilledNots});
        } else {
            res.status(404)
                .send({
                    message: "No user with associated ID. Check the entered number.",
                    status: res.status,
                });        }
    }

    /**
     * redirects to allShoes view when the user navigates to /user/<user_id>/notifications/add_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method addNotification
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async addNotification(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const sString = "id2";
        const userID = parseInt(req.params[uString], 10);
        const shoeID = parseInt(req.params[sString], 10);
        const nIF = new NotificationModel();
        let threshold = req.body.threshold;
        if (!threshold) {
            threshold = 0;
        }
        await nIF.addNotification(userID, shoeID, threshold, req.body.type);
        res.redirect("/user/" + userID + "/allShoes");

    }


    /**
     * redirects to notifications view when the user navigates to /user/<user_id>/remove_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method removeNotification
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */
    public async removeNotification(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const idString = "id2";
        const userID = parseInt(req.params[uString], 10);
        const notifID = req.params[idString];
        const nIF = new NotificationModel();
        await nIF.remove_notif(notifID);
        res.redirect("/user/" + userID + "/notifications");
    }

    /**
     * redirects to notifications view when the user navigates to /user/<user_id>/edit_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method editNotifications
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async editNotification(req: Request, res: Response, next: NextFunction) {
        const uString = "id";
        const idString = "id2";
        const userID = parseInt(req.params[uString], 10);
        const notifID = req.params[idString];
        const nIF = new NotificationModel();
        if (!req.body.threshold) {
            req.body.threshold = 0;
        }
        await nIF.edit_notif(notifID, req.body.threshold, req.body.type);
        res.redirect("/user/" + userID + "/notifications");
    }

    /**
     * fetches the addNotification view when the user navigates to /user/<user_id>/add_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method inputNotifications
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async inputNotification(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const shoeIdString = "id2";
        const shoeId = parseInt(req.params[shoeIdString], 10);
        const shoeIF = new ProductModel();
        const shoe = await shoeIF.getOneShoe(shoeId);
        if (shoe && await Helpers.isUser(userId)) {
            this.render(req, res, "addNotification", { id: userId, shoe });
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                });
        } else {
            res.status(404)
                .send({
                    message: "No shoe found with the given id.",
                    status: res.status,
                });
        }

    }

    /**
     * fetches the ditNotification view when the user navigates to /user/<user_id>/edit_notification/<notification_id>.
     *
     * @class NotificationController extends BaseRoute
     * @method editNotificationForm
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param next {NextFunction} The NextFunction.
     * @return void
     */

    public async editNotificationForm(req: Request, res: Response, next: NextFunction) {
        const userIdString = "id";
        const userId = parseInt(req.params[userIdString], 10);
        const notIdString = "id2";
        const notId = req.params[notIdString];
        const notification = await this.getNotif(notId);
        this.render(req, res, "editNotification", { id: userId, title: "Notification", notification });
    }


    /**
     * A helper function to set the usrs notifications.
     *
     * @class NotificationController extends BaseRoute
     * @method buildNotifications
     * @param UserID, the ID of the user for whom to return notifications for
     * @return boolean
     */



    private async buildNotifications(userID: number) {
        if (await Helpers.isUser(userID)) {
            id = userID;
            await this.setLocals(userID);
            for (const item in userNotifications) {
                if (userNotifications.hasOwnProperty(item)) {
                    const notification = userNotifications[item];
                    const shoe = this.getShoe(notification.shoe_id);
                    notification["shoename"] = shoe.brand + " " + shoe.model + " " + shoe.colorway;
                    notification["current_price"] = shoe.current_price;
                    notification["size"] = shoe.size;
                    await this.checkFulfilled(notification, shoe.current_price);
                }
            }
            userNotifications.sort((a: any, b: any) => {
                return a.shoename.toLowerCase().localeCompare(b.shoename.toLowerCase());
            });
            return true;
        } else {
            return false;
        }
    }



    /**
     * A helper function that checks if a notification has been fulfilled
     * @class NotificationController extends BaseRoute
     * @method editNotificationForm
     * @param notification
     * @param currentPrice
     * @return void
     */

    private async checkFulfilled(notification: any, currentPrice: any) {
        if (!notification.fulfilled) {
            if ((notification.type === "Below") && (notification.threshold > currentPrice)) {
                await this.fulfill(notification._id);
                notification.fulfilled = true;
            }
            if ((notification.type === "Above") && (notification.threshold < currentPrice)) {
                await this.fulfill(notification._id);
                notification.fulfilled = true;
            }
        }
    }

    /**
     * Queries the db to update status of a notification.
     *
     * @class NotificationController extends BaseRoute
     * @method fulfill
     * @param Notification  the notification Object.
     * @return true if the notification was successfully fulfilled, otherwise false.
     */

    private async fulfill(notification: any) {
        const nIF = new NotificationModel();
        await nIF.fulfill(notification._id);
    }

    /**
     * calls buildNotifications is userNotifications is empty or if id != userID
     *
     * @class NotificationController extends BaseRoute
     * @method check_local
     * @param UserID  the id of the current user.
     * @return true if buildnotifications returns succesfully
     */


    private async check_local(userID: number) {
        if (!userNotifications) {
            return await this.buildNotifications(userID);
        } else if (id !== userID) {
            return await this.buildNotifications(userID);
        }
        return true;
    }

    /**
     * calls local function setUserNotifications to set local variable userNotification
     *
     * @class NotificationController extends BaseRoute
     * @method setLocals
     * @param UserID  the id of the current user.
     * @return void
     */


    private async setLocals(userID: number) {
        await this.setUserNotifications(userID);
        Shoes = await Helpers.getAllDbShoes();
    }


    /**
     * Queries the DB to set local variable userNotification
     *
     * @class NotificationController extends BaseRoute
     * @method setUserNotifications
     * @param UserID  the id of the current user.
     * @return void
     */


    private async setUserNotifications(userID: number) {
        const notifIf = new NotificationModel();
        userNotifications = await notifIf.getUserNotifications(userID);
    }


    /**
     * returns a shoe object
     *
     * @class NotificationController extends BaseRoute
     * @method getShoe
     * @param UserID  the id of the current user.
     * @return shoe object
     */

    private getShoe(shoeID: number) {
        for (const item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                const shoe = Shoes[item];
                if (shoe.shoe_id === shoeID) {
                    return shoe;
                }
            }
        }
    }

    /**
     * returns a shoe object
     *
     * @class NotificationController extends BaseRoute
     * @method getShoe
     * @param id (any)   the id of the notification.
     * @return notification object
     */

    private async getNotif(id: any) {
        const nIF = new NotificationModel();
        const notif = await nIF.get_notif(id);
        return notif[0];
    }

}
