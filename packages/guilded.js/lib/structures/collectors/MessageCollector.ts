import { constants } from "../../constants";
import type { Message } from "../Message";
import { Collector } from "./Collector";

/**
 * A message collector that collects messages sent to a specific channel within a specified time frame.
 * It's recommended that you use client.messages.awaitMessages instead of instantiating this manually unless you know what you're doing.
 *
 * @extends Collector
 */
export class MessageCollector extends Collector<Message> {
	/**
	 * Binds to the client's message creation event and increments its max listener count by one.
	 */
	hookEvents(): void {
		this.incrementMaxEventListeners();
		this.client.on(
			constants
				.clientEvents
				.MESSAGE_CREATED,
			this
				.boundItemReceiver,
		);
	}

	/**
	 * Unbinds from the client's message creation event and decrements its max listener count by one.
	 */
	_cleanup(): void {
		this.decrementMaxEventListeners();
		this.client.removeListener(
			constants
				.clientEvents
				.MESSAGE_CREATED,
			this
				.boundItemReceiver,
		);
	}
}
