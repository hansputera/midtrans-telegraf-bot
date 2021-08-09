import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class ProductTakenCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "producttaken",
            description: "Lemme verify you already have the product",
            aliases: ["takenproduct", "verifyproduct"],
            cooldown: 5000
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const U = await this.client.customer.getById(ctx.from.id);
        if (!U || (U && !U.verified)) return await ctx.reply("You can't use this command because you're not registered or haven't completed verification.");
        
        const code = args[0];
        if (!code) return await ctx.reply("Please provide transaction code");
        const P = await this.client.transaction.getById(code);
        
        if (!P || P.product_customer || (P && P.customerId != ctx.from.id)) return await ctx.reply("The ID you provided could not be found");
        await this.client.transaction._transactionModel.update({
            product_customer: true
        }, {
            where: {
                id: P.id
            }
        });
        await ctx.reply("Your transaction has completed, i'll give success label to this transaction!");
    }
}