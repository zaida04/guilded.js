import type { WSPacket } from "@guildedjs/api";
import { constants } from "../../constants";
import { MessageReaction } from "../../structures";
import { buildMessageReactionKey } from "../../util";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class ReactionEventHandler extends GatewayEventHandler {
	messageReactionCreated(data: WSPacket<"ChannelMessageReactionCreated">): boolean {
		const {
			d: { reaction, serverId },
		} = data;

		const newReaction = new MessageReaction(this.client, {
			...reaction,
			serverId,
		});
		if (this.client.reactions.shouldCacheReaction) this.client.reactions.cache.set(buildMessageReactionKey(reaction.messageId, reaction.createdBy, reaction.emote.id), newReaction);
		return this.client.emit(constants.clientEvents.MESSAGE_REACTION_CREATED, newReaction);
	}

	messageReactionDeleted(data: WSPacket<"ChannelMessageReactionDeleted">): boolean {
		const {
			d: { reaction, serverId },
		} = data;

		if (this.client.reactions.shouldCacheReaction) this.client.reactions.cache.delete(buildMessageReactionKey(reaction.messageId, reaction.createdBy, reaction.emote.id));
		return this.client.emit(constants.clientEvents.MESSAGE_REACTION_DELETED, {
			...reaction,
			serverId,
		});
	}
}
