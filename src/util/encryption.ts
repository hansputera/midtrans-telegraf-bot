import * as crypto from "crypto";
import * as config from "../config";

const iv = crypto.randomBytes(36);

export default class Encryption {
    static aes256(text: string) {
        const cipher = crypto.createCipheriv("aes-256-gcm", config.encryptionKey, iv);
        return cipher.update(text, "utf-8", "hex") + cipher.final("hex");
    }

    static aes256_decrypt(hash: string) {
        const decipher = crypto.createDecipheriv("aes-256-gcm", config.encryptionKey, iv);
        return decipher.update(hash, "hex", "utf-8") + decipher.final("utf-8");
    }
}