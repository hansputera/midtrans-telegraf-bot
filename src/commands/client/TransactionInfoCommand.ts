import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class TransactionInfoCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "trinfo",
            description: "Show transaction details",
            aliases: ["transactioninformation", "transactioninfo", "trinformation"]
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const U = await this.client.customer.getById(ctx.from.id);
        if (!U || (U && !U.verified)) return await ctx.reply("You can't use this command because you're not registered or haven't completed verification.");
        
        const code = args[0];
        if (!code) return await ctx.reply("Please provide transaction code");
        const P = await this.client.transaction.getById(code);
        if (!P || (P && P.customerId != ctx.from.id)) return await ctx.reply("The ID you provided could not be found");
        else return await ctx.replyWithMarkdown(`- Product ID: \`${P.id}\`\n- Item: ${P.item}\n- Price: Rp.${P.price.toLocaleString()}\n- Quantity: ${P.quantity}\n- Payment: ${P.paid ? "Paid | " + P.payment : "Not Paid"}\n- Created at: ${P.createdAt}`);
    }
}