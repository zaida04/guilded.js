import type { User } from "../../structures/User";
import CacheableStructManager from "./CacheableStructManager";

export default class GlobalUserManager extends CacheableStructManager<string, User> {}
