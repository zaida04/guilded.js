import type {
    RESTDeleteCalendarEventResult,
    RESTDeleteCalendarEventRsvpResult,
    RESTDeleteChannelMessageResult,
    RESTDeleteChannelResult,
    RESTDeleteDocResult,
    RESTDeleteGroupMemberResult,
    RESTDeleteListItemCompleteResult,
    RESTDeleteListItemResult,
    RESTDeleteMemberBanResult,
    RESTDeleteMemberNicknameResult,
    RESTDeleteMemberResult,
    RESTDeleteMemberRoleResult,
    RESTDeleteReactionResult,
    RESTDeleteServerWebhookResult,
    RESTGetCalendarEventResult,
    RESTGetCalendarEventRsvpsResult,
    RESTGetCalendarEventsBody,
    RESTGetCalendarEventsResult,
    RESTGetChannelMessageResult,
    RESTGetChannelMessagesQuery,
    RESTGetChannelMessagesResult,
    RESTGetChannelResult,
    RESTGetDocResult,
    RESTGetDocsResult,
    RESTGetListItemResult,
    RESTGetListItemsResult,
    RESTGetMemberBanResult,
    RESTGetMemberBansResult,
    RESTGetMemberResult,
    RESTGetMemberRolesResult,
    RESTGetMemberSocialLinkResult,
    RESTGetMembersResult,
    RESTGetServerResult,
    RESTGetServerWebhookResult,
    RESTGetServerWebhooksQuery,
    RESTGetServerWebhooksResult,
    RESTPatchCalendarEventBody,
    RESTPatchCalendarEventResult,
    RESTPatchCalendarEventRsvpBody,
    RESTPatchCalendarEventRsvpResult,
    RESTPatchChannelBody,
    RESTPatchChannelResult,
    RESTPostCalendarEventBody,
    RESTPostCalendarEventResult,
    RESTPostChannelMessagesBody,
    RESTPostChannelMessagesResult,
    RESTPostChannelsBody,
    RESTPostChannelsResult,
    RESTPostDocsBody,
    RESTPostDocsResult,
    RESTPostForumTopicBody,
    RESTPostForumTopicResult,
    RESTPostListItemBody,
    RESTPostListItemCompleteResult,
    RESTPostListItemResult,
    RESTPostMemberBanBody,
    RESTPostMemberBanResult,
    RESTPostRoleXpResult,
    RESTPostServerWebhooksBody,
    RESTPostServerWebhooksResult,
    RESTPostUserXPBody,
    RESTPostUserXpResult,
    RESTPutChannelMessageBody,
    RESTPutChannelMessageResult,
    RESTPutDocBody,
    RESTPutDocResult,
    RESTPutGroupMemberResult,
    RESTPutListItemBody,
    RESTPutListItemResult,
    RESTPutMemberNicknameBody,
    RESTPutMemberNicknameResult,
    RESTPutMemberRoleResult,
    RESTPutReactionResult,
    RESTPutServerWebhookBody,
    RESTPutServerWebhookResult,
    UserSocialLink,
} from "@guildedjs/guilded-api-typings";

import type { RestManager } from "../RestManager";
import { ROUTES } from "./routes";

export class Router {
    constructor(public readonly rest: RestManager) {}

    /** Create a channel */
    createChannel(data: RESTPostChannelsBody): Promise<RESTPostChannelsResult> {
        return this.rest.post<RESTPostChannelsResult, RESTPostChannelsBody>(ROUTES.channels(), data);
    }

    /** Fetch a channel */
    getChannel(channelId: string): Promise<RESTGetChannelResult> {
        return this.rest.get<RESTGetChannelResult>(ROUTES.channel(channelId));
    }

    /** Update a channel */
    updateChannel(channelId: string, data: RESTPatchChannelBody): Promise<RESTPatchChannelResult> {
        return this.rest.patch<RESTPatchChannelResult>(ROUTES.channel(channelId), data);
    }

    /** Delete a channel */
    deleteChannel(channelId: string): Promise<RESTDeleteChannelResult> {
        return this.rest.delete<RESTDeleteChannelResult>(ROUTES.channel(channelId));
    }

    /** Send a message to a channel */
    createChannelMessage(channelId: string, content: RESTPostChannelMessagesBody): Promise<RESTPostChannelMessagesResult> {
        return this.rest.post<RESTPostChannelMessagesResult, RESTPostChannelMessagesBody>(ROUTES.channelMessages(channelId), content);
    }

