import type { CalendarEventCancellationPayload, CalendarEventPayload, MentionsPayload } from "@guildedjs/guilded-api-typings";
import { Base } from "./Base";
import type { Client } from "./Client";
import type { User } from "./User";

export class CalendarEvent extends Base<CalendarEventPayload, number> {
    readonly id: number;
    readonly serverId: string;
    readonly channelId: string;
    name: string;
    description?: string;
    location?: string;
    url?: string;
    color?: number;
    startsAt: string;
    duration?: number;
    isPrivate?: boolean;
    mentions?: MentionsPayload;
    cancellation?: CalendarEventCancellationPayload;
    readonly _createdAt: number;
    readonly createdBy: string;

    constructor(client: Client, data: CalendarEventPayload) {
        super(client, data);

        this.id = data.id;
        this.serverId = data.serverId;
        this.name = data.name;
        this.startsAt = data.startsAt;
        this.channelId = data.channelId;
        this._createdAt = Date.parse(data.createdAt);
        this.createdBy = data.createdBy;

        this._update(data);
    }

    get author(): User | null {
        return this.client.users.cache.get(this.createdBy) ?? null;
    }

    get createdAt(): Date {
        return new Date(this._createdAt);
    }

    _update(data: Partial<CalendarEventPayload>): this {
        if ("name" in data && typeof data.name !== "undefined") {
            this.name = data.name;
        }

        if ("description" in data && typeof data.description !== "undefined") {
            this.description = data.description;
        }

        if ("url" in data && typeof data.url !== "undefined") {
            this.url = data.url;
        }

        if ("color" in data && typeof data.color !== "undefined") {
            this.color = data.color;
        }

        if ("startsAt" in data && typeof data.startsAt !== "undefined") {
            this.startsAt = data.startsAt;
        }

        if ("duration" in data && typeof data.duration !== "undefined") {
            this.duration = data.duration;
        }

        if ("isPrivate" in data && typeof data.isPrivate !== "undefined") {
            this.isPrivate = data.isPrivate;
        }

        if ("mentions" in data && typeof data.mentions !== "undefined") {
            this.mentions = data.mentions;
        }

        if ("cancellation" in data && typeof data.cancellation !== "undefined") {
            this.cancellation = data.cancellation;
        }

        return this;
    }
}
