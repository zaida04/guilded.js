import { WSChatMessageCreatedPayload, WSChatMessageDeletedPayload, WSChatMessageUpdatedPayload } from "@guildedjs/guilded-api-typings";
import Message from "../../structures/Message";
import GatewayEventHandler from "./GatewayEventHandler";

export default class MessageEventHandler extends GatewayEventHandler {
    messageCreated(data: WSChatMessageCreatedPayload) {
        const newMessage = new Message(this.client, { ...data.d.message, serverId: data.d.serverId });
        return this.client.messages.cache.set(newMessage.id, newMessage);
    }
    messageUpdated(data: WSChatMessageUpdatedPayload) {
        const getCachedMessage = this.client.messages.cache.get(data.d.message.id);
        if(!getCachedMessage) {
            const newMessage = new Message(this.client, { ...data.d.message, serverId: data.d.serverId })
            return this.client.emit("messageUpdated", newMessage, null);
        }
        const frozenOldMessage = Object.freeze(getCachedMessage._clone());
        getCachedMessage._update(data.d.message);
        return this.client.emit("messageUpdated", getCachedMessage, frozenOldMessage);
    }
    messageDeleted(data: WSChatMessageDeletedPayload) {
        const getCachedMessage = this.client.messages.cache.get(data.d.message.id);
        getCachedMessage?._update({ deletedAt: data.d.message.deletedAt });
        return this.client.emit("messageDeleted", getCachedMessage || data.d);
    }
}
