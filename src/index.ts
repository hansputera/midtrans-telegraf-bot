import MidtransBot from "./client/bot";
import * as config from "./config";

const bot = new MidtransBot(config.token);
bot.rocket({
    dropPendingUpdates: true
}).then((res) => {
    console.log(res);
}).catch(console.error);
