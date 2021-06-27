import { BOOLEAN, INTEGER, Model, STRING } from "sequelize";
import database from "../client/database";

export default class TransactionModel extends Model {};
// Initialize product model
TransactionModel.init({
    id: {
        type: STRING,
        primaryKey: true
    },
    customerId: {
        type: INTEGER
    },
    quantity: {
        type: INTEGER,
        defaultValue: 1
    },
    price: {
        type: INTEGER
    },
    paid: {
        type: BOOLEAN,
        defaultValue: false
    },
    payment: {
        type: STRING,
        defaultValue: "notyet"
    }
}, {
    sequelize: database,
    modelName: "transactions"
});

TransactionModel.sync();