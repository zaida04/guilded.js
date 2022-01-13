import { SocialLinkType } from "./typings";

/** The meanings of each of the known guilded api response status codes. */
export const GUILDED_STATUS_CODES = {
    200: "The request was successful",
    201: "The content was created",
    204: "No content returned",
    400: "The request was unacceptable, often due to missing parameters",
    401: "The access token is missing or invalid",
    403: "The bot does not have the necessary permissions",
    404: "The requested resource does not exist",
    409: "The request conflicted with another request",
    500: "Something went wrong on our end",
    501: "Something went wrong on our end",
    502: "Something went wrong on our end",
    503: "Something went wrong on our end",
    504: "Something went wrong on our end",
};

export const ENDPOINTS = {
    // Channel Endpoints
    channelMessages: (channelId: string) => `/channels/${channelId}/messages`,
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
    getMemberSocialLinks: (userId: string, type: SocialLinkType) => `/members/${userId}/social-links/${type}`,

    // Group Memberships Endpoints
    groupMember: (groupId: string, userId: string) => `/groups/${groupId}/members/${userId}`,

    // Role Memberships Endpoints
    memberRole: (memberId: string, roleId: number) => `/members/${memberId}/roles/${roleId}`,
};
