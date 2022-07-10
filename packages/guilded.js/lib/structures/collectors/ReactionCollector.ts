import type { WSChannelMessageReactionCreatedPayload, WSChannelMessageReactionDeletedPayload } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { Collector } from "./Collector";

export class ReactionCollector extends Collector<Reaction["reaction"] & { id: string }> {
    hookEvents() {
        this.incrementMaxEventListeners();
        this.client.on(constants.clientEvents.MESSAGE_REACTION_CREATED, this.itemReceived.bind(this));
    }

    _cleanup(): void {
        this.decrementMaxEventListeners();
        this.client.removeListener(constants.clientEvents.MESSAGE_REACTION_CREATED, this.itemReceived);
    }
}

type Reaction = WSChannelMessageReactionCreatedPayload["d"];
