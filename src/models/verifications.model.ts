import { INTEGER, Model, STRING } from "sequelize";
import database from "../client/database";

export default class VerificationModel extends Model {};

// initialize verification model
VerificationModel.init({
    id: {
        type: INTEGER,
        primaryKey: true
    },
    email: {
        type: STRING
    },
    code: {
        type: STRING
    }
}, { sequelize: database, modelName: "verifications" });

VerificationModel.sync();