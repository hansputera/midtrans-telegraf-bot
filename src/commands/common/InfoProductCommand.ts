import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class InfoProductCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "product",
            description: "View product details",
            aliases: ["infoproduct", "infoprod", "infp"]
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const code = args[0];
        if (!code) return await ctx.reply("Please enter the product code");
        const m = await ctx.reply("Processing ...");
        const product = await this.client.product.get(code);
        if (!product) return await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, "", "Not found");
        else return await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, "", `- Product Code: \`${product.id}\`\n- Product Name: ${product.name}\n- Product description: ${product.description}\n- Product Stocks: ${product.stocks}\n- Added at: \`${product.createdAt}\``, {
            parse_mode: "Markdown"
        });
    }
}