import EventEmitter from "node:events";
import { Collection } from "@discordjs/collection";
import type TypedEmitter from "typed-emitter";
import type { MaybePromise } from "../../typings";
import type { Client } from "../Client";

/**
 * A collector is just a wrapper over a set of events for collecting a structure.
 * Commonly used for things like Message or MessageReaction collecting, collectors allow you
 * to have your code wait until further input from a user.
 */
export abstract class Collector<T extends CollectableStructure> {
	/** Collection of successfully collected entries */
	readonly entries = new Collection<T["id"], T>();

	/** Whether the collector is actively collecting elements */
	isActive = false;

	/** Method to resolve the promise this collector has when instantiated */
	protected resolve: ((value: CollectorReturnValue<T>) => void) | null = null;

	/** Timeout for max time */
	protected maxTimeout: NodeJS.Timeout | null = null;

	/** Bound function for item receiving */
	protected boundItemReceiver = this.itemReceived.bind(this);

	public emitter = new EventEmitter() as TypedEmitter<CollectorEvents<T>>;

	constructor(
		public readonly client: Client,
		public options: Partial<CollectorOptions<T>>,
	) {
		/** Check if timeLimit is specified */
		if (!options.timeLimit) throw new Error("You must specify a time limit in milliseconds for this collector.");
	}

	/**
	 * Start the collector
	 *
	 * @returns A promise that resolves with a `CollectorReturnValue` object
	 */
	start(): Promise<CollectorReturnValue<T>> {
		return new Promise((resolve) => {
			this.resolve = resolve;

			this.maxTimeout = setTimeout(() => {
				this.resolve?.({
					reason: CollectorEndReasons.TIME,
					entries: this.entries,
				});
				this._cleanup();
				this.isActive = false;
			}, this.options.timeLimit);

			this.hookEvents();
			this.isActive = true;
		});
	}

	/**
	 * Receives an item
	 *
	 * @param entry - The item received
	 * @returns Whether the item passes the filter function or not
	 */
	async itemReceived(entry: T): Promise<boolean> {
		const elementPassesFilter = (await this.options.filter?.(entry)) ?? true;
		if (elementPassesFilter) {
			this.entries.set(entry.id, entry);

			if (this.entries.size >= (this.options.max ?? Number.POSITIVE_INFINITY)) {
				clearTimeout(this.maxTimeout!);
				this.maxTimeout = null;
				this.resolve?.({
					reason: CollectorEndReasons.MAX,
					entries: this.entries,
				});
				this._cleanup();
				this.isActive = false;
			}

			this.emitter.emit("collect", entry);
			return true;
		}

		return false;
	}

	/**
	 * Increment the max number of event listeners for the client
	 *
	 * @returns The new max number of event listeners for the client
	 */
	protected incrementMaxEventListeners(): number {
		const incrementedAmount = this.client.getMaxListeners() + 1;
		this.client.setMaxListeners(incrementedAmount);
		return incrementedAmount;
	}

	/**
	 * Decrement the max number of event listeners for the client
	 *
	 * @returns The new max number of event listeners for the client
	 */
	protected decrementMaxEventListeners(): number {
		const decrementAmount = this.client.getMaxListeners() - 1;
		if (decrementAmount !== 0) {
			this.client.setMaxListeners(decrementAmount);
			return decrementAmount;
		}

		return 0;
	}

	/**
	 * Hook events to the collector
	 */
	abstract hookEvents(): void;

	/**
	 * Clean up the collector
	 */
	abstract _cleanup(): void;
}

/**
 * Reasons why a collector has ended
 */
export enum CollectorEndReasons {
	MAX = "MAX_AMOUNT",
	TIME = "TIME_EXPIRED",
}

/**
 * The value returned by a collector when it ends
 */
export type CollectorReturnValue<T extends CollectableStructure> = {
	reason: CollectorEndReasons;
	entries: Collection<T["id"], T>;
};

/**
 * The base structure of objects that can be collected by a collector
 */
type CollectableStructure = { id: string };

/** options for constructing a collector */
export type CollectorOptions<T> = {
	/** a function that determines whether an entry is collected or not */
	filter?(item: T): MaybePromise<boolean>;
	/** the max amount of time this collector run for before exiting (ms) */
	timeLimit: number;
	/** the max amount of entries allowed to be collected */
	max?: number;
};

/** events that collectors can emit */
export type CollectorEvents<T> = {
	collect(item: T): unknown;
};