    /** Get a list of the latest 50 messages from a channel. */
    getChannelMessages(channelId: string, options: RESTGetChannelMessagesQuery): Promise<RESTGetChannelMessagesResult> {
        return this.rest.get<RESTGetChannelMessagesResult, RESTGetChannelMessagesQuery>(ROUTES.channelMessages(channelId), options);
    }

    /** Get details for a specific chat message from a chat channel. */
    getChannelMessage(channelId: string, messageId: string): Promise<RESTGetChannelMessageResult> {
        return this.rest.get<RESTGetChannelMessageResult>(ROUTES.channelMessage(channelId, messageId));
    }

    /** Update a channel message. */
    updateChannelMessage(channelId: string, messageId: string, options: RESTPutChannelMessageBody): Promise<RESTPutChannelMessageResult> {
        return this.rest.put<RESTPutChannelMessageResult, RESTPutChannelMessageBody>(ROUTES.channelMessage(channelId, messageId), options);
    }

    /** Delete a channel message. */
    deleteChannelMessage(channelId: string, messageId: string): Promise<RESTDeleteChannelMessageResult> {
        return this.rest.delete<RESTDeleteChannelMessageResult>(ROUTES.channelMessage(channelId, messageId));
    }

    /** Get a single calendar event. */
    getCalendarEvent(channelId: string, calendarEventId: number): Promise<RESTGetCalendarEventResult> {
        return this.rest.get<RESTGetCalendarEventResult>(ROUTES.calendarEvent(channelId, calendarEventId));
    }

    /** Get all calendar events in a specific channel. */
    getCalendarEvents(channelId: string, options: RESTGetCalendarEventsBody): Promise<RESTGetCalendarEventsResult> {
        return this.rest.get<RESTGetCalendarEventsResult, RESTGetCalendarEventsBody>(ROUTES.calendarEvents(channelId), options);
    }

    /** Create a calendar event. */
    createCalendarEvent(channelId: string, options: RESTPostCalendarEventBody): Promise<RESTPostCalendarEventResult> {
        return this.rest.post<RESTPostCalendarEventResult, RESTPostCalendarEventBody>(ROUTES.calendarEvents(channelId), options);
    }

    /** Update an existing calendar event. */
    updateCalendarEvent(channelId: string, calendarEventId: number, options: RESTPatchCalendarEventBody): Promise<RESTPatchCalendarEventResult> {
        return this.rest.patch<RESTPatchCalendarEventResult, RESTPatchCalendarEventBody>(ROUTES.calendarEvent(channelId, calendarEventId), options);
    }

    /** Delete a calendar event. */
    deleteCalendarEvent(channelId: string, calendarEventId: number): Promise<RESTDeleteCalendarEventResult> {
        return this.rest.delete<RESTDeleteCalendarEventResult>(ROUTES.calendarEvent(channelId, calendarEventId));
    }

    /** Get RSVPs from a calendar event */
    getCalendarEventRsvps(channelId: string, calendarEventId: number): Promise<RESTGetCalendarEventRsvpsResult> {
        return this.rest.get<RESTGetCalendarEventRsvpsResult>(ROUTES.calendarEventRsvps(channelId, calendarEventId));
    }

    /** Update a rsvp user from a calendar event */
    updateCalendarEventRvsp(
        channelId: string,
        calendarEventId: number,
        userId: string,
        options: RESTPatchCalendarEventRsvpBody,
    ): Promise<RESTPatchCalendarEventRsvpResult> {
        return this.rest.put<RESTPatchCalendarEventRsvpResult>(ROUTES.calendarEventRsvp(channelId, calendarEventId, userId), options);
    }

    /** Delete a rsvp user from a calendar event */
    deleteCalendarEventRvsp(channelId: string, calendarEventId: number, userId: string): Promise<RESTDeleteCalendarEventRsvpResult> {
        return this.rest.delete<RESTDeleteCalendarEventRsvpResult>(ROUTES.calendarEventRsvp(channelId, calendarEventId, userId));
    }

    /** Get a list of the roles assigned to a member using the id of the member. */
    getMemberRoles(serverId: string, userId: string): Promise<RESTGetMemberRolesResult> {
        return this.rest.get<RESTGetMemberRolesResult>(ROUTES.memberRoles(serverId, userId));
    }

    /** Update a member's nickname. */
    updateMemberNickname(serverId: string, userId: string, nickname: string): Promise<RESTPutMemberNicknameResult> {
        return this.rest.put<RESTPutMemberNicknameResult, RESTPutMemberNicknameBody>(ROUTES.memberNickname(serverId, userId), { nickname });
    }

