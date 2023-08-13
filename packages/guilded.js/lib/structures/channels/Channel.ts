import type { Collection } from "@discordjs/collection";
import type { ChannelsService, ChatService, ServerChannelPayload } from "@guildedjs/api";
import type { MessageContent, OptionBody } from "../../typings";
import { Base } from "../Base";
import type { Client } from "../Client";
import type { Message } from "../Message";
import { parseToStamp } from "../../util";

/**
 * Represents a channel in a server on Guilded.
 */
export class Channel extends Base {
    /**
     * The type of the channel.
     */
    type: ChannelType;

    /**
     * The name of the channel.
     */
    name!: string;

    /**
     * The topic of the channel.
     */
    topic!: string | null;

    /**
     * The timestamp when the channel was created.
     */
    _createdAt: number;

    /**
     * The user ID of the user who created the channel.
     */
    createdBy: string;

    /**
     * The timestamp when the channel was last updated.
     */
    _updatedAt!: number | null;

    /**
     * The ID of the server that the channel belongs to.
     */
    serverId: string;

    /**
     * The ID of the parent channel.
     */
    parentId!: string | null;

    /**
     * The ID of the category that the channel belongs to.
     */
    categoryId!: number | null;

    /**
     * The ID of the group that the channel belongs to.
     */
    groupId: string;

    /**
     * Whether the channel is public.
     */
    isPublic!: boolean;

    /**
     * The user ID of the user who archived the channel.
     */
    archivedBy!: string | null;

    /**
     * The timestamp when the channel was archived.
     */
    _archivedAt!: number | null;

    constructor(client: Client, data: ServerChannelPayload & { deleted?: boolean }) {
        super(client, data);
        this.serverId = data.serverId;
        this.type = channelTypeToEnumMap[data.type];
        this._createdAt = parseToStamp(data.createdAt)!;
        this.createdBy = data.createdBy;
        this.groupId = data.groupId;

        this._update(data);
    }

    /**
     * The timestamp when the channel was created as a Date object.
     */
    get createdAt(): Date {
        return new Date(this._createdAt);
    }

    /**
     * The timestamp when the channel was archived as a Date object, or null if the channel is not archived.
     */
    get archivedAt(): Date | null {
        return this._archivedAt ? new Date(this._archivedAt) : null;
    }

    /**
     * The timestamp when the channel was last updated as a Date object, or null if the channel has not been updated.
     */
    get updatedAt(): Date | null {
        return this._updatedAt ? new Date(this._updatedAt) : null;
    }

    _update(data: Partial<ServerChannelPayload & { deleted?: boolean }>): this {
        if ("name" in data && typeof data.name !== "undefined") {
            this.name = data.name;
        }

        if ("topic" in data) {
            this.topic = data.topic ?? null;
        }

        if ("updatedAt" in data && typeof data.updatedAt !== "undefined") {
            this._updatedAt = data.updatedAt ? parseToStamp(data.updatedAt) : null;
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
            this._archivedAt = data.archivedAt ? parseToStamp(data.archivedAt) : null;
        }

        return this;
    }

    /**
     * Fetch from the latest 100 messages in the channel.
     *
     * @param options - Additional options for the message fetch.
     */
    fetchMessages(options?: OptionBody<ChatService["channelMessageReadMany"]>): Promise<Collection<string, Message>> {
        return this.client.messages.fetchMany(this.id, options ?? {});
    }

    /**
     * Fetch details for a specific message in the channel.
     *
     * @param messageId - The ID of the message to fetch.
     */
    fetchMessage(messageId: string): Promise<Message> {
        return this.client.messages.fetch(this.id, messageId);
    }

    /**
     * Update the channel with new data.
     *
     * @param options - The new data for the channel.
     */
    update(options: OptionBody<ChannelsService["channelUpdate"]>): Promise<Channel> {
        return this.client.channels.update(this.id, options);
    }

    /**
     * Delete the channel.
     */
    delete(): Promise<Channel | null> {
        return this.client.channels.delete(this.id);
    }

    /**
     * Send a message in the channel.
     *
     * @param content - The content of the message.
     * @example
     * let replyObj = {
     *  content: 'This is text, supports **markdown**.',
     *  embeds: [{
     *    title: 'This is an embed title!',
     *    description: 'A description may go here'
     *  }]
     * };
     * channel.send(replyObj)
     */
    send(content: MessageContent): Promise<Message> {
        return this.client.messages.send(this.id, content);
    }
}

/**
 * Enum for mapping channel types to an int for memory saving.
 */
export enum ChannelType {
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

/**
 * A map of API channel types to channel types.
 */
export const channelTypeToEnumMap: Record<ServerChannelPayload["type"], ChannelType> = {
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
