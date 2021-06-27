import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class PingCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "ping",
            description: "Play ping pong",
            aliases: ["pong"]
        }, client);
    }

    public async execute(ctx: CommandContext) {
        await ctx.reply("🏓 Pong!");
    }
}