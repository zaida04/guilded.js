import Collection from "@discordjs/collection";
import type { Message } from "guilded.js";

import type { Command } from "../structures/Command";
import { Inhibitor } from "../structures/Inhibitor";

export class CooldownInhibitor extends Inhibitor {
    name = "cooldown";

    /** The collection of users that are in cooldown */
    membersInCooldown = new Collection<string, Cooldown>();

    async execute(message: Message, command: Command): Promise<boolean> {
        if (!command.cooldown) return false;

        const key = `${message.createdById}-${command.name}`;
        const cooldown = this.membersInCooldown.get(key);
        if (cooldown) {
            if (cooldown.used >= (command.cooldown.allowedUses || 1)) {
                const now = Date.now();
                if (cooldown.timestamp > now) {
                    await this.client.messages.send(message.channelId, {
                        content: `You must wait **${this.client.humanizeMilliseconds(cooldown.timestamp - now)}** before using this command again.`,
                        replyMessageIds: [message.id],
                    });
                    return true;
                }
                cooldown.used = 0;
            }

            this.membersInCooldown.set(key, {
                used: cooldown.used + 1,
                timestamp: Date.now() + command.cooldown.seconds * 1000,
            });
            return false;
        }

        this.membersInCooldown.set(key, {
            used: 1,
            timestamp: Date.now() + command.cooldown.seconds * 1000,
        });
        return false;
    }

    init(): void {
        // shut up eslint
    }
}

export interface Cooldown {
    used: number;
    timestamp: number;
}

export default CooldownInhibitor;
