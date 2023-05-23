import { User } from "../../structures/User";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * A manager for interacting with users. You can retrieve users from the .cache property.
 * At this point in time, Users cache population is heavily reliant on the Member cache.
 * @extends CacheableStructManager
 */
export class GlobalUserManager extends CacheableStructManager<string, User> {
  /**
   * Fetches client user.
   * @param force Whether to force a fetch from the API.
   * @returns A Promise that resolves with the fetched user.
   */
  fetchClient(force?: boolean): Promise<User> {
    if (!force) {
      const existingUser = this.client.users.cache.get(this.client.user!.id);
      if (existingUser) return Promise.resolve(existingUser);
    }

    return this.client.rest.router.users
      .userRead({ userId: "@me" })
      .then((data) => new User(this.client, data.user));
  }
}
