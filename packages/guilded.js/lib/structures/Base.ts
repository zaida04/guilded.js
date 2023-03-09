import type { Client } from "./Client";

/**
 * The base of all structures in this library. 
 * All structures that have an ID will extend this class.
 */
export class Base<T = { id: string }, R = string> {
    /** Identifier of this structrure */
    public id: R;
    /** Bare data of this structure */
    public raw: T;

    constructor(public readonly client: Client, data: { id: R } & T) {
        this.id = data.id;
        this.raw = data;
    }

    /**
     * Taken from https://github.com/discordjs/discord.js/blob/8e8d9b490a71de6cabe6f16375d7549a7c5c3737/src/structures/Base.js#L20
     * Licensed under the Apache License 2.0 <https://github.com/discordjs/discord.js/blob/8e8d9b490a71de6cabe6f16375d7549a7c5c3737/LICENSE>
     */
    public _clone(): this {
        return Object.assign(Object.create(this), this);
    }
}
