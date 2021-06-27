import { Sequelize } from "sequelize";

export default new Sequelize({
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "midtrans-bot",
    dialect: "mysql"
});