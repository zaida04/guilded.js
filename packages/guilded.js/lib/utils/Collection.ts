import BaseCollection from "@discordjs/collection";

export class Collection<K, V> extends BaseCollection<K, V> {
    /** The maximum number of items allowed in this cache. If you want to disable caching, simply set it to 0. If you want to make it unlimited, set it to undefined. */
    maxSize?: number;

    constructor(entries?: (readonly (readonly [K, V])[] | null) | Map<K, V>, options?: CollectionOptions<K, V>) {
        super(entries);

        this.maxSize = options?.maxSize;
    }

    set(key: K, value: V) {
        // When this collection is maxSized make sure we can add first
        if ((this.maxSize || this.maxSize === 0) && this.size >= this.maxSize) {
            return this;
        }

        return super.set(key, value);
    }
}

export interface CollectionOptions<K, V> {
    /** The maximum number of items allowed in this cache. If you want to disable caching, simply set it to 0. If you want to make it unlimited, set it to undefined. */
    maxSize?: number;
}
