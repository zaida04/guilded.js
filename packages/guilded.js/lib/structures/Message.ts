import type { ChatMessagePayload } from "@guildedjs/guilded-api-typings";
import Client from "../Client";
import Base from "./Base";

export enum MessageType {
    Default,
    System,
}

export default class Message extends Base<ChatMessagePayload> {
    /** The id of the message. */
    id: string;
    /** The ID of the channel */
    channelId: string;
    /** The type of chat message. "system" messages are generated by Guilded, while "default" messages are user or bot-generated. */
    type = MessageType.Default;
    /** The content of the message */
    content: string | null;
    /** The ID of the messages that this is replying to. */
    replyMessageIds: string[] = [];
    /** If set, this message will only be seen by those mentioned or replied to. */
    isPrivate = false;
    /** The ID of the user who created this message (Note: If this event has createdByBotId or createdByWebhookId present, this field will still be populated, but can be ignored. In these cases, the value of this field will always be Ann6LewA) */
    createdBy: string;
    /** The ID of the bot who created this message, if it was created by a bot */
    createdByBotId: string | null;
    /** The ID of the webhook who created this message, if it was created by a webhook */
    createdByWebhookId: string | null;
    /** The timestamp that the message was created at. */
    createdAt: number;
    /** The timestamp that the message was updated at, if relevant */
    updatedAt: number | null;

    constructor(client: Client, data: ChatMessagePayload & { serverId: string | null }) {
        super(client, data);

        this.id = data.id;
        this.channelId = data.channelId;
        this.content = data.content ?? null;
        this.replyMessageIds = data.replyMessageIds ?? [];
        this.createdBy = data.createdBy;
        this.createdByBotId = data.createdByBotId ?? null;
        this.createdByWebhookId = data.createdByWebhookId ?? null;
        this.createdAt = Date.parse(data.createdAt);
        this.updatedAt = null;
        if (data.isPrivate) this.isPrivate = data.isPrivate;
        if (data.type === "system") this.type = MessageType.System;

        this._update(data);
    }

    /** Update details of this structure */
    _update(data: Partial<ChatMessagePayload>) {
        if ("content" in data && typeof data.content !== "undefined") {
            this.content = data.content;
        }

        if ("updatedAt" in data) {
            this.updatedAt = data.updatedAt ? Date.parse(data.updatedAt) : null;
        }

        return this;
    }

    /* Update message content */
    update(newContent: string) {
        return this.client.messages.updateMessage(this.channelId, this.id, newContent).then((x) => {
            return this._update(x.message);
        });
    }
}
