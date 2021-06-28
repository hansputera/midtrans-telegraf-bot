// Primary
import { Context, Telegraf } from "telegraf";
import type { Update } from "typegram";

// Loaders
import CategoriesLoader from "../loaders/categories.loader";
import CommandsLoader from "../loaders/commands.loader";

// Controllers
import CustomerController from "../controllers/customer.controller";
import TransactionController from "../controllers/transaction.controller";
import ProductController from "../controllers/product.controller";
import VerificationController from "../controllers/verification.controller";

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
    public transaction = new TransactionController(this);
    public product = new ProductController();
    public verification = new VerificationController(this);

    // Midtrans
    public midtrans = midtrans;
    
    /**
     * 
     * @param token - Bot token
     * @param options - Telegraf options
     */
    constructor(token: string, options?: Partial<Telegraf.Options<Context<Update>>>) {
        super(token, options);
        this.categories.loads();
    }

    public async rocket(options?: Telegraf.LaunchOptions) {
        return await new Promise((resolve, reject) => {
            this.launch(options).then(() => {
                resolve("logged");
                const cmds = [];
                for (const cmd of this.commands.maps.entries()) {
                    cmds.push({
                        command: cmd[0],
                        description: cmd[1].detail.description
                    });
                }
                this.telegram.setMyCommands(cmds).then(() => {
                    console.info("Successful register", cmds.length, "commands");
                });
            }).catch(reject);
        });
    }
}