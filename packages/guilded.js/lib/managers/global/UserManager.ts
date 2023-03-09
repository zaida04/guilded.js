import type { User } from "../../structures/User";
import { CacheableStructManager } from "./CacheableStructManager";

/**
 * A manager for interacting with users. You can retrieve users from the .cache property.
 * At this point in time, Users cache population is heavily reliant on the Member cache.
 * @extends CacheableStructManager
 */
export class GlobalUserManager extends CacheableStructManager<string, User> {}
