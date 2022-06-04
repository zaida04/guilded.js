import { CacheableStructManager } from "./CacheableStructManager";
import { Server } from "../../structures/Server";

export class GlobalServerManager extends CacheableStructManager<string, Server> {
    get shouldCacheServer() {
        return this.client.options?.cache?.cacheServers !== false;
    }

    fetch(serverId: string, force?: boolean): Promise<Server> {
        if (!force) {
            const existingServer = this.client.servers.cache.get(serverId);
            if (existingServer) return Promise.resolve(existingServer);
        }
        return this.client.rest.router.getServer(serverId).then((data) => {
            const newServer = new Server(this.client, data.server);
            if (this.shouldCacheServer) this.cache.set(newServer.id, newServer);
            return newServer;
        });
    }
}
