import type { User } from "../../structures/User";
import { CacheableStructManager } from "./CacheableStructManager";

export class GlobalUserManager extends CacheableStructManager<string, User> {}
