import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class AddProductCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "addproduct",
            description: "Add product to database",
            aliases: ["addprod", "addp"],
            cooldown: 8000,
            ownerOnly: true
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const splittes = args.join(" ").split(";");
        if (!splittes.length) return await ctx.reply("Make sure you fill in the correct arguments");

        const name = splittes[0];
        if (name.length < 5) return await ctx.reply("Product name must be longer than 5 characters");

        const price = splittes[1];
        if (/[^0-9]/g.test(price)) return await ctx.reply("The price must be a number instead of a letter, and the currency used now is Rupiah (IDR)");

        const stocks = splittes[2];
        if (/[^0-9]/g.test(stocks)) return await ctx.reply("Stocks must be numbers and not letters.");

        const description = splittes[3];
        const P = await this.client.product.insert(name, Number(price), Number(stocks), description);
        await ctx.replyWithMarkdown(`🎉 The product has been inserted into the database\nProduct ID: ${P.id}`);
    }
}