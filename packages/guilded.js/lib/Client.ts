import Collection from "@discordjs/collection";
import {
    CreateDocOptions,
    CreateForumThreadOptions,
    CreateListItemOptions,
    GetChannelMessagesOptions,
    MessageContent,
    RestManager,
    SocialLinkType,
    UpdateChannelMessageOptions,
    UpdateDocOptions,
} from "@guildedjs/rest";
import { EventEmitter } from "events";
import { User } from "./Structures/User";

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
}

export class Client extends EventEmitter {
    /** The time in milliseconds the Client connected */
    readyTimestamp = 0;

    /** The manager for the bot to make requests to the REST api. */
    rest: RestManager;

    // TODO: Enable the manager once it is built
    /** The gateway manager for the bot to manage all gateway connections through websockets. */
    // gateway: GatewayManager;

    /** The users that have been cached for this connection. */
    users = new Collection<string, User>();

    constructor(public options: ClientOptions) {
        super();
        // TODO: Enable the manager once it is built
        // this.gateway = new GatewayManager();
        this.rest = new RestManager({
            ...options.rest,
            token: options.token,
        });
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

    /** Send a message to a channel */
    createChannelMessage(channelId: string, content: MessageContent | string) {
        return this.rest.createChannelMessage(channelId, content);
    }

    /** Get a list of the latest 50 messages from a channel. */
    getChannelMessages(channelId: string, options: GetChannelMessagesOptions) {
        return this.rest.getChannelMessages(channelId, options);
    }

    /** Get details for a specific chat message from a chat channel. */
    getChannelMessage(channelId: string, messageId: string) {
        return this.rest.getChannelMessage(channelId, messageId);
    }

    /** Update a channel message. */
    updateChannelMessage(channelId: string, messageId: string, options: UpdateChannelMessageOptions) {
        return this.rest.updateChannelMessage(channelId, messageId, options);
    }

    /** Delete a channel message. */
    deleteChannelMessage(channelId: string, messageId: string) {
        return this.rest.deleteChannelMessage(channelId, messageId);
    }

    /** Get a list of the roles assigned to a member using the id of the member. */
    getMemberRoles(userId: string) {
        return this.rest.getMemberRoles(userId);
    }

    /** Update a member's nickname. */
    updateMemberNickname(userId: string, nickname: string) {
        return this.rest.updateMemberNickname(userId, nickname);
    }

    /** Delete a member's nickname */
    deleteMemberNickname(userId: string) {
        return this.rest.deleteMemberNickname(userId);
    }

    /** Create a thread in a forum */
    createForumThread(channelId: string, options: CreateForumThreadOptions) {
        return this.rest.createForumThread(channelId, options);
    }

    /** Create a list item. */
    createListItem(channelId: string, options: CreateListItemOptions) {
        return this.rest.createListItem(channelId, options);
    }

    /** Create a doc. */
    createDoc(channelId: string, options: CreateDocOptions) {
        return this.rest.createDoc(channelId, options);
    }

    /** Get the docs from a channel. */
    getDocs(channelId: string) {
        return this.rest.getDocs(channelId);
    }

    /** Get a doc from a channel. */
    getDoc(channelId: string, docId: number) {
        return this.rest.getDoc(channelId, docId);
    }

    /** Update a doc */
    updateDoc(channelId: string, docId: number, options: UpdateDocOptions) {
        return this.rest.updateDoc(channelId, docId, options);
    }

    /** Delete a doc from a channel. */
    deleteDoc(channelId: string, docId: number) {
        return this.rest.deleteDoc(channelId, docId);
    }

    /** Add a reaction emote */
    addReactionEmote(channelId: string, contentId: string, emoteId: number) {
        return this.rest.addReactionEmote(channelId, contentId, emoteId);
    }

    /** Award XP to a member */
    awardMemberXP(userId: string, amount: number) {
        return this.rest.awardMemberXP(userId, amount);
    }

    /** Award XP to a role */
    awardRoleXP(roleId: number, amount: number) {
        // TODO: fix in rest by changing to number
        return this.rest.awardRoleXP(roleId.toString(), amount);
    }

    /** Retrieves a member's public social links */
    getMemberSocialLinks(userId: string, type: SocialLinkType) {
        return this.rest.getMemberSocialLinks(userId, type);
    }

    /** Add member to group */
    addMemberToGroup(groupId: string, userId: string) {
        return this.rest.addMemberToGroup(groupId, userId);
    }

    /** Remove member from group */
    removeMemberFromGroup(groupId: string, userId: string) {
        return this.rest.removeMemberFromGroup(groupId, userId);
    }

    /** Assign role to member */
    assignRoleToMember(userId: string, roleId: number) {
        return this.rest.assignRoleToMember(userId, roleId);
    }

    /** Remove role to member */
    removeRoleFromMember(userId: string, roleId: number) {
        return this.rest.removeRoleFromMember(userId, roleId);
    }
}

export default Client;
