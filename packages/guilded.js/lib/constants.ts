export const constants = {
    clientEvents: {
        MESSAGE_CREATED: "messageCreated",
        MESSAGE_UPDATED: "messageUpdated",
        MESSAGE_DELETED: "messageDeleted",
        TEAM_MEMBER_UPDATED: "memberUpdated",
        TEAM_ROLES_UPATED: "rolesUpdated",
        TEAM_MEMBER_JOINED: "memberJoined",
        TEAM_MEMBER_REMOVED: "memberRemoved",
        TEAM_MEMBER_BANNED: "memberBanned",
        TEAM_MEMBER_UNBANNED: "memberUnbanned",
        TEAM_WEBHOOK_CREATED: "webhookCreated",
        TEAM_WEBHOOK_UPDATED: "webhookUpdated",
        LIST_COMPLETED: "listCompleted",
        LIST_UNCOMPLETED: "listUncompleted",
    },
} as const;
export type ClientEvent = typeof constants.clientEvents;

export const ROUTES = {
    AWS_CDN: "https://s3-us-west-2.amazonaws.com/www.guilded.gg/" as const,
    BASE_DOMAIN: "www.guilded.gg" as const,
    API_DOMAIN: "api.guilded.gg" as const,
    CDN: "img.guildedcdn.com" as const,
    IMAGE_CDN_DOMAIN: "img.guildedcdn.com" as const,
    MEDIA_DOMAIN: "media.guilded.gg" as const,
};