    /** Delete a member's nickname */
    deleteMemberNickname(serverId: string, userId: string): Promise<RESTDeleteMemberNicknameResult> {
        return this.rest.delete<RESTDeleteMemberNicknameResult>(ROUTES.memberNickname(serverId, userId));
    }

    /** Get a server */
    getServer(serverId: string): Promise<RESTGetServerResult> {
        return this.rest.get<RESTGetServerResult>(ROUTES.server(serverId));
    }

    /** Create a topic in a forum */
    createForumTopic(channelId: string, options: RESTPostForumTopicBody): Promise<RESTPostForumTopicResult> {
        return this.rest.post<RESTPostForumTopicResult, RESTPostForumTopicBody>(ROUTES.forumTopic(channelId), options);
    }

    /** Create a list item. */
    createListItem(channelId: string, options: RESTPostListItemBody): Promise<RESTPostListItemResult> {
        return this.rest.post<RESTPostListItemResult, RESTPostListItemBody>(ROUTES.listItems(channelId), options);
    }

    /** Get list items */
    getListItems(channelId: string): Promise<RESTGetListItemsResult> {
        return this.rest.get<RESTGetListItemsResult>(ROUTES.listItems(channelId));
    }

    /** Get list item */
    getListItem(channelId: string, itemId: string): Promise<RESTGetListItemResult> {
        return this.rest.get<RESTGetListItemResult>(ROUTES.listItem(channelId, itemId));
    }

    /** Update list item */
    updateListItem(channelId: string, itemId: string, options: RESTPutListItemBody): Promise<RESTPutListItemResult> {
        return this.rest.put<RESTPutListItemResult, RESTPostListItemBody>(ROUTES.listItem(channelId, itemId), options);
    }

    /** Delete list item */
    deleteListItem(channelId: string, itemId: string): Promise<RESTDeleteListItemResult> {
        return this.rest.delete<RESTDeleteListItemResult>(ROUTES.listItem(channelId, itemId));
    }

    completeListItem(channelId: string, itemId: string): Promise<RESTPostListItemCompleteResult> {
        return this.rest.post<RESTPostListItemCompleteResult>(ROUTES.listItemComplete(channelId, itemId));
    }

    uncompleteListItem(channelId: string, itemId: string): Promise<RESTDeleteListItemCompleteResult> {
        return this.rest.delete<RESTDeleteListItemCompleteResult>(ROUTES.listItemComplete(channelId, itemId));
    }

    /** Create a doc. */
    createDoc(channelId: string, options: RESTPostDocsBody): Promise<RESTPostDocsResult> {
        return this.rest.post<RESTPostDocsResult, RESTPostDocsBody>(ROUTES.channelDocs(channelId), options);
    }

    /** Get the docs from a channel. */
    getDocs(channelId: string): Promise<RESTGetDocsResult> {
        return this.rest.get<RESTGetDocsResult>(ROUTES.channelDocs(channelId));
    }

    /** Get a doc from a channel. */
    getDoc(channelId: string, docId: number): Promise<RESTGetDocResult> {
        return this.rest.get<RESTGetDocResult>(ROUTES.channelDoc(channelId, docId));
    }

    /** Update a doc */
    updateDoc(channelId: string, docId: number, options: RESTPutDocBody): Promise<RESTPutDocResult> {
        return this.rest.put<RESTPutDocResult, RESTPutDocBody>(ROUTES.channelDoc(channelId, docId), options);
    }

    /** Delete a doc from a channel. */
    deleteDoc(channelId: string, docId: number): Promise<RESTDeleteDocResult> {
        return this.rest.delete<RESTDeleteDocResult>(ROUTES.channelDoc(channelId, docId));
    }

    /** Add a reaction emote */
    addReactionEmote(channelId: string, contentId: string, emoteId: number): Promise<RESTPutReactionResult> {
        return this.rest.put<RESTPutReactionResult>(ROUTES.channelReaction(channelId, contentId, emoteId));
    }

    /** Delete a reaction emote */
    deleteReactionEmote(channelId: string, contentId: string, emoteId: number): Promise<RESTDeleteReactionResult> {
        return this.rest.delete<RESTDeleteReactionResult>(ROUTES.channelReaction(channelId, contentId, emoteId));
    }

    /** Award XP to a member */
    awardMemberXP(serverId: string, userId: string, amount: number): Promise<RESTPostUserXpResult> {
        return this.rest.post<RESTPostUserXpResult, RESTPostUserXPBody>(ROUTES.memberXP(serverId, userId), { amount });
    }

    /** Award XP to a role */
    awardRoleXP(serverId: string, roleId: string, amount: number): Promise<RESTPostRoleXpResult> {
        return this.rest.post<RESTPostRoleXpResult, RESTPostUserXPBody>(ROUTES.roleXP(serverId, roleId), { amount });
    }

