import { CustomerModel } from "./models/customerModel";
import { ProductModel } from "./models/productModel";

class Helpers {

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
        console.log(userKeys);
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
        return;
    }

    public findUserShoe(shoeID: any, userShoes: any) {
        for (const item in userShoes) {
            if (userShoes.hasOwnProperty(item)) {
                const shoe = userShoes[item];
                if (shoe._id == shoeID) {
                    return shoe;
                }
            }
        }
    }

    public setNet(shoelist: any) {
        let net: number = 0;
        let sunk: number = 0;
        let total: number = 0;
        for (const item in shoelist) {
            if (shoelist.hasOwnProperty(item)) {
                const shoe = shoelist[item];
                net = net + shoe.current_price - shoe.purchase_price;
                sunk = sunk + parseInt(shoe.purchase_price, 10);
                total = total + shoe.current_price;
            }
        }
        return [net, sunk, total];
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
