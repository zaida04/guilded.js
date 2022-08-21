import { RestManager } from "@guildedjs/rest";
import { WebSocketManager } from "@guildedjs/ws";
import { EventEmitter } from "node:events";
import { ClientGatewayHandler } from "../gateway/ClientGatewayHandler";
import { GlobalChannelManager } from "../managers/global/ChannelManager";
import { GlobalDocManager } from "../managers/global/DocManager";
import { GlobalForumManager } from "../managers/global/ForumManager";
import { GlobalGroupManager } from "../managers/global/GroupManager";
import { GlobalListItemManager } from "../managers/global/ListManager";
import { GlobalMemberManager } from "../managers/global/MemberManager";
import { GlobalMessageManager } from "../managers/global/MessageManager";
import { GlobalRoleManager } from "../managers/global/RoleManager";
import { GlobalUserManager } from "../managers/global/UserManager";
import { GlobalGuildBanManager } from "../managers/global/GuildBanManager";
import { GlobalCalendarManager } from "../managers/global/CalendarManager";
import type { Message, MessageReaction } from "./Message";
import type TypedEmitter from "typed-emitter";
import type {
    WSChatMessageDeletedPayload,
    WSTeamMemberBannedPayload,
    WSTeamMemberRemovedPayload,
    WSTeamMemberUnbannedPayload,
    WSTeamMemberUpdatedPayload,
    TeamMemberRoleIdsPayload,
    DocPayload,
    ListItemPayload,
    ListItemSummaryPayload,
    WSChannelMessageReactionCreatedPayload,
    WSChannelMessageReactionDeletedPayload,
} from "@guildedjs/guilded-api-typings";
import type { Member, MemberBan } from "./Member";
import type { CacheStructure } from "../cache";
import { GlobalWebhookManager } from "../managers/global/WebhookManager";
import type { Webhook } from "./Webhook";
import { ClientUser } from "./User";
import type { Channel } from "./channels";
import { GlobalServerManager } from "../managers/global/ServerManager";
import { GlobalReactionManager } from "../managers/global/ReactionManager";
import type { CalendarEvent, CalendarEventRsvp } from "./CalendarEvent";

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
    forums = new GlobalForumManager(this);
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
        removeMemberOnLeave?: boolean;
        removeMemberBanOnUnban?: boolean;
        removeChannelOnDelete?: boolean;
        removeCalendarsOnDelete?: boolean;
        removeCalendarRsvpOnDelete?: boolean;
        cacheMemberBans?: boolean;
        cacheWebhooks?: boolean;
        cacheChannels?: boolean;
        cacheServers?: boolean;
        cacheMessageReactions?: boolean;
        cacheCalendars?: boolean;
        cacheCalendarsRSVPs?: boolean;
    };
}

type ClientEvents = {
    ready: () => unknown;
    debug: (data: any) => unknown;
    exit: () => unknown;
    error: (reason: string, err: Error | null) => unknown;
    calendarEventCreated: (calendarEvent: CalendarEvent) => unknown;
    calendarEventUpdated: (calendarEvent: CalendarEvent, oldCalendar: CalendarEvent | null) => unknown;
    calendarEventDeleted: (calendarEvent: CalendarEvent) => unknown;
    calendarRsvpUpdated: (CalendarEventRsvp: CalendarEventRsvp, oldCalendarRsvp: CalendarEventRsvp | null) => unknown;
    calendarRsvpManyUpdated: (CalendarRsvpsEvent: Map<string, CalendarEventRsvp>) => unknown;
    calendarRsvpDeleted: (CalendarEventRsvp: CalendarEventRsvp) => unknown;
    messageCreated: (message: Message) => unknown;
    messageUpdated: (message: Message, oldMessage: Message | null) => unknown;
    messageDeleted: (message: Message | WSChatMessageDeletedPayload["d"]) => unknown;
    messageReactionCreated: (reaction: MessageReaction) => unknown;
    messageReactionDeleted: (reaction: MessageReaction | WSChannelMessageReactionDeletedPayload["d"]) => unknown;
    channelCreated: (channel: Channel) => unknown;
    channelUpdated: (channel: Channel, oldChannel: Channel | null) => unknown;
    channelDeleted: (channel: Channel) => unknown;
    docCreated: (doc: DocPayload) => unknown;
    docUpdated: (newDoc: DocPayload, oldDoc: DocPayload | null) => unknown;
    docDeleted: (doc: DocPayload) => unknown;
    listItemCreated: (item: ListItemPayload) => unknown;
    listItemUpdated: (newItem: ListItemPayload, oldItem: ListItemPayload | ListItemSummaryPayload | null) => unknown;
    listItemDeleted: (item: ListItemPayload) => unknown;
    listItemCompleted: (item: ListItemPayload) => unknown;
    listItemUncompleted: (item: ListItemPayload) => unknown;
    memberJoined: (member: Member) => unknown;
    memberRemoved: (member: Member | WSTeamMemberRemovedPayload["d"]) => unknown;
    memberUpdated: (member: Member | WSTeamMemberUpdatedPayload["d"], oldMember: Member | null) => unknown;
    memberBanned: (member: MemberBan | WSTeamMemberBannedPayload["d"]) => unknown;
    memberUnbanned: (member: MemberBan | WSTeamMemberUnbannedPayload["d"]) => unknown;
    serverCreated: (server: { serverId: string }) => unknown;
    webhookCreated: (webhook: Webhook) => unknown;
    webhookUpdated: (webhook: Webhook, oldWebhook: Webhook | null) => unknown;
    rolesUpdated: (members: (Member | (TeamMemberRoleIdsPayload & { serverId: string }))[], oldMembers: Member[]) => unknown;
    unknownGatewayEvent: (data: any) => unknown;
};
