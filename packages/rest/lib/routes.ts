import { UserSocialLink } from "@guildedjs/guilded-api-typings";

export const ROUTES = {
    // Channel Endpoints
    channelMessages: (channelId: string) => `/channels/${channelId}/messages` as const,
    channelMessage: (channelId: string, messageId: string) => `/channels/${channelId}/messages/${messageId}`,

    // Member Endpoints
    memberNickname: (userId: string) => `/members/${userId}/nickname`,
    memberRoles: (userId: string) => `/members/${userId}/roles`,

    // Forum Endpoints
    createForumThread: (channelId: string) => `/channels/${channelId}/forum`,

    // List Endpoints
    createListItem: (channelId: string) => `/channels/${channelId}/list`,

    // Docs Endpoints
    channelDocs: (channelId: string) => `/channels/${channelId}/docs`,
    channelDoc: (channelId: string, docId: number) => `/channels/${channelId}/docs/${docId}`,

    // Reactions Endpoints
    channelReaction: (channelId: string, contentId: string, emoteId: number) => `/channels/${channelId}/content/${contentId}/emotes/${emoteId}`,

    // Team XP Endpoints
    memberXP: (userId: string) => `/members/${userId}/xp`,
    roleXP: (userId: string) => `/roles/${userId}/xp`,

    // Social Links Endpoints
    getMemberSocialLinks: (userId: string, type: UserSocialLink) => `/members/${userId}/social-links/${type}`,

    // Group Memberships Endpoints
    groupMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}`,

    // Role Memberships Endpoints
    memberRole: (memberId: string, roleId: number) => `/members/${memberId}/roles/${roleId}`,
};
