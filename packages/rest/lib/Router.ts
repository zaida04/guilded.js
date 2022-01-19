import {
    ChatMessageContent,
    RESTDeleteChannelMessageResult,
    RESTDeleteDocResult,
    RESTDeleteGroupMemberResult,
    RESTDeleteMemberNicknameResult,
    RESTDeleteMemberRoleResult,
    RESTGetChannelMessageResult,
    RESTGetChannelMessagesQuery,
    RESTGetChannelMessagesResult,
    RESTGetDocResult,
    RESTGetDocsResult,
    RESTGetMemberRolesResult,
    RESTGetMemberSocialLink,
    RESTPostChannelMessagesBody,
    RESTPostChannelMessagesResult,
    RESTPostDocsBody,
    RESTPostDocsResult,
    RESTPostForumThreadBody,
    RESTPostForumThreadResult,
    RESTPostListItemBody,
    RESTPostListItemResult,
    RESTPostRoleXpResult,
    RESTPostUserXPBody,
    RESTPostUserXpResult,
    RESTPutChannelMessageBody,
    RESTPutChannelMessageResult,
    RESTPutDocBody,
    RESTPutDocResult,
    RESTPutGroupMemberResult,
    RESTPutMemberNicknameBody,
    RESTPutMemberRoleResult,
    RestPutReactionResult,
    UserSocialLink,
} from "@guildedjs/guilded-api-typings";
import { ROUTES } from "./routes";
import type { RestManager } from "./RestManager";

export class Router {
    constructor(public readonly rest: RestManager) {}

    /** Send a message to a channel */
    createChannelMessage(channelId: string, content: ChatMessageContent | string) {
        if (typeof content === "string") content = { content };

        return this.rest.post<RESTPostChannelMessagesResult, RESTPostChannelMessagesBody>(ROUTES.channelMessages(channelId), content);
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
    updateChannelMessage(channelId: string, messageId: string, options: RESTPutChannelMessageBody) {
        return this.rest.put<RESTPutChannelMessageResult, RESTPutChannelMessageBody>(ROUTES.channelMessage(channelId, messageId), options);
    }

    /** Delete a channel message. */
    deleteChannelMessage(channelId: string, messageId: string) {
        return this.rest.delete<RESTDeleteChannelMessageResult>(ROUTES.channelMessage(channelId, messageId));
    }

    /** Get a list of the roles assigned to a member using the id of the member. */
    getMemberRoles(userId: string) {
        return this.rest.get<RESTGetMemberRolesResult>(ROUTES.memberRoles(userId));
    }

    /** Update a member's nickname. */
    updateMemberNickname(userId: string, nickname: string) {
        return this.rest.put<RESTPutChannelMessageResult, RESTPutMemberNicknameBody>(ROUTES.memberNickname(userId), { nickname });
    }

    /** Delete a member's nickname */
    deleteMemberNickname(userId: string) {
        return this.rest.delete<RESTDeleteMemberNicknameResult>(ROUTES.memberNickname(userId));
    }

    /** Create a thread in a forum */
    createForumThread(channelId: string, options: RESTPostForumThreadBody) {
        return this.rest.post<RESTPostForumThreadResult, RESTPostForumThreadBody>(ROUTES.createForumThread(channelId), options);
    }

    /** Create a list item. */
    createListItem(channelId: string, options: RESTPostListItemBody) {
        return this.rest.post<RESTPostListItemResult, RESTPostListItemBody>(ROUTES.createListItem(channelId), options);
    }

    /** Create a doc. */
    createDoc(channelId: string, options: RESTPostDocsBody) {
        return this.rest.post<RESTPostDocsResult, RESTPostDocsBody>(ROUTES.channelDocs(channelId), options);
    }

    /** Get the docs from a channel. */
    getDocs(channelId: string) {
        return this.rest.get<RESTGetDocsResult>(ROUTES.channelDocs(channelId));
    }

    /** Get a doc from a channel. */
    getDoc(channelId: string, docId: number) {
        return this.rest.get<RESTGetDocResult>(ROUTES.channelDoc(channelId, docId));
    }

    /** Update a doc */
    updateDoc(channelId: string, docId: number, options: RESTPutDocBody) {
        // @ts-ignore ts odd error fix TODO:
        return this.rest.put<RESTPutDocResult, RESTPutDocBody>(ROUTES.channelDoc(channelId, docId), options);
    }

    /** Delete a doc from a channel. */
    deleteDoc(channelId: string, docId: number) {
        return this.rest.delete<RESTDeleteDocResult>(ROUTES.channelDoc(channelId, docId));
    }

    /** Add a reaction emote */
    addReactionEmote(channelId: string, contentId: string, emoteId: number) {
        return this.rest.put<RestPutReactionResult>(ROUTES.channelReaction(channelId, contentId, emoteId));
    }

    /** Award XP to a member */
    awardMemberXP(userId: string, amount: number) {
        return this.rest.post<RESTPostUserXpResult, RESTPostUserXPBody>(ROUTES.memberXP(userId), { amount });
    }

    /** Award XP to a role */
    awardRoleXP(roleId: string, amount: number) {
        return this.rest.post<RESTPostRoleXpResult, RESTPostUserXPBody>(ROUTES.roleXP(roleId), { amount });
    }

    /** Retrieves a member's public social links */
    getMemberSocialLinks(userId: string, type: UserSocialLink) {
        return this.rest.get<RESTGetMemberSocialLink>(ROUTES.getMemberSocialLinks(userId, type));
    }

    /** Add member to group */
    addMemberToGroup(groupId: string, userId: string) {
        return this.rest.put<RESTPutGroupMemberResult>(ROUTES.groupMember(groupId, userId));
    }

    /** Remove member from group */
    removeMemberFromGroup(groupId: string, userId: string) {
        return this.rest.delete<RESTDeleteGroupMemberResult>(ROUTES.groupMember(groupId, userId));
    }

    /** Assign role to member */
    assignRoleToMember(userId: string, roleId: number) {
        return this.rest.put<RESTPutMemberRoleResult>(ROUTES.memberRole(userId, roleId));
    }

    /** Remove role to member */
    removeRoleFromMember(userId: string, roleId: number) {
        return this.rest.put<RESTDeleteMemberRoleResult>(ROUTES.memberRole(userId, roleId));
    }
}
