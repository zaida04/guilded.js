import RestManager from "@guildedjs/rest";
import WebsocketManager from "@guildedjs/ws";
import { EventEmitter } from "node:events";
import { ClientGatewayHandler } from "../gateway/ClientGatewayHandler";
import GlobalChannelManager from "../managers/global/ChannelManager";
import GlobalDocManager from "../managers/global/DocManager";
import GlobalForumManager from "../managers/global/ForumManager";
import GlobalGroupManager from "../managers/global/GroupManager";
import GlobalListManager from "../managers/global/ListManager";
import GlobalMemberManager from "../managers/global/MemberManager";
import GlobalMessageManager from "../managers/global/MessageManager";
import GlobalRoleManager from "../managers/global/RoleManager";
import type { Message } from "./Message";
import type TypedEmitter from "typed-emitter";
import type { WSChatMessageDeletedPayload, WSTeamMemberJoinedPayload, WSTeamMemberRemovedPayload, WSTeamMemberUpdatedPayload } from "@guildedjs/guilded-api-typings";
import type { Member } from "./Member";
import type { Role } from "./Role";
import { CacheStructure } from "../cache";
import GlobalUserManager from "../managers/global/UserManager";
import GlobalMemberBanManager from "../managers/global/MemberBanManager";

export class Client extends (EventEmitter as unknown as new () => TypedEmitter<ClientEvents>) {
    /** The time in milliseconds the Client connected */
    readyTimestamp = 0;

    /** The manager for the bot to make requests to the REST api. */
    rest = new RestManager({
        ...this.options.rest,
        token: this.options.token,
    });

    /** The websocket connection */
    wsManager = new WebsocketManager({ token: this.options.token });

    /** The gateway event handlers will be processed by this manager. */
    gatewayHandler = new ClientGatewayHandler(this);

    /** Managers for structures */
    channels = new GlobalChannelManager(this);
    docs = new GlobalDocManager(this);
    forums = new GlobalForumManager(this);
    groups = new GlobalGroupManager(this);
    lists = new GlobalListManager(this);
    members = new GlobalMemberManager(this);
    messages = new GlobalMessageManager(this);
    roles = new GlobalRoleManager(this);
    users = new GlobalUserManager(this);
    bans = new GlobalMemberBanManager(this);

    constructor(public options: ClientOptions) {
        if(typeof options !== "object") throw new Error("Must provide options in client constructor in the form of an object.")
        if(typeof options?.token === "undefined") throw new Error("No token provided.");
        super();
    }

    /** The amount of time the bot has been online in milliseconds. */
    get uptime() {
        return this.readyTimestamp ? Date.now() - this.readyTimestamp : 0;
    }

    /** The bot's token. */
    get token() {
        return this.options.token;
    }

    /** Connects the bot to the api. */
    login(opts?: { fresh?: boolean }) {
        if(opts?.fresh) this.wsManager = new WebsocketManager({ token: this.options.token });
        this.wsManager.emitter
            .on("error", (reason, err) => this.emit('error', `[WS] ${reason}`, err))
            .on("ready", () => this.emit("ready"))
            .on("gatewayEvent", (event, data) => this.gatewayHandler.handleWSMessage(event, data))
            .on("debug", (data) => this.emit("debug", data))
            .on("exit", () => this.emit("exit"))
        this.wsManager.connect();
    }

    /** Disconnects the bot. */
    disconnect() {
        if(!this.wsManager.isAlive) throw new Error("There is no active connection to disconnect.");
        this.wsManager.emitter.removeAllListeners();
        this.wsManager.destroy();
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
        structureBuilder: <K, V>() => CacheStructure<K, V>;
        removeMemberOnLeave?: boolean;
        removeMemberBanOnUnban?: boolean;
        cacheMemberBans?: boolean;
    };
}

type ClientEvents = {
    ready: () => unknown;
    debug: (data: any) => unknown;
    exit: () => unknown;
    error: (reason: string, err: Error | null) => unknown;
    messageCreated: (message: Message) => unknown;
    messageUpdated: (message: Message, oldMessage: Message | null) => unknown;
    messageDeleted: (message: Message | WSChatMessageDeletedPayload["d"]) => unknown;
    memberJoined: (member: Member) => unknown;
    memberRemoved: (member: Member | WSTeamMemberRemovedPayload["d"]) => unknown;
    memberUpdated: (member: Member | WSTeamMemberUpdatedPayload["d"], oldMember: Member | null) => unknown;
    teamRolesUpdated: (roleIds: Role[] | number[]) => unknown;
    unknownGatewayEvent: (data: any) => unknown;
};

export default Client;
