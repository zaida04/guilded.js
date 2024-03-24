import { Collection } from "@discordjs/collection";
import glob from "fast-glob";
import { ClientEvents } from "guilded.js";
import { GilClient } from "../GilClient";
import { Manager } from "./Manager";

type EventHandlerParameters<T> = T extends (...args: infer P) => unknown ? P : never;
interface ListenerOptions {
	event: keyof ClientEvents;
}
export abstract class Listener<E extends keyof ClientEvents> {
	public constructor(
		public readonly gil: GilClient,
		public readonly options: ListenerOptions,
	) {}

	public abstract execute(...args: EventHandlerParameters<ClientEvents[E]>): unknown | Promise<unknown>;
}

export class ListenerManager extends Manager {
	public listeners = new Collection<string, Listener<keyof ClientEvents>>();

	public async init(): Promise<void> {
		if (!this.gil.options.listenerDirectory) {
			this.gil.logger.warn("No listener directory provided, skipping listener initialization.");
			return;
		}

		this.gil.logger.info("Loading listeners...");
		const files = await glob(`${this.gil.options.listenerDirectory}/**/*`, {
			dot: true,
			absolute: true,
			concurrency: 10,
		});
		if (!files.length) return this.gil.logger.warn("Despite providing a listener directory, no listeners were found.");

		for (const file of files) {
			const imported = await import(file);
			if (!imported.default) {
				this.gil.logger.warn(`Listener file ${file} does not export a default export.`);
				continue;
			}

			const createdListener: Listener<keyof ClientEvents> = new imported.default(this.gil);
			this.gil.logger.info(`Listener ${createdListener.options.event} loaded.`);
			this.listeners.set(createdListener.options.event, createdListener);
		}

		for (const listener of this.listeners.values()) {
			this.gil.client.on(listener.options.event, listener.execute.bind(listener));
		}
	}
}
