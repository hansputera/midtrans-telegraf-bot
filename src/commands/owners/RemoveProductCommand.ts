import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class RemoveProduct extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "removeproduct",
            description: "Remove a product from a database",
            aliases: ["remproduct", "remprod", "removeprod", "reprod"]
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const id = args[0];
        if (!id) return await ctx.reply("Please enter the product id");

        const deleted = await this.client.product.delete(id);
        if (deleted) return await ctx.reply("Successfully remove product from database");
        else return await ctx.reply("Failed to remove product");
    }
}