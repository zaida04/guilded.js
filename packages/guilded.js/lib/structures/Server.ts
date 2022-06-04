import type { Client } from "./Client";
import { Base } from "./Base";
import type { ServerPayload, ServerType as APIServerType } from "@guildedjs/guilded-api-typings";
import type { Channel } from "./channels";
import { buildMemberKey } from "../util";
import type { Member } from "./Member";

export class Server extends Base<ServerPayload> {
    /** The ID of the owner of this server */
    ownerId: string;
    /** The type of this server */
    type!: ServerType | null;
    /** The name of this server */
    name!: string;
    /** The URL this server is accessible from */
    url!: string;
    /** The description of this server */
    description!: string | null;
    /** The icon of this server */
    iconURL!: string | null;
    /** The banner of this server */
    bannerURL!: string | null;
    /** The timezone this server is in */
    timezone!: string | null;
    /** Whether this server is verified or not */
    isVerified!: boolean;
    /** The default channel of this server */
    defaultChannelId!: string;
    /** The date this server was created */
    createdAt!: Date;

    constructor(client: Client, data: ServerPayload) {
        super(client, data);
        this.ownerId = data.ownerId;
        this.createdAt = new Date(data.createdAt);
        this._update(data);
    }

    get fullUrl(): string {
        return `https://www.guilded.gg/${this.url}`;
    }

    get owner(): Member | null {
        return this.client.members.cache.get(buildMemberKey(this.id, this.ownerId)) ?? null;
    }

    get defaultChannel(): Channel | null {
        return this.defaultChannelId ? this.client.channels.cache.get(this.defaultChannelId) ?? null : null;
    }

    _update(data: Partial<ServerPayload>): this {
        if ("name" in data && typeof data.name !== "undefined") {
            this.name = data.name;
        }

        if ("type" in data && typeof data.type !== "undefined") {
            this.type = ServerTypeMap[data.type] ?? null;
        }

        if ("url" in data && typeof data.url !== "undefined") {
            this.url = data.url ?? null;
        }

        if ("about" in data && typeof data.about !== "undefined") {
            this.description = data.about ?? null;
        }

        if ("avatar" in data && typeof data.avatar !== "undefined") {
            this.iconURL = data.avatar ?? null;
        }

        if ("bannerURL" in data && typeof data.banner !== "undefined") {
            this.bannerURL = data.banner ?? null;
        }

        if ("timezone" in data && typeof data.timezone !== "undefined") {
            this.timezone = data.timezone ?? null;
        }

        if ("isVerified" in data && typeof data.isVerified !== "undefined") {
            this.isVerified = data.isVerified ?? false;
        }

        if ("defaultChannelId" in data && typeof data.defaultChannelId !== "undefined") {
            this.defaultChannelId = data.defaultChannelId ?? null;
        }
        return this;
    }
}

export enum ServerType {
    Team,
    Organization,
    Community,
    Clan,
    Guild,
    Friends,
    Streaming,
    Other,
}
export const ServerTypeMap: Record<APIServerType, ServerType> = {
    team: ServerType.Team,
    organization: ServerType.Organization,
    community: ServerType.Community,
    clan: ServerType.Clan,
    guild: ServerType.Guild,
    friends: ServerType.Friends,
    streaming: ServerType.Streaming,
    other: ServerType.Other,
};
