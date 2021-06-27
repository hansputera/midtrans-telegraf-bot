import type MidtransBot from "../client/bot";
import TransactionModel from "../models/transaction.model";
import type { Transaction } from "../types";

export default class TransactionController {
    public _transactionModel = TransactionModel;
    constructor(private client: MidtransBot) {}

    public async getAll() {
        return (await this._transactionModel.findAll()).map(tr => tr.toJSON() as Transaction);
    }
}