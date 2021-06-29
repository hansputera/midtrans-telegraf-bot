import * as crypto from "crypto";
import * as config from "../config";
import VerificationModel from "../models/verifications.model";
import type { Verification } from "../types";
import Nodemailer from "nodemailer";
import type MidtransBot from "../client/bot";

export default class VerificationController {
    public _verificationModel = VerificationModel;
    constructor(private client: MidtransBot) {}

    public async getAll() {
        return (await this._verificationModel.findAll()).map(v => v.toJSON() as Verification);
    }

    public async getById(id: number) {
        const u = await this._verificationModel.findOne({
            where: { id }
        });
        return u ? u.toJSON() as Verification : undefined;
    }

    public async sendVerify(email: string) {
        const ids = crypto.randomUUID().split("-");
        const id = ids[Math.floor(Math.random() * ids.length)];

        const transport = Nodemailer.createTransport({
            // @ts-ignore
            host: config.smtpHost,
            port: config.smtpPort,
            tls: config.smtpTls,
            secure: true,
            auth: {
                user: config.smtpEmail,
                pass: config.smtpPassword
            }
        });

        await transport.sendMail({
            to: email,
            from: `PayBot Verification <${config.smtpEmail}>`,
            subject: "PayBot | Email verification code",
            html: `Hello, I'm from PayBot Verificator. This email has been registered via telegram, if this is not you. Please ignore this message, thank you.<br /><br />The verification code is: <b>${id}</b><br />Your verification will expire in 24 hours.`
        });
        return id;
    }

    public isExpireVerification(createdISODate: string) {
        const created = Date.parse(createdISODate);
        const oneDay = 24 * 60 * 60 * 1000;
        const now = +Date.now();

        if ((now - created) > oneDay) return true;
        else return false;
    }

    public async insert(id: number, email: string) {
        const U1 = await this.client.customer.getById(id);
        if (!U1 || (U1 && U1.verified)) return false;
        const U = await this.getById(id);
        if (U) return false;

        const code = await this.sendVerify(email);
        const object = {
            id,
            email: email,
            code
        };

        await this._verificationModel.create(object);
        return true;
    }

    public async verify(id: number, code: string) {
        const U1 = await this.client.customer.getById(id);
        if (!U1 || (U1 && U1.verified)) return false;
        const U = await this.getById(id);
        if (!U) return false;

        if (this.isExpireVerification(U.createdAt)) {
            await this._verificationModel.destroy({
                where: { id }
            });
            return null;
        } else {
            if (U.code != code) return false;
            await this._verificationModel.destroy({
                where: { id }
            });
            await this.client.customer._customerModel.update({
                verified: true
            }, {
                where: { id }
            });
            return true;
        }
    }
}