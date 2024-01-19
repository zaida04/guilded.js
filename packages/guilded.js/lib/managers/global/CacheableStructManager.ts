import { Collection } from "@discordjs/collection";
import type { Client } from "../../structures/Client";
import { GlobalManager } from "./GlobalManager";

/**
 * This represents any manager that can cache structures locally.
 * The cache is a KV store with K usually being a string and V being an object.
 *
 * @template K Type of the key of the cache
 * @template V Type of the value of the cache
 * @extends GlobalManager
 */
export class CacheableStructManager<K, V> extends GlobalManager {
	cache =
		new Collection<
			K,
			V
		>();
}
