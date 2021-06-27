import Chalk from "chalk";
import { readdir } from "fs";
import { join } from "path";
import type MidtransBot from "../client/bot";
import type { CategoryConfig } from "../types";

export default class CategoriesLoader {
    public maps: Map<string, CategoryConfig> = new Map();
    constructor(private client: MidtransBot) {}

    public loads() {
        const location = join(__dirname, "..", "commands");
        readdir(location, (err, categories) => {
           if (err) throw new Error(err.message);
           console.log(Chalk.blue("Found", categories.length, "categories")); // colorized log 
           categories.forEach((category, index) => {
               index = index+1; // plus '1'
               const ctPath = join(__dirname, "..", "commands", category, "config");
               const ct: CategoryConfig = require(ctPath).default;
               ct.commands = [];
               ct.path = `${location}/${category}`;
               this.maps.set(category, ct);
               console.log(Chalk.blue(`${index}. '${category}' category loaded`));
               this.client.commands.load(category);
           });
        });
    }
}