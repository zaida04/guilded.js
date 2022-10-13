import type { ForumTopicPayload, MentionsPayload } from "@guildedjs/guilded-api-typings";
import { Base } from "./Base";
import type { Client } from "./Client";

export class ForumTopic extends Base<ForumTopicPayload, number> {
    readonly serverId: string;
    readonly channelId: string;
    title!: string;
    readonly _createdAt: number;
    readonly createdBy: string;
    readonly createdByWebhookId: string | null;
    _updatedAt!: number | null;
    _bumpedAt!: number | null;
    _deletedAt: number | null;
    isPinned: boolean;
    isLocked: boolean;
    content!: string;
    mentions!: MentionsPayload

    constructor(client: Client, data: ForumTopicPayload) {
        super(client, data);
        this.serverId = data.serverId;
        this.channelId = data.channelId;
        this._createdAt = Date.parse(data.createdAt);
        this.createdByWebhookId = data.createdByWebhookId ?? null;
        this.createdBy = data.createdBy;
        this.isPinned = false;
        this.isLocked = false;
        this._deletedAt = null;

        this._update(data);
    }

    get createdAt(): Date {
        return new Date(this._createdAt);
    }

    get deletedAt(): Date | null {
        return this._deletedAt ? new Date(this._deletedAt) : null;
    }

    get updatedAt(): Date | null {
        return this._updatedAt ? new Date(this._updatedAt) : null;
    }

    get bumpedAt(): Date | null {
        return this._bumpedAt ? new Date(this._bumpedAt) : null;
    }

    _update(data: Partial<ForumTopicPayload & { _deletedAt?: Date }>) {
        if ("updatedAt" in data && typeof data.updatedAt !== "undefined") {
            this._updatedAt = data.updatedAt ? Date.parse(data.updatedAt) : null;
        }

        if ("_deletedAt" in data && typeof data._deletedAt !== "undefined") {
            this._deletedAt = data._deletedAt.getTime();
        }

        if ("bumpedAt" in data && typeof data.bumpedAt !== "undefined") {
            this._bumpedAt = data.bumpedAt ? Date.parse(data.bumpedAt) : null;
        }
        
        if ("isPinned" in data && typeof data.isPinned !== "undefined") {
            this.isPinned = data.isPinned;
        }

        if ("isLocked" in data && typeof data.isLocked !== "undefined") {
            this.isLocked = data.isLocked;
        }

        if ("title" in data && typeof data.title !== "undefined") {
            this.title = data.title;
        }

        if ("content" in data && typeof data.content !== "undefined") {
            this.content = data.content;
        }

        if ("mentions" in data && typeof data.mentions !== "undefined") {
            this.mentions = data.mentions;
        }
    }
}