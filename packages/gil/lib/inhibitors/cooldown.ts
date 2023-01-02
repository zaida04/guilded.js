import { Collection } from "@discordjs/collection";
import type { Message } from "guilded.js";
import type { Command } from "../structures/Command";
import { Inhibitor } from "../structures/Inhibitor";

export class CooldownInhibitor extends Inhibitor {
    name = "cooldown";

    /**
     * The collection of users that are in cooldown
     */
    membersInCooldown = new Collection<string, Cooldown>();

    async execute(message: Message, command: Command): Promise<boolean> {
        if (!command.cooldown) return false;

        const key = `${message.createdById}-${command.name}`;
        const cooldown = this.membersInCooldown.get(key);
        if (cooldown) {
            if (cooldown.used >= (command.cooldown.allowedUses || 1)) {
                const now = Date.now();
                if (cooldown.timestamp > now) {
                    await this.client.cooldownReached(message, command, {
                        now,
                        cooldown,
                    });
                    return true;
                }

                cooldown.used = 0;
            }

            this.membersInCooldown.set(key, {
                used: cooldown.used + 1,
                timestamp: Date.now() + command.cooldown.seconds * 1_000,
            });
            return false;
        }

        this.membersInCooldown.set(key, {
            used: 1,
            timestamp: Date.now() + command.cooldown.seconds * 1_000,
        });
        return false;
    }

    init(): void {
        // shut up eslint
    }
}

export type Cooldown = {
    /**
     * The timestamp when this command should be available to use again.
     */
    timestamp: number;
    /**
     * The amount of times a command was used.
     */
    used: number;
}

export default CooldownInhibitor;
