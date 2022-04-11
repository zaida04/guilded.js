import type { WSChatMessageCreatedPayload, WSChatMessageDeletedPayload, WSChatMessageUpdatedPayload } from "@guildedjs/guilded-api-typings";
import { constants } from "../../constants";
import { Message } from "../../structures/Message";
import GatewayEventHandler from "./GatewayEventHandler";

export default class MessageEventHandler extends GatewayEventHandler {
    messageCreated(data: WSChatMessageCreatedPayload): boolean {
        // This is in the case that a REST request beats us to adding the message in the cache.
        const existingMessage = this.client.messages.cache.get(data.d.message.id);
        if (existingMessage) return this.client.emit(constants.clientEvents.MESSAGE_CREATED, existingMessage);

        const newMessage = new Message(this.client, data.d.message);
        this.client.messages.cache.set(newMessage.id, newMessage);
        return this.client.emit(constants.clientEvents.MESSAGE_CREATED, newMessage);
    }
    messageUpdated(data: WSChatMessageUpdatedPayload): boolean {
        const getCachedMessage = this.client.messages.cache.get(data.d.message.id);
        if (!getCachedMessage) {
            const newMessage = new Message(this.client, data.d.message);
            return this.client.emit(constants.clientEvents.MESSAGE_UPDATED, newMessage, null);
        }
        const frozenOldMessage = Object.freeze(getCachedMessage._clone());
        getCachedMessage._update(data.d.message);
        return this.client.emit(constants.clientEvents.MESSAGE_UPDATED, getCachedMessage, frozenOldMessage);
    }
    messageDeleted(data: WSChatMessageDeletedPayload): boolean {
        const getCachedMessage = this.client.messages.cache.get(data.d.message.id);
        getCachedMessage?._update({ deletedAt: data.d.message.deletedAt });
        return this.client.emit(constants.clientEvents.MESSAGE_DELETED, getCachedMessage || data.d);
    }
}
