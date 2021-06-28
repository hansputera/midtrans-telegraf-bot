import * as crypto from "crypto";
import * as config from "../config";

const iv = crypto.randomBytes(16);

export default class Encryption {
    static aes256(text: string) {
        const cipher = crypto.createCipheriv("aes-256-ctr", config.encryptionKey, iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return encrypted.toString("hex");
    }

    static aes256_decrypt(hash: string) {
        const encrypted = Buffer.from(hash, "hex");
        const decipher = crypto.createDecipheriv("aes-256-ctr", config.encryptionKey, iv);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString();
    }
}