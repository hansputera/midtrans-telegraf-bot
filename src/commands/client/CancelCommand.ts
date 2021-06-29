import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class CancelCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "cancel",
            description: "Cancel the transaction process",
            aliases: ["canceltr"],
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const U = await this.client.customer.getById(ctx.from.id);
        if (!U || (U && !U.verified)) return await ctx.reply("You can't cancel any transactions because you're not registered or haven't completed verification.");
        
        const code = args[0];
        if (!code) return await ctx.reply("Please provide transaction code");
        const P = await this.client.transaction.getById(code);
        if (!P || (P && P.customerId != ctx.from.id)) return await ctx.reply("The ID you provided could not be found");
        if (P.paid) return await ctx.reply("You cannot cancel a transaction that has been paid, but can only be refunded.");
        await this.client.transaction.cancel(code);
        return await ctx.reply("The transaction has been cancelled");
    }
}