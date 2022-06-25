import type { WSChannelMessageReactionCreatedPayload, WSChannelMessageReactionDeletedPayload } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ReactionEventHandler extends GatewayEventHandler {
    messageReactionCreated(data: WSChannelMessageReactionCreatedPayload): boolean {
        return this.client.emit(constants.clientEvents.MESSAGE_REACTION_CREATED, data.d);
    }
    messageReactionDeleted(data: WSChannelMessageReactionDeletedPayload): boolean {
        return this.client.emit(constants.clientEvents.MESSAGE_REACTION_DELETED, data.d);
    }
}
