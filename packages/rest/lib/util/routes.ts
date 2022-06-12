import type { UserSocialLink } from "@guildedjs/guilded-api-typings";

export const ROUTES = {
    // Channel Endpoints
    channels: () => `/channels` as string,
    channel: (channelId: string) => `/channels/${channelId}` as const,

    // Channel Endpoints
    channelMessages: (channelId: string) => `/channels/${channelId}/messages` as const,
    channelMessage: (channelId: string, messageId: string) => `/channels/${channelId}/messages/${messageId}` as const,

    // Server Endpoints
    server: (serverId: string) => `/servers/${serverId}` as const,

    // Member Endpoints
    memberNickname: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/nickname` as const,
    memberRoles: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/roles` as const,
    member: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}` as const,
    members: (serverId: string) => `/servers/${serverId}/members` as const,
    memberBan: (serverId: string, userId: string) => `/servers/${serverId}/bans/${userId}` as const,
    memberBans: (serverId: string) => `/servers/${serverId}/bans` as const,

    // Forum Endpoints
    forumTopic: (channelId: string) => `/channels/${channelId}/topics` as const,

    // List Endpoints
    listItems: (channelId: string) => `/channels/${channelId}/items` as const,
    listItem: (channelId: string, itemId: string) => `/channels/${channelId}/items/${itemId}` as const,
    listItemComplete: (channelId: string, itemId: string) => `/channels/${channelId}/items/${itemId}/complete` as const,

    // Docs Endpoints
    channelDocs: (channelId: string) => `/channels/${channelId}/docs` as const,
    channelDoc: (channelId: string, docId: number) => `/channels/${channelId}/docs/${docId}` as const,

    // Reactions Endpoints
    channelReaction: (channelId: string, contentId: string, emoteId: number) =>
        `/channels/${channelId}/content/${contentId}/emotes/${emoteId}` as const,

    // Team XP Endpoints
    memberXP: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/xp` as const,
    roleXP: (serverId: string, roleId: string) => `/servers/${serverId}/roles/${roleId}/xp` as const,

    // Social Links Endpoints
    memberSocialLinks: (serverId: string, userId: string, type: UserSocialLink) =>
        `/servers/${serverId}/members/${userId}/social-links/${type}` as const,

    // Group Memberships Endpoints
    groupMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}` as const,

    // Role Memberships Endpoints
    memberRole: (serverId: string, memberId: string, roleId: number) => `/servers/${serverId}/members/${memberId}/roles/${roleId}` as const,

    // Webhook Endpoints
    serverWebhooks: (serverId: string) => `/servers/${serverId}/webhooks`,
    serverWebhook: (serverId: string, webhookId: string) => `/servers/${serverId}/webhooks/${webhookId}`,
} as const;
