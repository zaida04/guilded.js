import type { Client } from "./Client";
import { Base } from "./Base";
import type { Channel } from "./channels";
import { buildMemberKey } from "../util";
import type { Member } from "./Member";
import {
	Schema,
	ServerType as APIServerType,
} from "@guildedjs/api";

/**
 * A class representing a Guilded server.
 */
export class Server extends Base<Schema<"Server">> {
	/** The ID of the owner of this server */
	ownerId: string;
	/** The type of this server */
	type!: ServerType | null;
	/** The name of this server */
	name!: string;
	/** The slug of the URL this server is accessible from */
	shortURL!: string;
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
	_createdAt!: number;

	constructor(client: Client, data: Schema<"Server">) {
		super(client, data);
		this.ownerId = data.ownerId;
		this._createdAt = Date.parse(data.createdAt);
		this._update(data);
	}

	/** The date when the server was created. */
	get createdAt(): Date {
		return new Date(this._createdAt);
	}

	/** The URL of the server. */
	get url(): string {
		return `https://www.guilded.gg/${this.shortURL}`;
	}

	/** The owner of the server. */
	get owner(): Member | null {
		return (
			this.client.members.cache.get(buildMemberKey(this.id, this.ownerId)) ??
			null
		);
	}

	/** The default channel of the server. */
	get defaultChannel(): Channel | null {
		return this.defaultChannelId
			? this.client.channels.cache.get(this.defaultChannelId) ?? null
			: null;
	}

	_update(data: Partial<Schema<"Server">>): this {
		if ("name" in data && typeof data.name !== "undefined") {
			this.name = data.name;
		}

		if ("type" in data && typeof data.type !== "undefined") {
			this.type = ServerTypeMap[data.type] ?? null;
		}

		if ("url" in data && typeof data.url !== "undefined") {
			this.shortURL = data.url ?? null;
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

		if (
			"defaultChannelId" in data &&
			typeof data.defaultChannelId !== "undefined"
		) {
			this.defaultChannelId = data.defaultChannelId ?? null;
		}
		return this;
	}
}

/** The type of a Guilded server. */
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

/** A mapping of server types from the API to the client. */
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
