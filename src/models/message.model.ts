import { INTEGER, Model, STRING } from "sequelize";
import database from "../client/database";

export default class MessageModel extends Model {};
MessageModel.init({
    id: {
        type: STRING,
        primaryKey: true,
    },
    content: {
        type: STRING
    },
    attachments: {
        type: STRING,
        set(val: string[]) {
            this.setDataValue("attachments", JSON.stringify(val));
        },
        get() {
            try {
                return JSON.parse(this.getDataValue("attachments"));
            } catch {
                return [];
            }
        }
    },
    author: {
        type: INTEGER
    },
    transactionId: {
        type: STRING
    }
}, {
    sequelize: database,
    modelName: "messages"
});