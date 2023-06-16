import type { WSPacket } from "@guildedjs/api";
import { constants } from "../../constants";
import { Message } from "../../structures/Message";
import { GatewayEventHandler } from "./GatewayEventHandler";

export class MessageEventHandler extends GatewayEventHandler {
    async messageCreated(data: WSPacket<"ChatMessageCreated">): Promise<boolean> {
        // This is in the case that a REST request beats us to adding the message in the cache.
        const existingMessage = this.client.messages.cache.get(data.d.message.id);
        if (existingMessage) return this.client.emit(constants.clientEvents.MESSAGE_CREATED, existingMessage);

        if ((this.client.options.cache?.fetchMessageAuthorOnCreate ?? true) && data.d.serverId && data.d.message.createdBy && data.d.message.createdBy !== "Ann6LewA")
            await this.client.members.fetch(data.d.serverId, data.d.message.createdBy).catch(() => null);

        const newMessage = new Message(this.client, data.d.message);
        if (this.client.messages.shouldCacheMessage) this.client.messages.cache.set(newMessage.id, newMessage);

        return this.client.emit(constants.clientEvents.MESSAGE_CREATED, newMessage);
    }

    messageUpdated(data: WSPacket<"ChatMessageUpdated">): boolean {
        const getCachedMessage = this.client.messages.cache.get(data.d.message.id);
        if (!getCachedMessage) {
            const newMessage = new Message(this.client, data.d.message);
            return this.client.emit(constants.clientEvents.MESSAGE_UPDATED, newMessage, null);
        }

        const frozenOldMessage = Object.freeze(getCachedMessage._clone());
        getCachedMessage._update(data.d.message);

        return this.client.emit(constants.clientEvents.MESSAGE_UPDATED, getCachedMessage, frozenOldMessage);
    }

    messageDeleted(data: WSPacket<"ChatMessageDeleted">): boolean {
        this.client.messages.cache.get(data.d.message.id)?._update({ deletedAt: data.d.message.deletedAt });

        return this.client.emit(constants.clientEvents.MESSAGE_DELETED, {
            ...data.d.message,
            serverId: data.d.serverId,
        });
    }
}
