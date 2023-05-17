import type {
  rest,
  RestBody,
  RestPath,
  RestPayload,
  RestQuery,
  Schema,
} from "@guildedjs/guilded-api-typings";
import type { RestManager } from "../RestManager";
import { ROUTES } from "./routes";

export class Router {
  constructor(public readonly rest: RestManager) {}

  /**
   * Create a channel
   */
  async createChannel(
    data: RestBody<RestPath<"/channels">["post"]>
  ): Promise<RestPayload<RestPath<"/channels">["post"], 201>> {
    return this.rest.post(ROUTES.channels(), data);
  }

  /**
   * Fetch a channel
   */
  async getChannel(
    channelId: string
  ): Promise<RestPayload<RestPath<"/channels/{channelId}">["get"], 200>> {
    return this.rest.get(ROUTES.channel(channelId));
  }

  /**
   * Update a channel
   */
  async updateChannel(
    channelId: string,
    data: RestBody<RestPath<"/channels/{channelId}">["patch"]>
  ): Promise<RestPayload<RestPath<"/channels/{channelId}">["patch"], 200>> {
    return this.rest.patch(ROUTES.channel(channelId), data);
  }

  /**
   * Delete a channel
   */
  async deleteChannel(
    channelId: string
  ): Promise<RestPayload<RestPath<"/channels/{channelId}">["delete"], 204>> {
    return this.rest.delete(ROUTES.channel(channelId));
  }

