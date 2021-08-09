import { INTEGER, Model, STRING } from "sequelize";
import database from "../client/database";

export default class ProductModel extends Model {}

// Initialize product model
ProductModel.init({
    id: {
        type: STRING,
        primaryKey: true
    },
    name: {
        type: STRING
    },
    stocks: {
        type: INTEGER,
        defaultValue: 0
    },
    price: {
        type: INTEGER
    },
    description: {
        type: STRING
    },
}, {
    sequelize: database,
    modelName: "products"
});

ProductModel.sync();