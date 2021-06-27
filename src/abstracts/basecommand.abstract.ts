import Chalk from "chalk";
import MidtransBot from "../client/bot";
import type { CommandContext, CommandProps } from "../types";

export default abstract class BaseCommand {
    constructor(public detail: CommandProps, public client: MidtransBot) {
        const command = this.client.commands.maps.get(detail.name) || this.client.commands.maps.get(this.client.aliases.get(detail.name));
        if (command) this.client.commands.maps.delete(command.detail.name);

        // Pass optional properties
        if (!detail.cooldown) detail.cooldown = 5000; 
        if (!detail.ownerOnly) detail.ownerOnly = false;
        this.client.commands.maps.set(detail.name, this);
        console.log(Chalk.red(`${detail.name} command loaded`));

        // telegraf composer
        const commandes = [detail.name].concat(detail.aliases);
        this.client.command(commandes, async (ctx) => {
            const cmdEntity = ctx.message.entities.find(entity => entity.type == "bot_command");
            const args = ctx.message.text.replace(ctx.message.text.slice(cmdEntity.offset, cmdEntity.length), "").trim().split(/ +/g);
            await this.execute(ctx, args);
        });
    }

    public async execute(ctx: CommandContext, args: string[]): Promise<any> {};
}