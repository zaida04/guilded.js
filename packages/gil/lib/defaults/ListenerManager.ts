import { Collection } from "@discordjs/collection";
import { glob } from "fast-glob";
import { ClientEvents } from "guilded.js";
import { Listener } from "../structures/Listener";
import { Manager } from "../structures/Manager";

import { GilEvents } from "../GilClient";
import MessageListener from "./MessageListener";
import ReadyListener from "./ReadyListener";

export class ListenerManager extends Manager {
	public listeners = new Collection<string, Listener<string>>();

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

		if (!files.length) this.gil.logger.warn("Despite providing a listener directory, no listeners were found.");
		else {
			for (const file of files) {
				const imported = await import(file);
				if (!imported.default) {
					this.gil.logger.warn(`Listener file ${file} does not export a default export.`);
					continue;
				}

				const createdListener: Listener<keyof ClientEvents | keyof GilEvents> = new imported.default(this.gil);
				this.gil.logger.info(`Listener ${createdListener.options.event} loaded.`);
				this.listeners.set(createdListener.options.event, createdListener);
			}
		}
		this.listeners.set("ready", new ReadyListener(this.gil));
		this.listeners.set("messageCreated", new MessageListener(this.gil));

		for (const listener of this.listeners.values()) {
			if (listener.options.emitter === "gjs") {
				this.gil.client.on(listener.options.event as keyof ClientEvents, listener.execute.bind(listener, { gil: this.gil }));
			} else {
				this.gil.emitter.on(listener.options.event as keyof GilEvents, listener.execute.bind(listener, { gil: this.gil }));
			}
		}
	}
}