  /**
   * Send a message to a channel
   */
  async createChannelMessage(
    channelId: string,
    content: RestBody<RestPath<"/channels/{channelId}/messages">["post"]>
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/messages">["post"], 201>
  > {
    return this.rest.post(ROUTES.channelMessages(channelId), content);
  }

  /**
   * Get a list of the latest 50 messages from a channel.
   */
  async getChannelMessages(
    channelId: string,
    options: RestQuery<RestPath<"/channels/{channelId}/messages">["get"]>
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/messages">["get"], 200>
  > {
    return this.rest.get(ROUTES.channelMessages(channelId), options);
  }

  /**
   * Get details for a specific chat message from a chat channel.
   */
  async getChannelMessage(
    channelId: string,
    messageId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/messages/{messageId}">["get"],
      200
    >
  > {
    return this.rest.get(ROUTES.channelMessage(channelId, messageId));
  }

  /**
   * Update a channel message.
   */
  async updateChannelMessage(
    channelId: string,
    messageId: string,
    options: RestBody<
      RestPath<"/channels/{channelId}/messages/{messageId}">["put"]
    >
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/messages/{messageId}">["put"],
      200
    >
  > {
    return this.rest.put(ROUTES.channelMessage(channelId, messageId), options);
  }

  /**
   * Delete a channel message.
   */
  async deleteChannelMessage(
    channelId: string,
    messageId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/messages/{messageId}">["delete"],
      200
    >
  > {
    return this.rest.delete(ROUTES.channelMessage(channelId, messageId));
  }

  /**
   * Get a single calendar event.
   */
  async getCalendarEvent(
    channelId: string,
    calendarEventId: number
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/events/{calendarEventId}">["get"],
      200
    >
  > {
    return this.rest.get(ROUTES.calendarEvent(channelId, calendarEventId));
  }

  /**
   * Get all calendar events in a specific channel.
   */
  async getCalendarEvents(
    channelId: string,
    options: RestQuery<RestPath<"/channels/{channelId}/events">["get"]>
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/events">["get"], 200>
  > {
    return this.rest.get(ROUTES.calendarEvents(channelId), options);
  }

  /**
   * Create a calendar event.
   */
  async createCalendarEvent(
    channelId: string,
    options: RestBody<RestPath<"/channels/{channelId}/events">["post"]>
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/events">["post"], 200>
  > {
    return this.rest.post(ROUTES.calendarEvents(channelId), options);
  }

  /**
   * Update an existing calendar event.
   */
  async updateCalendarEvent(
    channelId: string,
    calendarEventId: number,
    options: RestBody<
      RestPath<"/channels/{channelId}/events/{calendarEventId}">["patch"]
    >
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/events/{calendarEventId}">["patch"],
      200
    >
  > {
    return this.rest.patch(
      ROUTES.calendarEvent(channelId, calendarEventId),
      options
    );
  }

  /**
   * Delete a calendar event.
   */
  async deleteCalendarEvent(
    channelId: string,
    calendarEventId: number
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/events/{calendarEventId}">["delete"],
      200
    >
  > {
    return this.rest.delete(ROUTES.calendarEvent(channelId, calendarEventId));
  }

  /**
   * Get a single rsvp from a calendar event
   */
  async getCalendarEventRsvp(
    channelId: string,
    calendarEventId: number,
    userId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/events/{calendarEventId}/rsvps/{userId}">["get"],
      200
    >
  > {
    return this.rest.get(
      ROUTES.calendarEventRsvp(channelId, calendarEventId, userId)
    );
  }

  /**
   * Get rsvps from a calendar event
   */
  async getCalendarEventRsvps(
    channelId: string,
    calendarEventId: number
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/events/{calendarEventId}/rsvps">["get"],
      200
    >
  > {
    return this.rest.get(ROUTES.calendarEventRsvps(channelId, calendarEventId));
  }

  /**
   * Update an rsvp user from a calendar event
   */
  async updateCalendarEventRvsp(
    channelId: string,
    calendarEventId: number,
    userId: string,
    options: RestBody<
      RestPath<"/channels/{channelId}/events/{calendarEventId}/rsvps/{userId}">["put"]
    >
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/events/{calendarEventId}/rsvps/{userId}">["put"],
      200
    >
  > {
    return this.rest.put(
      ROUTES.calendarEventRsvp(channelId, calendarEventId, userId),
      options
    );
  }

  /**
   * Update many rsvps from a calendar event
   */
  async updateCalendarEventRsvpMany(
    channelId: string,
    calendarEventId: number,
    options: RestBody<
      RestPath<"/channels/{channelId}/events/{calendarEventId}/rsvps">["put"]
    >
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/events/{calendarEventId}/rsvps">["put"],
      200
    >
  > {
    return this.rest.put(
      ROUTES.calendarEventRsvpsMany(channelId, calendarEventId),
      options
    );
  }

  /**
   * Delete an rsvp user from a calendar event
   */
  async deleteCalendarEventRsvp(
    channelId: string,
    calendarEventId: number,
    userId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/events/{calendarEventId}/rsvps/{userId}">["delete"],
      204
    >
  > {
    return this.rest.delete(
      ROUTES.calendarEventRsvp(channelId, calendarEventId, userId)
    );
  }

  /**
   * Get a list of the roles assigned to a member using the id of the member.
   */
  async getMemberRoles(
    serverId: string,
    userId: string
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/members/{userId}/roles">["get"],
      200
    >
  > {
    return this.rest.get(ROUTES.memberRoles(serverId, userId));
  }

  /**
   * Update a member's nickname.
   */
  async updateMemberNickname(
    serverId: string,
    userId: string,
    nickname: string
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/members/{userId}/nickname">["put"],
      200
    >
  > {
    return this.rest.put(ROUTES.memberNickname(serverId, userId), { nickname });
  }

  /**
   * Delete a member's nickname
   */
  async deleteMemberNickname(
    serverId: string,
    userId: string
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/members/{userId}/nickname">["delete"],
      204
    >
  > {
    return this.rest.delete(ROUTES.memberNickname(serverId, userId));
  }

  /**
   * Get a server
   */
  async getServer(
    serverId: string
  ): Promise<RestPayload<RestPath<"/servers/{serverId}">["get"], 200>> {
    return this.rest.get(ROUTES.server(serverId));
  }

  /**
   * Create a topic in a forum
   */
  async createForumTopic(
    channelId: string,
    options: RestBody<RestPath<"/channels/{channelId}/topics">["post"]>
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/topics">["post"], 201>
  > {
    return this.rest.post(ROUTES.forumTopics(channelId), options);
  }

  /**
   * Get all topics in a forum
   */
  async getForumTopics(
    channelId: string,
    options: RestQuery<RestPath<"/channels/{channelId}/topics">["get"]>
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/topics">["get"], 200>
  > {
    return this.rest.get(ROUTES.forumTopics(channelId), options);
  }

  /**
   * Get a topic in a forum
   */
  async getForumTopic(
    channelId: string,
    forumThreadId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/topics/{forumTopicId}">["get"],
      200
    >
  > {
    return this.rest.get(ROUTES.forumTopic(channelId, forumThreadId));
  }

  /**
   * Update a topic in a forum
   */
  async updateForumTopic(
    channelId: string,
    forumThreadId: string,
    options: RestBody<
      RestPath<"/channels/{channelId}/topics/{forumTopicId}">["patch"]
    >
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/topics/{forumTopicId}">["patch"],
      201
    >
  > {
    return this.rest.patch(
      ROUTES.forumTopic(channelId, forumThreadId),
      options
    );
  }

  /**
   * Delete a topic in a forum
   */
  async deleteForumTopic(
    channelId: string,
    forumThreadId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/topics/{forumTopicId}">["delete"],
      204
    >
  > {
    return this.rest.delete(ROUTES.forumTopic(channelId, forumThreadId));
  }

  /**
   * Pin a topic in a forum
   */
  async pinForumTopic(
    channelId: string,
    forumThreadId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/topics/{forumTopicId}/pin">["put"],
      204
    >
  > {
    return this.rest.put(ROUTES.forumTopicPin(channelId, forumThreadId));
  }

  /**
   * Unpin a topic in a forum
   */
  async unpinForumTopic(
    channelId: string,
    forumThreadId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/topics/{forumTopicId}/pin">["delete"],
      204
    >
  > {
    return this.rest.delete(ROUTES.forumTopicPin(channelId, forumThreadId));
  }

  /**
   * Lock a topic in a forum
   */
  async lockForumTopic(
    channelId: string,
    forumThreadId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/topics/{forumTopicId}/lock">["put"],
      204
    >
  > {
    return this.rest.put(ROUTES.forumTopicLock(channelId, forumThreadId));
  }

  /**
   * Unlock a topic in a forum
   */
  async unlockForumTopic(
    channelId: string,
    forumThreadId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/topics/{forumTopicId}/lock">["delete"],
      204
    >
  > {
    return this.rest.delete(ROUTES.forumTopicLock(channelId, forumThreadId));
  }

  /**
   * Create a list item.
   */
  async createListItem(
    channelId: string,
    options: RestBody<RestPath<"/channels/{channelId}/items">["post"]>
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/items">["post"], 201>
  > {
    return this.rest.post(ROUTES.listItems(channelId), options);
  }

  /**
   * Get list items
   */
  async getListItems(
    channelId: string
  ): Promise<RestPayload<RestPath<"/channels/{channelId}/items">["get"], 200>> {
    return this.rest.get<
      RestPayload<RestPath<"/channels/{channelId}/items">["get"], 200>
    >(ROUTES.listItems(channelId));
  }

  /**
   * Get list item
   */
  async getListItem(
    channelId: string,
    itemId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/items/{listItemId}">["get"],
      200
    >
  > {
    return this.rest.get(ROUTES.listItem(channelId, itemId));
  }

  /**
   * Update list item
   */
  async updateListItem(
    channelId: string,
    itemId: string,
    options: RestBody<
      RestPath<"/channels/{channelId}/items/{listItemId}">["put"]
    >
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/items/{listItemId}">["put"],
      200
    >
  > {
    return this.rest.put(ROUTES.listItem(channelId, itemId), options);
  }

  /**
   * Delete list item
   */
  async deleteListItem(
    channelId: string,
    itemId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/items/{listItemId}">["delete"],
      204
    >
  > {
    return this.rest.delete(ROUTES.listItem(channelId, itemId));
  }

  async completeListItem(
    channelId: string,
    itemId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/items/{listItemId}/complete">["post"],
      204
    >
  > {
    return this.rest.post(ROUTES.listItemComplete(channelId, itemId));
  }

  async uncompleteListItem(
    channelId: string,
    itemId: string
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/items/{listItemId}/complete">["delete"],
      204
    >
  > {
    return this.rest.delete(ROUTES.listItemComplete(channelId, itemId));
  }

  /**
   * Create a doc.
   */
  async createDoc(
    channelId: string,
    options: RestBody<RestPath<"/channels/{channelId}/docs">["post"]>
  ): Promise<RestPayload<RestPath<"/channels/{channelId}/docs">["post"], 201>> {
    return this.rest.post(ROUTES.channelDocs(channelId), options);
  }

  /**
   * Get the docs from a channel.
   */
  async getDocs(
    channelId: string
  ): Promise<RestPayload<RestPath<"/channels/{channelId}/docs">["get"], 200>> {
    return this.rest.get(ROUTES.channelDocs(channelId));
  }

  /**
   * Get a doc from a channel.
   */
  async getDoc(
    channelId: string,
    docId: number
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/docs/{docId}">["get"], 200>
  > {
    return this.rest.get(ROUTES.channelDoc(channelId, docId));
  }

  /**
   * Update a doc
   */
  async updateDoc(
    channelId: string,
    docId: number,
    options: RestBody<RestPath<"/channels/{channelId}/docs/{docId}">["put"]>
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/docs/{docId}">["put"], 200>
  > {
    return this.rest.put(ROUTES.channelDoc(channelId, docId), options);
  }

  /**
   * Delete a doc from a channel.
   */
  async deleteDoc(
    channelId: string,
    docId: number
  ): Promise<
    RestPayload<RestPath<"/channels/{channelId}/docs/{docId}">["delete"], 204>
  > {
    return this.rest.delete(ROUTES.channelDoc(channelId, docId));
  }

  /**
   * Add a reaction emote
   */
  async addReactionEmote(
    channelId: string,
    contentId: string,
    emoteId: number
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/messages/{messageId}/emotes/{emoteId}">["put"],
      204
    >
  > {
    return this.rest.put(ROUTES.channelReaction(channelId, contentId, emoteId));
  }

  /**
   * Delete a reaction emote
   */
  async deleteReactionEmote(
    channelId: string,
    contentId: string,
    emoteId: number
  ): Promise<
    RestPayload<
      RestPath<"/channels/{channelId}/messages/{messageId}/emotes/{emoteId}">["delete"],
      204
    >
  > {
    return this.rest.delete(
      ROUTES.channelReaction(channelId, contentId, emoteId)
    );
  }

  /**
   * Award XP to a member
   */
  async awardMemberXP(
    serverId: string,
    userId: string,
    amount: number
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/members/{userId}/xp">["post"],
      200
    >
  > {
    return this.rest.post(ROUTES.memberXP(serverId, userId), { amount });
  }

  /**
   * Award XP to a role
   */
  async awardRoleXP(
    serverId: string,
    roleId: string,
    amount: number
  ): Promise<
    RestPayload<RestPath<"/servers/{serverId}/roles/{roleId}/xp">["post"], 204>
  > {
    return this.rest.post(ROUTES.roleXP(serverId, roleId), { amount });
  }

  async getMe(): Promise<RestPayload<RestPath<"/users/{userId}">["get"], 200>> {
    return this.rest.get(ROUTES.me());
  }

  /**
   * Retrieves a member's public social links
   */
  async getMemberSocialLinks(
    serverId: string,
    userId: string,
    type: Schema<"SocialLink">["type"]
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/members/{userId}/social-links/{socialLinkType}">["get"],
      200
    >
  > {
    return this.rest.get(ROUTES.memberSocialLinks(serverId, userId, type));
  }

  async getMember(
    serverId: string,
    userId: string
  ): Promise<
    RestPayload<RestPath<"/servers/{serverId}/members/{userId}">["get"], 200>
  > {
    return this.rest.get(ROUTES.member(serverId, userId));
  }

  async getMembers(
    serverId: string
  ): Promise<RestPayload<RestPath<"/servers/{serverId}/members">["get"], 200>> {
    return this.rest.get(ROUTES.members(serverId));
  }

  /**
   * Kick a member from a server
   */
  async kickMember(
    serverId: string,
    userId: string
  ): Promise<
    RestPayload<RestPath<"/servers/{serverId}/members/{userId}">["delete"], 204>
  > {
    return this.rest.delete(ROUTES.member(serverId, userId));
  }

  /**
   * Ban a member from a server
   */
  async banMember(
    serverId: string,
    userId: string
  ): Promise<
    RestPayload<RestPath<"/servers/{serverId}/bans/{userId}">["post"], 200>
  > {
    return this.rest.post(ROUTES.memberBan(serverId, userId));
  }

  /**
   * Retrieve a ban from a server
   */
  async getMemberBan(
    serverId: string,
    userId: string
  ): Promise<
    RestPayload<RestPath<"/servers/{serverId}/bans/{userId}">["get"], 200>
  > {
    return this.rest.get(ROUTES.memberBan(serverId, userId));
  }

  /**
   * Unban a member from a server
   */
  async unbanMember(
    serverId: string,
    userId: string
  ): Promise<
    RestPayload<RestPath<"/servers/{serverId}/bans/{userId}">["delete"], 204>
  > {
    return this.rest.delete(ROUTES.memberBan(serverId, userId));
  }

  /**
   * Get all bans in a server
   */
  async getMemberBans(
    serverId: string
  ): Promise<RestPayload<RestPath<"/servers/{serverId}/bans">["get"], 200>> {
    return this.rest.get(ROUTES.memberBans(serverId));
  }

  /**
   * Add member to group
   */
  async addMemberToGroup(
    groupId: string,
    userId: string
  ): Promise<
    RestPayload<RestPath<"/groups/{groupId}/members/{userId}">["put"], 204>
  > {
    return this.rest.put(ROUTES.groupMember(groupId, userId));
  }

  /**
   * Remove member from group
   */
  async removeMemberFromGroup(
    groupId: string,
    userId: string
  ): Promise<
    RestPayload<RestPath<"/groups/{groupId}/members/{userId}">["delete"], 204>
  > {
    return this.rest.delete(ROUTES.groupMember(groupId, userId));
  }

  /**
   * Assign role to member
   */
  async assignRoleToMember(
    serverId: string,
    userId: string,
    roleId: number
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/members/{userId}/roles/{roleId}">["put"],
      204
    >
  > {
    return this.rest.put(ROUTES.memberRole(serverId, userId, roleId));
  }

  /**
   * Remove role to member
   */
  async removeRoleFromMember(
    serverId: string,
    userId: string,
    roleId: number
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/members/{userId}/roles/{roleId}">["delete"],
      204
    >
  > {
    return this.rest.delete(ROUTES.memberRole(serverId, userId, roleId));
  }

  /**
   * Create a webhook
   */
  async createWebhook(
    serverId: string,
    options: RestBody<RestPath<"/servers/{serverId}/webhooks">["post"]>
  ): Promise<
    RestPayload<RestPath<"/servers/{serverId}/webhooks">["post"], 201>
  > {
    return this.rest.post(ROUTES.serverWebhooks(serverId), options);
  }

  /**
   * Get a server's webhooks
   */
  async getWebhooks(
    serverId: string,
    channelId?: string
  ): Promise<
    RestPayload<RestPath<"/servers/{serverId}/webhooks">["get"], 200>
  > {
    return this.rest.get(
      ROUTES.serverWebhooks(serverId),
      channelId ? { query: { channelId } } : undefined
    );
  }

  /**
   * Get a webhook
   */
  async getWebhook(
    serverId: string,
    webhookId: string
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/webhooks/{webhookId}">["get"],
      200
    >
  > {
    return this.rest.get(ROUTES.serverWebhook(serverId, webhookId));
  }

  /**
   * Update a webhook
   */
  async updateWebhook(
    serverId: string,
    webhookId: string,
    options: RestBody<
      RestPath<"/servers/{serverId}/webhooks/{webhookId}">["put"]
    >
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/webhooks/{webhookId}">["put"],
      200
    >
  > {
    return this.rest.put(ROUTES.serverWebhook(serverId, webhookId), options);
  }

  /**
   * Delete a webhook
   */
  async deleteWebhook(
    serverId: string,
    webhookId: string
  ): Promise<
    RestPayload<
      RestPath<"/servers/{serverId}/webhooks/{webhookId}">["delete"],
      204
    >
  > {
    return this.rest.delete(ROUTES.serverWebhook(serverId, webhookId));
  }
}
