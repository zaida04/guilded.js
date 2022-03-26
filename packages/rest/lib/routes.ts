import { UserSocialLink } from "@guildedjs/guilded-api-typings";

export const ROUTES = {
    // Channel Endpoints
    channelMessages: (channelId: string) => `/channels/${channelId}/messages` as const,
    channelMessage: (channelId: string, messageId: string) => `/channels/${channelId}/messages/${messageId}`,

    // Member Endpoints
    memberNickname: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/nickname`,
    memberRoles: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/roles`,
    member: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}`,
    members: (serverId: string) => `/servers/${serverId}/members`,

    // Forum Endpoints
    forumThread: (channelId: string) => `/channels/${channelId}/forum`,

    // List Endpoints
    listItems: (channelId: string) => `/channels/${channelId}/items`,
    listItem: (channelId: string, itemId: string) => `/channels/${channelId}/items/${itemId}`,

    // Docs Endpoints
    channelDocs: (channelId: string) => `/channels/${channelId}/docs`,
    channelDoc: (channelId: string, docId: number) => `/channels/${channelId}/docs/${docId}`,

    // Reactions Endpoints
    channelReaction: (channelId: string, contentId: string, emoteId: number) => `/channels/${channelId}/content/${contentId}/emotes/${emoteId}`,

    // Team XP Endpoints
    memberXP: (serverId: string, userId: string) => `/servers/${serverId}/members/${userId}/xp`,
    roleXP: (serverId: string, roleId: string) => `/servers/${serverId}/roles/${roleId}/xp`,

    // Social Links Endpoints
    memberSocialLinks: (serverId: string, userId: string, type: UserSocialLink) => `/servers/${serverId}/members/${userId}/social-links/${type}`,

    // Group Memberships Endpoints
    groupMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}`,

    // Role Memberships Endpoints
    memberRole: (memberId: string, roleId: number) => `/members/${memberId}/roles/${roleId}`,
};
