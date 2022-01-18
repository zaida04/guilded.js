import {
    MessageContent,
    MessagePayload,
    MemberXPPayload,
    RestGETChannelMessagesBody,
    RESTPatchChannelMessageResult,
    RESTPatchChannelMessageBody,
    RESTPostDocBody,
    RESTPostDocResult,
    RESTPostForumThreadBody,
    RESTPostForumThreadResult,
    RESTPostChannelMessageResult,
    RESTPostListItemBody,
    RESTPostListItemResult,
    UserSocialLink,
    RESTGetChannelMessageResult,
    ForumThreadPayload,
    RESTGetChannelMessagesResult,
    ListItemPayload,
    DocItemPayload,
    RESTGetChannelMessagesQuery,
} from "@guildedjs/guilded-api-typings";
import { ROUTES } from "./routes";
import type { RestManager } from "./RestManager";

export class Router {
    constructor(public readonly rest: RestManager) {}

    /** Send a message to a channel */
    createChannelMessage(channelId: string, content: MessageContent | string) {
        if (typeof content === "string") content = { content };

        return this.rest.post<RESTPostChannelMessageResult>(ROUTES.channelMessages(channelId), content);
    }

    /** Get a list of the latest 50 messages from a channel. */
    getChannelMessages(channelId: string, options: RESTGetChannelMessagesQuery) {
        return this.rest.get<RESTGetChannelMessagesResult, RESTGetChannelMessagesQuery>(ROUTES.channelMessages(channelId), options);
    }

    /** Get details for a specific chat message from a chat channel. */
    getChannelMessage(channelId: string, messageId: string) {
        return this.rest.get<RESTGetChannelMessageResult>(ROUTES.channelMessage(channelId, messageId));
    }

    /** Update a channel message. */
    updateChannelMessage(channelId: string, messageId: string, options: RESTPatchChannelMessageBody) {
        return this.rest.put<RESTPatchChannelMessageResult, RESTPatchChannelMessageBody>(ROUTES.channelMessage(channelId, messageId), options);
    }

    /** Delete a channel message. */
    deleteChannelMessage(channelId: string, messageId: string) {
        return this.rest.delete<never>(ROUTES.channelMessage(channelId, messageId));
    }

    // TODO: rest of these methods
    /** Get a list of the roles assigned to a member using the id of the member. */
    getMemberRoles(userId: string) {
        return this.rest.get<number[]>(ROUTES.memberRoles(userId));
    }

    /** Update a member's nickname. */
    updateMemberNickname(userId: string, nickname: string) {
        return this.rest.put<string>(ROUTES.memberNickname(userId), { nickname });
    }

    /** Delete a member's nickname */
    deleteMemberNickname(userId: string) {
        return this.rest.delete(ROUTES.memberNickname(userId));
    }

    /** Create a thread in a forum */
    createForumThread(channelId: string, options: RESTPostForumThreadBody) {
        return this.rest.post<ForumThreadPayload>(ROUTES.createForumThread(channelId), options);
    }

    /** Create a list item. */
    createListItem(channelId: string, options: RESTPostListItemBody) {
        return this.rest.post<ListItemPayload>(ROUTES.createListItem(channelId), options);
    }

    /** Create a doc. */
    createDoc(channelId: string, options: RESTPostDocBody) {
        return this.rest.post<DocItemPayload, RESTPostDocResult>(ROUTES.channelDocs(channelId), options);
    }

    /** Get the docs from a channel. */
    getDocs(channelId: string) {
        return this.rest.get<DocItemPayload[]>(ROUTES.channelDocs(channelId));
    }

    /** Get a doc from a channel. */
    getDoc(channelId: string, docId: number) {
        return this.rest.get<DocItemPayload>(ROUTES.channelDoc(channelId, docId));
    }

    /** Update a doc */
    updateDoc(channelId: string, docId: number, options: RESTPatchChannelMessageBody) {
        // @ts-ignore ts odd error fix TODO:
        return this.rest.put<DocPayload>(ROUTES.channelDoc(channelId, docId), options);
    }

    /** Delete a doc from a channel. */
    deleteDoc(channelId: string, docId: number) {
        return this.rest.delete(ROUTES.channelDoc(channelId, docId));
    }

    /** Add a reaction emote */
    addReactionEmote(channelId: string, contentId: string, emoteId: number) {
        return this.rest.put(ROUTES.channelReaction(channelId, contentId, emoteId));
    }

    /** Award XP to a member */
    awardMemberXP(userId: string, amount: number) {
        return this.rest.post<MemberXPPayload>(ROUTES.memberXP(userId), { amount });
    }

    /** Award XP to a role */
    awardRoleXP(roleId: string, amount: number) {
        return this.rest.post<undefined>(ROUTES.roleXP(roleId), { amount });
    }

    /** Retrieves a member's public social links */
    getMemberSocialLinks(userId: string, type: UserSocialLink) {
        return this.rest.get(ROUTES.getMemberSocialLinks(userId, type));
    }

    /** Add member to group */
    addMemberToGroup(groupId: string, userId: string) {
        return this.rest.put(ROUTES.groupMember(groupId, userId));
    }

    /** Remove member from group */
    removeMemberFromGroup(groupId: string, userId: string) {
        return this.rest.delete(ROUTES.groupMember(groupId, userId));
    }

    /** Assign role to member */
    assignRoleToMember(userId: string, roleId: number) {
        return this.rest.put(ROUTES.memberRole(userId, roleId));
    }

    /** Remove role to member */
    removeRoleFromMember(userId: string, roleId: number) {
        return this.rest.put(ROUTES.memberRole(userId, roleId));
    }
}