    /** Retrieves a member's public social links */
    getMemberSocialLinks(serverId: string, userId: string, type: UserSocialLink): Promise<RESTGetMemberSocialLinkResult> {
        return this.rest.get<RESTGetMemberSocialLinkResult>(ROUTES.memberSocialLinks(serverId, userId, type));
    }

    getMember(serverId: string, userId: string): Promise<RESTGetMemberResult> {
        return this.rest.get<RESTGetMemberResult>(ROUTES.member(serverId, userId));
    }

    getMembers(serverId: string): Promise<RESTGetMembersResult> {
        return this.rest.get<RESTGetMembersResult>(ROUTES.members(serverId));
    }

    kickMember(serverId: string, userId: string): Promise<RESTDeleteMemberResult> {
        return this.rest.delete<RESTDeleteMemberResult>(ROUTES.member(serverId, userId));
    }

    /** Ban a member from a server */
    banMember(serverId: string, userId: string): Promise<RESTPostMemberBanResult> {
        return this.rest.post<RESTPostMemberBanResult, RESTPostMemberBanBody>(ROUTES.memberBan(serverId, userId));
    }

    /** Retrieve a ban from a server */
    getMemberBan(serverId: string, userId: string): Promise<RESTGetMemberBanResult> {
        return this.rest.get<RESTGetMemberBanResult>(ROUTES.memberBan(serverId, userId));
    }

    /** Unban a member from a server */
    unbanMember(serverId: string, userId: string): Promise<RESTDeleteMemberBanResult> {
        return this.rest.delete<RESTDeleteMemberBanResult>(ROUTES.memberBan(serverId, userId));
    }

    /** Get all bans in a server */
    getMemberBans(serverId: string): Promise<RESTGetMemberBansResult> {
        return this.rest.get<RESTGetMemberBansResult>(ROUTES.memberBans(serverId));
    }

    /** Add member to group */
    addMemberToGroup(groupId: string, userId: string): Promise<RESTPutGroupMemberResult> {
        return this.rest.put<RESTPutGroupMemberResult>(ROUTES.groupMember(groupId, userId));
    }

    /** Remove member from group */
    removeMemberFromGroup(groupId: string, userId: string): Promise<RESTDeleteGroupMemberResult> {
        return this.rest.delete<RESTDeleteGroupMemberResult>(ROUTES.groupMember(groupId, userId));
    }

    /** Assign role to member */
    assignRoleToMember(serverId: string, userId: string, roleId: number): Promise<RESTPutMemberRoleResult> {
        return this.rest.put<RESTPutMemberRoleResult>(ROUTES.memberRole(serverId, userId, roleId));
    }

    /** Remove role to member */
    removeRoleFromMember(serverId: string, userId: string, roleId: number): Promise<RESTDeleteMemberRoleResult> {
        return this.rest.delete<RESTDeleteMemberRoleResult>(ROUTES.memberRole(serverId, userId, roleId));
    }

    /** Create a webhook */
    createWebhook(serverId: string, options: RESTPostServerWebhooksBody): Promise<RESTPostServerWebhooksResult> {
        return this.rest.post<RESTPostServerWebhooksResult, RESTPostServerWebhooksBody>(ROUTES.serverWebhooks(serverId), options);
    }

    /** Get a server's webhooks */
    getWebhooks(serverId: string, channelId?: string): Promise<RESTGetServerWebhooksResult> {
        return this.rest.get<RESTGetServerWebhooksResult, RESTGetServerWebhooksQuery>(
            ROUTES.serverWebhooks(serverId),
            channelId ? { channelId } : undefined,
        );
    }

    /** Get a webhook */
    getWebhook(serverId: string, webhookId: string): Promise<RESTGetServerWebhookResult> {
        return this.rest.get<RESTGetServerWebhookResult>(ROUTES.serverWebhook(serverId, webhookId));
    }

    /** Update a webhook */
    updateWebhook(serverId: string, webhookId: string, options: RESTPutServerWebhookBody): Promise<RESTPutServerWebhookResult> {
        return this.rest.put<RESTPutServerWebhookResult, RESTPutServerWebhookBody>(ROUTES.serverWebhook(serverId, webhookId), options);
    }

    /** Delete a webhook */
    deleteWebhook(serverId: string, webhookId: string): Promise<RESTDeleteServerWebhookResult> {
        return this.rest.delete<RESTDeleteServerWebhookResult>(ROUTES.serverWebhook(serverId, webhookId));
    }
}
