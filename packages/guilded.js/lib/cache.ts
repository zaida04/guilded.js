import Collection from "@discordjs/collection";

export interface CacheStructure<K, V> {
    get: (key: K) => V | Promise<V>;
    set: (key: K, value: V) => void | Promise<void>;
    delete: (key: K) => void | Promise<void>;
}

/**
 * A collection with a max cap size, which will remove a random element
 */
export class CacheCollection<K, V> extends Collection<K, V> {
    public maxSize: number;

    public constructor(options?: { maxSize?: number }, entries?: readonly (readonly [K, V])[] | null | undefined) {
        super(entries);
        if (options?.maxSize !== undefined && options.maxSize < 1) {
            throw new TypeError("Cannot pass 0 or negative value as maxSize.");
        }
        this.maxSize = options?.maxSize ?? Infinity;
    }

    public set(...args: Parameters<typeof Collection.prototype["set"]>): this {
        if (this.size >= this.maxSize) this.delete(this.firstKey()!);
        return super.set(...args);
    }
}

export function inMemoryCacheBuilder<K, T>(_structName: string, _struct: T) {
    return new CacheCollection<K, T>();
}
