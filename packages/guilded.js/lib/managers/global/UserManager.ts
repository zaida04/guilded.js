import { Collection } from "@discordjs/collection";
import { Server } from "../../structures/Server";
import { User } from "../../structures/User";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * A manager for interacting with users. You can retrieve users from the .cache property.
 * At this point in time, Users cache population is heavily reliant on the Member cache.
 *
 * @extends CacheableStructManager
 */
export class GlobalUserManager extends CacheableStructManager<string, User> {
    /**
     * Fetches client user.
     *
     * @param force Whether to force a fetch from the API.
     * @returns A Promise that resolves with the fetched user.
     */
    async fetchClient(force?: boolean): Promise<User> {
        if (!force) {
            const existingUser = this.client.users.cache.get(this.client.user!.id);
            if (existingUser) return existingUser;
        }

        const data = await this.client.rest.router.users.userRead({
            userId: "@me",
        });
        return new User(this.client, data.user);
    }

    /**
     * Fetches a user's servers (atm, only the logged in client is supported)
     *
     * @param userId The ID of the user to fetch servers for.
     * @returns A promise that resolves to a Collection with the returned servers.
     */
    async fetchServers(userId: string): Promise<Collection<string, Server>> {
        if (userId !== this.client.user!.id) throw new Error("Only the logged in client is supported at this time.");

        const data = await this.client.rest.router.users.userServerReadMany({
            userId,
        });
        const servers = new Collection<string, Server>();

        for (const server of data.servers) {
            const createdServer = new Server(this.client, server);
            servers.set(server.id, createdServer);
            this.client.servers.cache.set(server.id, createdServer);
        }

        return servers;
    }
}
