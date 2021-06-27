import Midtrans from "midtrans-node";
import * as config from "../config";

export default new Midtrans(false, config.MidtransAPIKey);