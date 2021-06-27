import Chalk from "chalk";
import { readdirSync } from "fs";
import { join } from "path";
import type BaseCommand from "../abstracts/basecommand.abstract";
import type MidtransBot from "../client/bot";

export default class CommandsLoader {
    public maps: Map<string, BaseCommand> = new Map();
    constructor(private client: MidtransBot) {}

    public load(category: string) {
        const location = join(__dirname, "..", "commands", category);
        const files = readdirSync(location).filter(fl => fl.endsWith(".js") && !fl.startsWith("config"));
        console.log(Chalk.blue("Found", files.length, "commands", "from", `'${category}'`, "category"));
        for (const fl of files) {
            new (require(`${location}/${fl}`).default)(this.client);
        }
    }
}