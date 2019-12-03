import { CustomerModel } from "./models/customerModel";
import { ProductModel } from "./models/productModel";

class Helpers {

    public ID404(res: any) {
        res.status(404)
            .send({
                message: "No user with associated ID. Check the entered number.",
                status: res.status,
            });
    }

    public shoe404(res: any) {
        res.status(404)
            .send({
                message: "No shoe found with the given id.",
                status: res.status,
            });
    }

    public async getMaxUser() {
        const c = new CustomerModel();
        const users: any = await c.get_users();
        let max: number = 0;
        for (const item in users) {
            if (users.hasOwnProperty(item)) {
                console.log(users[item].user_id, max);
                if (users[item].user_id > max) {
                    max = users[item].user_id;
                }
            }
        }
        return max;
    }

    public async getMaxShoe() {
        const p = new ProductModel();
        const shoes: any = await p.getAllDB();
        let max: any = 0;
        for (const item in shoes) {
            if (shoes.hasOwnProperty(item)) {
                if (shoes[item].shoe_id > max) {
                    max = shoes[item].shoe_id;
                }
            }
        }
        return max;
    }

    public async getAllUserShoes() {
        const c = new CustomerModel();
        const shoes = await c.get_all_keys();
        return shoes;
    }

    public async getUserShoes(userID: any) {
        const userKeys = await this.getUserKeys(userID);
        const Shoes = await this.getAllDbShoes();
        const userShoes: any[] = [];
        for (const item in userKeys) {
            if (userKeys.hasOwnProperty(item)) {
                const key = userKeys[item];
                const shoe = this.getShoeInfo(key.shoe_id, Shoes);
                key["name"] = shoe.brand + " " + shoe.model + " " + shoe.colorway;
                key["size"] = shoe.size;
                key["current_price"] = shoe.current_price;
                key["retail_price"] = shoe.retail_price;
                userShoes.push(key);
            }
        }
        return userShoes;
    }

    public async getUserInfo(queryint: number) {
        const userIf = new CustomerModel();
        let userInfo = null;
        try {
            userInfo = await userIf.userInfo(queryint);
        } catch {
            return false;
        }
        if (userInfo.length !== 0) {
            return userInfo[0];
        } else {
            return false;
        }
    }

    public getShoeInfo(shoeID: number, Shoes: any) {
        for (const item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                const shoe = Shoes[item];
                if (shoe.shoe_id === shoeID) {
                    return shoe;
                }
            }
        }
    }

    public async getUserKeys(userID: any) {
        const userIf = new CustomerModel();
        const userKeys: any = await userIf.getKeys(userID);
        return userKeys;
    }

    public async isUser(userID: any) {
        const userIF = new CustomerModel();
        return await userIF.isUser(userID);
    }

    /* returns every shoe in db */
    public async getAllDbShoes() {
        let allShoes = null;
        const shoeIf = new ProductModel();
        try {
            allShoes = await shoeIf.getAllDB();
        } catch {
            return false;
        }
        if (allShoes) {
            return allShoes;
        }
        return [];
    }

    public findUserShoe(shoeID: any, userShoes: any) {
        for (const item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                const shoe = userShoes[item];
                if (shoe._id.toString() === shoeID.toString()) {
                    return shoe;
                }
            }
        }
    }

    public setNet(shoelist: any) {
        let net: number = 0;
        let sunk: number = 0;
        let total: number = 0;
        let num: number = 0;
        for (const item in shoelist) {
            if (shoelist.hasOwnProperty(item)) {
                const shoe = shoelist[item];
                net = net + parseInt(shoe.current_price, 10) - parseInt(shoe.purchase_price, 10);
                sunk = sunk + parseInt(shoe.purchase_price, 10);
                total = total + parseInt(shoe.current_price, 10);
                num++;
            }
        }
        return [net, sunk, total, num];
    }

    public async getUsers() {
        const userArr = await new CustomerModel().get_users();
        return userArr;
    }

    public async getShoe(shoeId: number) {
        const shoeIf = new ProductModel();
        const shoe = await shoeIf.getOneShoe(shoeId);
        if (shoe) {
            return shoe;
        } else {
            return;
        }
    }

    /* public async getUserShoes(userKeys: any) {
        const shoeIf = new ProductModel();
        const uShoes = await shoeIf.getAllShoes(userKeys);
        return uShoes;
    } */

}

export = new Helpers();
