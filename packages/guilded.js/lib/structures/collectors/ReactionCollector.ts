import { WSPayload } from "@guildedjs/api";
import { constants } from "../../constants";
import { Collector } from "./Collector";

/**
 * A collector that collects reactions on messages
 */
export class ReactionCollector extends Collector<
	Reaction["reaction"] & { id: string }
> {
	/**
	 * Hooks the necessary events to start collecting reactions
	 */
	hookEvents() {
		this.incrementMaxEventListeners();
		this.client.on(
			constants.clientEvents.MESSAGE_REACTION_CREATED,
			this.boundItemReceiver
		);
	}

	/**
	 * Cleans up events and listeners after the collector has stopped collecting
	 */
	_cleanup(): void {
		this.decrementMaxEventListeners();
		this.client.removeListener(
			constants.clientEvents.MESSAGE_REACTION_CREATED,
			this.boundItemReceiver
		);
	}
}

/**
 * Represents a reaction to a message
 */
type Reaction = WSPayload<"ChannelMessageReactionCreated">;
