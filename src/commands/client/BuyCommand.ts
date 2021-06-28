import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class BuyCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "buy",
            description: "Buy items sold in the product list",
            aliases: ["buys", "getit"],
            cooldown: 20 * 1000
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const U = await this.client.customer.getById(ctx.from.id);
        if (!U || (U && !U.verified)) return await ctx.reply("You can't buy because you're not registered or haven't completed verification.");

        const code = args[0];
        if (!code) return await ctx.reply("Please enter the product code");
        const product = await this.client.product.get(code);
        if (!product) return await ctx.reply("Please see the product list again, the product code is note the small case if any");

        const quantity = args[1];
        if (!quantity || /[^0-9]/g.test(quantity)) return await ctx.reply("Please give me valid number(s) for quantity");
        const tr = await this.client.transaction.insert(ctx.from.id, product.name, product.price, Number(quantity));
        if (!tr) return await ctx.reply("Sesuatu ada yang salah dengan sistem");
        else {
            console.log(tr.redirect_url);   
        }
    }
}