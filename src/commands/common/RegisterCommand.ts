import BaseCommand from "../../abstracts/basecommand.abstract";
import type MidtransBot from "../../client/bot";
import type { CommandContext } from "../../types";
import deepValidator from "deep-email-validator";

export default class RegisterCommand extends BaseCommand {
    constructor(client: MidtransBot) {
        super({
            name: "register",
            description: "Register a user into the database to become a customer",
            aliases: ["regis"]
        }, client);
    }

    public async execute(ctx: CommandContext, args: string[]) {
        const email = args[0];
        if (!email) return await ctx.reply("Please enter an email for registration as there will be validation");
        const { valid, reason, validators } = await deepValidator({
            email,
            sender: email,
            validateRegex: true,
            validateDisposable: true,
            validateTypo: false,
            validateMx: true,
            validateSMTP: false
        });
        if (!valid) return await ctx.reply("Failed to register, because " + validators[reason].reason);
        
        const U = await this.client.customer.insert(ctx.from.id, email);
        if (!U) return await ctx.reply("Failed to register, because you have registered or the email you provided is invalid.");
        else {
            await this.client.verification.insert(ctx.from.id, email);
            await ctx.reply("Successfully registered you to the database. Please check your email inbox to see the verification code.");
        }
    }
}