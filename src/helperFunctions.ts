import { UserModel } from "./models/user_model"
import { ShoeModel } from "./models/shoe_model";

let userJson: any;
let userKeys: any;
let userShoes: any[] = [];
let netGain: number = 0;
let sunkCost: number = 0;
let totalRevenue: number = 0;
let Shoes: any;

class helpers {

    public async check_local(userID: number) {
        if (!(userJson && userShoes)) {
            userJson = await this.getUserInfo(userID);
            if (!userJson) {
                return false;
            }
            console.log("setting shoes");
            userKeys = await this.getUserKeys(userID);
            await this.setUserShoes(userKeys);
            await this.setNet(userShoes);
            return true;
        }
        else if (userJson.user_id != userID) {
            userJson = await this.getUserInfo(userID);
            if (!userJson) {
                return false;
            }
            userShoes = [];
            netGain = 0;
            sunkCost = 0;
            totalRevenue = 0;
            userKeys = await this.getUserKeys(userID);
            await this.setUserShoes(userKeys);
            await this.setNet(userShoes);
            return true;
        }

        return true;
    };

    public async setUserShoes(userKeys: any) {
        Shoes = await this.getAllDbShoes();
        for (const item in userKeys) {
            if (userKeys.hasOwnProperty(item)) {
                const key = userKeys[item];
                const shoe = this.getShoeInfo(key.shoe_id);
                key["name"] = shoe.brand + ' ' + shoe.model + ' ' + shoe.colorway;
                key["size"] = shoe.size;
                key["current_price"] = shoe.current_price;
                key["retail_price"] = shoe.retail_price;
                userShoes.push(key);
            }
        }
        return userShoes;
    }

    public async getUserInfo(queryint: number) {
        const userIf = new UserModel();
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

    public async setNet(shoelist: any) {
        for (const item in shoelist) {
            if (shoelist.hasOwnProperty(item)) {
                const shoe = shoelist[item];
                netGain = netGain + shoe.current_price - shoe.purchase_price;
                sunkCost = sunkCost + parseInt(shoe.purchase_price);
                totalRevenue = totalRevenue + shoe.current_price;
            }
        }
        return [netGain,sunkCost,totalRevenue];
    }

    public getShoeInfo(shoeID:number) {
        for (const item in Shoes) {
            if (Shoes.hasOwnProperty(item)) {
                const shoe = Shoes[item];
                if (shoe.shoe_id === shoeID) return shoe;
            }
        }
    }

    public async getUserKeys(userID: any) {
        const user_if = new UserModel();
        const userKeys:any = await user_if.get_keys(userID);
        console.log(userKeys);
        return userKeys;
    }
    
    public async isUser(userID: any) {
        const userIF = new UserModel();
        return await userIF.isUser(userID);
    }


    /* returns every shoe in db */
    public async getAllDbShoes() {
        let allShoes = null;
        const shoeIf = new ShoeModel();
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

}

export = new helpers();
