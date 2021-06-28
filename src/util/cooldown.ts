import * as config from "../config";

// Mapping
const cooldowns: Map<string, Map<number, number>> = new Map();
const cooldownSend: Map<number, boolean> = new Map();

export default function CooldownManage(id: number, cooldown: number, commandName: string) {
    if (config.OWNERS_ID.includes(id)) return undefined;
    else {
        if (!cooldowns.has(commandName)) cooldowns.set(commandName, new Map());
        const now = Date.now();
        const timestamps = cooldowns.get(commandName);
        if (!timestamps.has(id)) {
            timestamps.set(id, now);
        } else {
            const expirationTime = timestamps.get(id) + cooldown;
            if (now < expirationTime && !cooldownSend.has(id)) {
                const timeLeft = (expirationTime - now) / 1000;
                cooldownSend.set(id, true);
                return { timeLeft };
            }
            timestamps.set(id, now);
            setTimeout(() => {
                timestamps.delete(id);
                cooldownSend.delete(id);
            }, cooldown);
        }
    }
}