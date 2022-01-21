import { WSChatMessageCreatedPayload, WSChatMessageDeletedPayload, WSChatMessageUpdatedPayload } from "@guildedjs/guilded-api-typings";
import GatewayEventHandler from "./GatewayEventHandler";

export default class MessageEventHandler extends GatewayEventHandler {
    messageCreate(data: WSChatMessageCreatedPayload) {}
    messageUpdated(data: WSChatMessageUpdatedPayload) {}
    messageDelete(data: WSChatMessageDeletedPayload) {}
}