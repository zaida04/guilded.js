import Collection from "@discordjs/collection";
import { CacheCollection } from "@guildedjs/common";

export interface CacheStructure<K, V> {
    get: (key: K) => V | Promise<V>;
    set: (key: K, value: V) => void | Promise<void>;
    delete: (key: K) => void | Promise<void>;
}

export function inMemoryCacheBuilder<K, T>(_structName: string, _struct: T) {
    return new CacheCollection<K, T>();
}
