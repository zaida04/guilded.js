import RestManager from "@guildedjs/rest";
import WebsocketManager from "@guildedjs/ws";
import { EventEmitter } from "node:events";
import { ClientGatewayHandler } from "./gateway/ClientGatewayHandler";
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

export class Client extends (EventEmitter as unknown as new () => TypedEmitter<ClientEvents>) {
    /** The time in milliseconds the Client connected */
    readyTimestamp = 0;

    /** The manager for the bot to make requests to the REST api. */
    readonly rest = new RestManager({
        ...this.options.rest,
        token: this.options.token,
    });

    /** The gateway manager for the bot to manage all gateway connections through websockets. */
    readonly gateway = new WebsocketManager({
        token: this.options.token,
        handleEventPacket: (packet) => {
            if (packet.t) this.eventHandler[packet.t]?.(packet.d as any);
        },
        autoConnect: true,
    });

    /** The gateway event handlers will be processed by this manager. */
    readonly eventHandler = new ClientGatewayHandler(this);

    /** Managers for structures */
    readonly docs = new DocManager(this);
    readonly forums = new ForumManager(this);
    readonly groups = new GroupManager(this);
    readonly lists = new ListManager(this);
    readonly members = new MemberManager(this);
    readonly messages = new MessageManager(this);
    readonly roles = new RoleManager(this);

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
    messageUpdated: (oldMessage: Message | null, newMessage: Message) => unknown,
    messageDeleted: (message: Message | WSChatMessageDeletedPayload) => unknown,
    memberUpdated: (oldMember: Member | null, newMember: Member | WSTeamMemberUpdatedPayload["d"]) => unknown
}

export default Client;
