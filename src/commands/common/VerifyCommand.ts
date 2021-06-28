import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";

export default class VerifyCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "verify",
            description: "Verify your account",
            aliases: ["verifyme", "verifyiam"]
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const U = await this.client.customer.getById(ctx.from.id);
        if (!U || (U && U.verified)) return await ctx.reply("Sorry, you haven't registered or verified before.");
        const code = args[0];
        if (!code) return await ctx.reply("Provide the verification code you received.");
        const m = await ctx.reply("Please wait, the verification process is in progress.");
        const verified = await this.client.verification.verify(ctx.from.id, code);
        if (verified == false) return await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, "", "Verification code does not match");
        else if (verified == null) {
            await this.client.verification.insert(ctx.from.id, U.email);
            return await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, "", "Verification expires, a new verification code has been sent.");
        } else {
            return await ctx.telegram.editMessageText(ctx.chat.id, m.message_id, "", "🎉 Congratulations, your account has been verified");
        }
    }
}