import type { WSChannelMessageReactionCreatedPayload, WSChannelMessageReactionDeletedPayload } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { buildMessageReactionKey } from "../../util";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ReactionEventHandler extends GatewayEventHandler {
    messageReactionCreated(data: WSChannelMessageReactionCreatedPayload): boolean {
        if (this.client.reactions.shouldCacheReaction)
            this.client.reactions.cache.set(buildMessageReactionKey(data.d.reaction.messageId, data.d.reaction.createdBy, data.d.reaction.emote.id), {
                ...data.d.reaction.emote,
                channelId: data.d.reaction.channelId,
                serverId: data.d.serverId,
                createdBy: data.d.reaction.createdBy,
                messageId: data.d.reaction.messageId,
            });
        return this.client.emit(constants.clientEvents.MESSAGE_REACTION_CREATED, data.d);
    }
    messageReactionDeleted(data: WSChannelMessageReactionDeletedPayload): boolean {
        if (this.client.reactions.shouldCacheReaction)
            this.client.reactions.cache.delete(
                buildMessageReactionKey(data.d.reaction.messageId, data.d.reaction.createdBy, data.d.reaction.emote.id),
            );
        return this.client.emit(constants.clientEvents.MESSAGE_REACTION_DELETED, data.d);
    }
}
