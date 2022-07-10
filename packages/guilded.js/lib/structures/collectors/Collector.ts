import Collection from "@discordjs/collection";
import type { MaybePromise } from "../../typings";
import type { Base } from "../Base";
import type { Client } from "../Client";

export abstract class Collector<T extends CollectableStructure> {
    /** successfully collected entries */
    readonly entries = new Collection<T["id"], T>();
    /** whether the collector is actively collecting elements */
    isActive = false;
    /** method to resolve the promise this collector has when instantiated */
    protected resolve: ((value: CollectorReturnValue<T>) => void) | null = null;
    /** timeout for max time */
    protected maxTimeout: NodeJS.Timeout | null = null;

    constructor(public readonly client: Client, public options: Partial<CollectorOptions<T>>) {}

    start(): Promise<CollectorReturnValue<T>> {
        return new Promise((resolve) => {
            this.resolve = resolve;
            this.maxTimeout = setTimeout(() => resolve({ reason: CollectorEndReasons.TIME, entries: this.entries }), this.options.timeLimit);
            this.hookEvents();
            this.isActive = true;
        });
    }

    async itemReceived(entry: T): Promise<boolean> {
        const elementPassesFilter = (await this.options.filter?.(entry)) ?? true;
        if (elementPassesFilter) {
            this.entries.set(entry.id, entry);

            if (this.entries.size >= (this.options.max ?? Infinity)) {
                clearTimeout(this.maxTimeout!);
                this.maxTimeout = null;
                this.resolve!({ reason: CollectorEndReasons.MAX, entries: this.entries });
                this._cleanup();
                this.isActive = false;
            }
            return true;
        }
        return false;
    }

    // https://github.com/discordjs/discord.js/blob/f0b68d57368d7ac3db97925df68c11a945ccd84c/packages/discord.js/src/client/BaseClient.js#L47
    protected incrementMaxEventListeners(): number {
        const incrementedAmount = this.emitter.getMaxListeners() + 1;
        this.emitter.setMaxListeners(incrementedAmount);
        return incrementedAmount;
    }

    // https://github.com/discordjs/discord.js/blob/f0b68d57368d7ac3db97925df68c11a945ccd84c/packages/discord.js/src/client/BaseClient.js#L58
    protected decrementMaxEventListeners(): number {
        const decrementAmount = this.emitter.getMaxListeners() - 1;
        if (decrementAmount !== 0) {
            this.emitter.setMaxListeners(decrementAmount);
            return decrementAmount;
        }
        return 0;
    }

    abstract hookEvents(): void;
    abstract _cleanup(): void;
}

export enum CollectorEndReasons {
    MAX = "MAX_AMOUNT",
    TIME = "TIME_EXPIRED",
}

type CollectorReturnValue<T extends CollectableStructure> = { reason: CollectorEndReasons; entries: Collection<T["id"], T> };
type CollectableStructure = { id: string };

export interface CollectorOptions<T> {
    /** a function that determines whether an entry is collected or not */
    filter?: (item: T) => MaybePromise<boolean>;
    /** the max amount of time this collector run for before exiting (ms) */
    timeLimit: number;
    /** the max amount of entries allowed to be collected */
    max?: number;
}
