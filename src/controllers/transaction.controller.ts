import * as crypto from "crypto";
import * as config from "../config";
import type MidtransBot from "../client/bot";
import TransactionModel from "../models/transaction.model";
import type { Transaction } from "../types";

export default class TransactionController {
    public _transactionModel = TransactionModel;
    constructor(private client: MidtransBot) {}

    public async getAll() {
        return (await this._transactionModel.findAll()).map(tr => tr.toJSON() as Transaction);
    }

    public async getById(id: string) {
        const tr = await this._transactionModel.findOne({
            where: {
                id
            }
        });
        return tr ? tr.toJSON() as Transaction : undefined;
    }

    public async insert(customerId: number, item: string, price: number, quantity = 1) {
        const identifier = crypto.randomUUID().split("-")[0];

        const id = `${config.TransactionPrefix}-${identifier}`;
        const user = await this.client.customer.getById(customerId);
        if (!user) return false;

        const object = {
            id,
            customerId,
            item,
            price,
            quantity,
            paid: false,
            payment: "notyet"
        };

        const tre = await this.client.midtrans.createTransaction({
            transaction_details: {
                gross_amount: object.price,
                order_id: id
            },
            customer_details: {
                email: user.email,
                country_code: "IDN"
            },
            item_details: [
                {
                    id: crypto.randomUUID(),
                    price: object.price,
                    quantity: object.quantity,
                    name: item
                }
            ]
        });

        object["token"] = tre.token;
        await this._transactionModel.create(object);
        return true;
    }

    public async cancel(id: string) {
        const tr = await this.getById(id);
        if (!tr) return false;
        await this.client.midtrans.cancelTransaction(id);
        await this._transactionModel.destroy({ where: { id }});
        return true;
    }
}