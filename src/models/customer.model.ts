import { BOOLEAN, INTEGER, Model, STRING } from "sequelize";
import database from "../client/database";

export default class CustomerModel extends Model {};
// initialize customer model
CustomerModel.init({
    id: {
        type: INTEGER,
        primaryKey: true
    },
    email: {
        type: STRING
    },
    verified: {
        type: BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: database,
    modelName: "customers"
});

CustomerModel.sync();