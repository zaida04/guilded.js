import { Collection } from "@discordjs/collection";

export type CacheStructure<K, V> = {
	get(key: K): Promise<V> | V;
	set(key: K, value: V): Promise<void> | void;
	delete(key: K): Promise<void> | void;
};

/**
 * A collection with a max cap size, which will remove a random element
 */
export class CacheCollection<K, V> extends Collection<K, V> {
	public maxSize: number;

	public constructor(
		options?: {
			maxSize?: number;
		},
		entries?: readonly (readonly [K, V])[] | null | undefined,
	) {
		super(entries);
		if (options?.maxSize !== undefined && options.maxSize < 1) {
			throw new TypeError("Cannot pass 0 or negative value as maxSize.");
		}

		this.maxSize = options?.maxSize ?? Number.POSITIVE_INFINITY;
	}

	public set(...args: Parameters<(typeof Collection.prototype)["set"]>): this {
		if (this.size >= this.maxSize) this.delete(this.firstKey()!);
		return super.set(...args);
	}
}

export function inMemoryCacheBuilder<K, T>(_structName: string, _struct: T): CacheCollection<K, T> {
	return new CacheCollection<K, T>();
}
