import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class ListTrasactionCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "listtransaction",
            description: "Shows a list of transactions",
            aliases: ["listtr", "transactionlist"]
        }, client);
    }

    public async execute(ctx: CommandContext) {
        const U = await this.client.customer.getById(ctx.from.id);
        if (!U || (U && !U.verified)) return await ctx.reply("You can't use this command because you're not registered or haven't completed verification.");
        
        const trs = await this.client.transaction.getAll();
        const trss = trs.filter(tr => tr.customerId == ctx.from.id);

        if (!trss.length) return await ctx.reply("You don't have any transactions");
        else {
            const text = `This is your list of transactions:\n\n${trss.map((tr, i) => `${i+1}. (ID: \`${tr.id}\`) | ${tr.item} | ${tr.paid ? "You've paid for it with " + tr.payment : "Not paid"}`).join("\n")}\n\nGet transaction details in the following format \`"/trinfo ID_TRANSACTION"\``;
            return await ctx.replyWithMarkdown(text);
        }
    }
}