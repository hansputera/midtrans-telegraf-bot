import * as crypto from "crypto";
import ProductModel from "../models/product.model";
import type { Product } from "../types";

export default class ProductController {
    public _productModel = ProductModel;

    public async getAll() {
        return (await this._productModel.findAll()).map(p => p.toJSON() as Product);
    }

    public async get(id: string) {
        const P = await this._productModel.findOne({
            where:
            {
                id
            }
        });
        return P ? P.toJSON() as Product : undefined;
    }

    public async add(id: string, stocks = 1) {
        const P = await this.get(id);
        if (!P) return false;
        await this._productModel.update({
            stocks: P.stocks + stocks
        }, {
            where: {
                id
            }
        });
        return true;
    }

    public async sub(id: string, stocks = 1) {
        const P = await this.get(id);
        if (!P || (P.stocks - stocks) < 0) return false;
        await this._productModel.update({
            stocks: P.stocks - stocks
        }, {
            where: {
                id
            }
        });
        return true;
    }

    public async delete(id: string) {
        const P = await this.get(id);
        if (!P) return false;
        await this._productModel.destroy({ where: { id }});
        return true;
    }

    public async insert(item: string, price: number, stocks = 1, description = "A Product") {
        const ids = crypto.randomUUID().split("-");
        const id = ids[Math.floor(Math.random() * ids.length)];

        const object = {
            id,
            name: item,
            price,
            stocks,
            description
        };
        await this._productModel.create(object);
        return object;
    }
}