// Primary
import { Context, Telegraf } from "telegraf";
import type { Update } from "typegram";

// Loaders
import CategoriesLoader from "../loaders/categories.loader";
import CommandsLoader from "../loaders/commands.loader";

// Controllers
import CustomerController from "../controllers/customer.controller";

// Payment gateway handlers
import midtrans from "./midtrans";

export default class MidtransBot extends Telegraf {
    // Loaders
    public categories = new CategoriesLoader(this);
    public commands = new CommandsLoader(this);

    // Aliases map
    public aliases: Map<string, string> = new Map();

    // Controllers
    public customer = new CustomerController();

    // Midtrans
    public midtrans = midtrans;
    
    /**
     * 
     * @param token - Bot token
     * @param options - Telegraf options
     */
    constructor(token: string, options?: Partial<Telegraf.Options<Context<Update>>>) {
        super(token, options);
    }

    public async rocket(options?: Telegraf.LaunchOptions) {
        return await new Promise((resolve, reject) => {
            this.launch(options).then(() => {
                this.categories.loads();
                Promise.resolve("logged");
            }).catch(reject);
        });
    }
}