import { RestManager } from "@guildedjs/rest";
import { WebSocketManager } from "@guildedjs/ws";
import { EventEmitter } from "node:events";
import { ClientGatewayHandler } from "../gateway/ClientGatewayHandler";
import { GlobalChannelManager } from "../managers/global/ChannelManager";
import { GlobalDocManager } from "../managers/global/DocManager";
import { GlobalForumTopicManager } from "../managers/global/ForumManager";
import { GlobalGroupManager } from "../managers/global/GroupManager";
import { GlobalListItemManager } from "../managers/global/ListManager";
import { GlobalMemberManager } from "../managers/global/MemberManager";
import { GlobalMessageManager } from "../managers/global/MessageManager";
import { GlobalRoleManager } from "../managers/global/RoleManager";
import { GlobalUserManager } from "../managers/global/UserManager";
import { GlobalGuildBanManager } from "../managers/global/GuildBanManager";
import { GlobalCalendarManager } from "../managers/global/CalendarManager";
import type TypedEmitter from "typed-emitter";
import type { CacheStructure } from "../cache";
import { GlobalWebhookManager } from "../managers/global/WebhookManager";
import { ClientUser } from "./User";
import { GlobalServerManager } from "../managers/global/ServerManager";
import { GlobalReactionManager } from "../managers/global/ReactionManager";
import type { ClientEvents } from "../typings";

export class Client extends (EventEmitter as unknown as new () => TypedEmitter<ClientEvents>) {
	/** The time in milliseconds since the Client connected */
	readyTimestamp: number | null = null;

	/** The manager for the bot to make requests to the REST api. */
	rest = new RestManager({
		...this.options.rest,
		token: this.options.token,
	});

	/** The websocket connection */
	ws = new WebSocketManager({ token: this.options.token });

	/** The gateway event handlers will be processed by this manager. */
	gatewayHandler = new ClientGatewayHandler(this);

	/** Managers for structures */
	channels = new GlobalChannelManager(this);
	docs = new GlobalDocManager(this);
	topics = new GlobalForumTopicManager(this);
	groups = new GlobalGroupManager(this);
	lists = new GlobalListItemManager(this);
	members = new GlobalMemberManager(this);
	messages = new GlobalMessageManager(this);
	roles = new GlobalRoleManager(this);
	users = new GlobalUserManager(this);
	bans = new GlobalGuildBanManager(this);
	webhooks = new GlobalWebhookManager(this);
	servers = new GlobalServerManager(this);
	reactions = new GlobalReactionManager(this);
	calendars = new GlobalCalendarManager(this);

	/** The user belonging to this bot */
	user: ClientUser | null = null;

	constructor(public options: ClientOptions) {
		if (typeof options !== "object") throw new Error("Must provide options in client constructor in the form of an object.");
		if (typeof options?.token === "undefined") throw new Error("No token provided.");
		super();
	}

	/** The amount of time the bot has been online in milliseconds. */
	get uptime(): number {
		return this.readyTimestamp ? Date.now() - this.readyTimestamp : 0;
	}

	/** The bot's token. */
	get token(): string {
		return this.options.token;
	}

	/** Connects the bot to the api. */
	login(opts?: { fresh?: boolean }): void {
		if (opts?.fresh) this.ws = new WebSocketManager({ token: this.options.token });
		this.ws.emitter
			.on("error", (reason, err) => this.emit("error", `[WS] ${reason}`, err))
			.on("ready", (user) => {
				this.user = new ClientUser(this, user);
				this.readyTimestamp = Date.now();
				this.emit("ready");
			})
			.on("gatewayEvent", (event, data) => this.gatewayHandler.handleWSMessage(event, data))
			.on("debug", (data) => this.emit("debug", data))
			.on("exit", () => this.emit("exit"));
		this.ws.connect();
	}

	/** Disconnects the bot. */
	disconnect(): void {
		if (!this.ws.isAlive) throw new Error("There is no active connection to disconnect.");
		this.ws.emitter.removeAllListeners();
		this.ws.destroy();
		this.emit("exit");
	}
}

interface ClientOptions {
	/** The bot's token */
	token: string;
	/** The RestManager options */
	rest?: {
		/** The version of the API to be used for making requests. By default, this will use the latest version that the library supports. */
		version?: 1;
		/** The base url of the API you want to send requests to. By default, this will send it to guilded's rest API. This is meant for big bot developers who want to use a proxy rest system. */
		proxyURL?: string;
	};
	cache?: {
		structureBuilder?: <K, V>() => CacheStructure<K, V>;
		fetchMessageAuthorOnCreate?: boolean;
		removeMemberOnLeave?: boolean;
		removeMemberBanOnUnban?: boolean;
		removeChannelOnDelete?: boolean;
		removeCalendarsOnDelete?: boolean;
		removeCalendarRsvpOnDelete?: boolean;
		cacheMemberBans?: boolean;
		cacheWebhooks?: boolean;
		cacheChannels?: boolean;
		cacheServers?: boolean;
		cacheMessages?: boolean;
		cacheForumTopics?: boolean;
		cacheMessageReactions?: boolean;
		cacheCalendars?: boolean;
		cacheCalendarsRsvps?: boolean;
	};
}
