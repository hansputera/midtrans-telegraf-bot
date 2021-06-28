import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class ListProductCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "listproduct",
            description: "Provide a list of available products in the database",
            aliases: ["lp", "listprod", "listp"]
        }, client);
    }

    public async execute(ctx: CommandContext) {
        const Products = await this.client.product.getAll();
        let text = Products.length ? `Hello 😉, you can see a list of products we have. Hope you're interested!\n\n${Products.map((x, i) => `${i+1}. (ID: \`${x.id}\`) | ${x.name} | ${x.stocks} stock(s)`).join("\n")}\n\nDon't forget to use a mask and wash your hands 😊\nTo know the details of the product, you can use this format \`"/product ID-PRODUCT"\`. Do not use quotation marks, and replace "ID-PRODUCT" with the product id provided above`: "😣 Sorry, the list of products you requested is empty. Please come back at a later time 🙏";
        await ctx.replyWithMarkdown(text);
    }
}