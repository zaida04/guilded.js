import { WSChatMessageCreatedPayload, WSChatMessageDeletedPayload, WSChatMessageUpdatedPayload } from "@guildedjs/guilded-api-typings";
import GatewayEventHandler from "./GatewayEventHandler";

export default class MessageEventHandler extends GatewayEventHandler {
    messageCreated(data: WSChatMessageCreatedPayload) {}
    messageUpdated(data: WSChatMessageUpdatedPayload) {}
    messageDeleted(data: WSChatMessageDeletedPayload) {}
}
