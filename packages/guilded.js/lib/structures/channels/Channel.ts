import type Collection from "@discordjs/collection";
import type { RESTGetChannelMessagesQuery, RESTPostChannelMessagesBody, ServerChannelPayload } from "@guildedjs/guilded-api-typings";
import { Base } from "../Base";
import type { Client } from "../Client";
import type { Message } from "../Message";
import type { ChannelType as APIChannelType } from "@guildedjs/guilded-api-typings";

export class Channel extends Base {
    type: ChannelType;
    name!: string;
    topic!: string | null;
    createdAt: Date;
    createdBy: string;
    updatedAt!: Date | null;
    serverId: string;
    parentId!: string | null;
    categoryId!: string | null;
    groupId: string;
    isPublic!: boolean;
    archivedBy!: string | null;
    archivedAt!: Date | null;

    constructor(client: Client, data: ServerChannelPayload & { deleted?: boolean }) {
        super(client, data);
        this.serverId = data.serverId;
        this.type = channelTypeToEnumMap[data.type];
        this.createdAt = new Date(data.createdAt);
        this.createdBy = data.createdBy;
        this.groupId = data.groupId;

        this._update(data);
    }

    _update(data: Partial<ServerChannelPayload & { deleted?: boolean }>): this {
        if ("name" in data && typeof data.name !== "undefined") {
            this.name = data.name;
        }

        if ("topic" in data) {
            this.topic = data.topic ?? null;
        }

        if ("updatedAt" in data && typeof data.updatedAt !== "undefined") {
            this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        }

        if ("parentId" in data && typeof data.updatedAt !== "undefined") {
            this.parentId = data.parentId ?? null;
        }

        if ("categoryId" in data && typeof data.categoryId !== "undefined") {
            this.categoryId = data.categoryId ?? null;
        }

        if ("isPublic" in data && typeof data.isPublic !== "undefined") {
            this.isPublic = data.isPublic ?? false;
        }

        if ("archivedBy" in data && typeof data.archivedBy !== "undefined") {
            this.archivedBy = data.archivedBy ?? null;
        }

        if ("archivedAt" in data && typeof data.archivedAt !== "undefined") {
            this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null;
        }

        return this;
    }

    /** Get a list of the latest 100 messages from a channel. */
    fetchMessages(options?: RESTGetChannelMessagesQuery): Promise<Collection<string, Message>> {
        return this.client.messages.fetchMany(this.id, options ?? {});
    }

    /** Get details for a specific chat message from a chat channel. */
    fetchMessage(messageId: string): Promise<Message> {
        return this.client.messages.fetch(this.id, messageId);
    }

    /** Delete this channel. */
    delete() {
        return this.client.channels.delete(this.id);
    }

    /** Send a chat message in the channel. */
    send(content: RESTPostChannelMessagesBody | string) {
        return this.client.messages.send(this.id, content);
    }
}

enum ChannelType {
    Announcements,
    Chat,
    Calendar,
    Forums,
    Media,
    Docs,
    Voice,
    List,
    Scheduling,
    Stream,
}
const channelTypeToEnumMap: Record<APIChannelType, ChannelType> = {
    announcements: ChannelType.Announcements,
    chat: ChannelType.Chat,
    calendar: ChannelType.Calendar,
    forums: ChannelType.Forums,
    media: ChannelType.Media,
    docs: ChannelType.Docs,
    voice: ChannelType.Voice,
    list: ChannelType.List,
    scheduling: ChannelType.Scheduling,
    stream: ChannelType.Stream,
};
