import RestManager from "@guildedjs/rest";
import WebsocketManager from "@guildedjs/ws";
import { EventEmitter } from "node:events";
import { ClientGatewayHandler } from "./gateway/ClientGatewayHandler";
import ChannelManager from "./managers/global/ChannelManager";
import DocManager from "./managers/global/DocManager";
import ForumManager from "./managers/global/ForumManager";
import GroupManager from "./managers/global/GroupManager";
import ListManager from "./managers/global/ListManager";
import MemberManager from "./managers/global/MemberManager";
import MessageManager from "./managers/global/MessageManager";
import RoleManager from "./managers/global/RoleManager";
import type Message from "./structures/Message";
import type TypedEmitter from "typed-emitter";
import type { WSChatMessageDeletedPayload, WSTeamMemberUpdatedPayload } from "@guildedjs/guilded-api-typings";
import type Member from "./structures/Member";
import type Role from "./structures/Role";

export class Client extends (EventEmitter as unknown as new () => TypedEmitter<ClientEvents>) {
    /** The time in milliseconds the Client connected */
    readyTimestamp = 0;

    /** The manager for the bot to make requests to the REST api. */
    rest = new RestManager({
        ...this.options.rest,
        token: this.options.token,
    });

    /** The gateway manager for the bot to manage all gateway connections through websockets. */
    gateway = new WebsocketManager({
        token: this.options.token,
        // todo: redo in ws refactor
        handleEventPacket: (packet) => {},
    });

    /** The gateway event handlers will be processed by this manager. */
    eventHandler = new ClientGatewayHandler(this);

    /** Managers for structures */
    channels = new ChannelManager(this);
    docs = new DocManager(this);
    forums = new ForumManager(this);
    groups = new GroupManager(this);
    lists = new ListManager(this);
    members = new MemberManager(this);
    messages = new MessageManager(this);
    roles = new RoleManager(this);

    constructor(public options: ClientOptions) {
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
    async connect() {
        return;
    }

    /** Disconnects the bot. */
    async disconnect() {
        return;
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
    partials?: string[];
}

type ClientEvents = {
    messageCreated: (message: Message) => unknown,
    messageUpdated: (message: Message, oldMessage: Message | null) => unknown,
    messageDeleted: (message: Message | WSChatMessageDeletedPayload) => unknown,
    memberUpdated: (member: Member | WSTeamMemberUpdatedPayload["d"], oldMember: Member | null) => unknown
    teamRolesUpdated: (roleIds: Role[] | number[]) => unknown
}

export default Client;
