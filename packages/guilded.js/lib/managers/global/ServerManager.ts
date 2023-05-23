import { CacheableStructManager } from "./CacheableStructManager";
import { Server } from "../../structures/Server";

/**
 * A class representing a global server manager. You can retrieve servers from the .cache property
 * @extends CacheableStructManager
 */
export class GlobalServerManager extends CacheableStructManager<
  string,
  Server
> {
  /**
   * Determines whether or not servers should be cached.
   */
  get shouldCacheServer() {
    return this.client.options?.cache?.cacheServers !== false;
  }

  /**
   * Fetches a server.
   * @param serverId The ID of the server to fetch.
   * @param force Whether or not to force a fetch instead of using the cache.
   * @returns A Promise that resolves with the fetched server.
   * @example client.servers.fetch(message.serverId)
   */
  fetch(serverId: string, force?: boolean): Promise<Server> {
    if (!force) {
      const existingServer = this.client.servers.cache.get(serverId);
      if (existingServer) return Promise.resolve(existingServer);
    }

    return this.client.rest.router.servers
      .serverRead({ serverId })
      .then((data) => {
        const newServer = new Server(this.client, data.server);
        if (this.shouldCacheServer) this.cache.set(newServer.id, newServer);
        return newServer;
      });
  }
}
