export const constants = {
    clientEvents: {
        MESSAGE_CREATED: "messageCreated",
        MESSAGE_UPDATED: "messageUpdated",
        MESSAGE_DELETED: "messageDeleted",
        MEMBER_UPDATED: "memberUpdated",
        ROLES_UPATED: "rolesUpdated",
        MEMBER_JOINED: "memberJoined",
        MEMBER_REMOVED: "memberRemoved",
        MEMBER_BANNED: "memberBanned",
        MEMBER_UNBANNED: "memberUnbanned",
        WEBHOOK_CREATED: "webhookCreated",
        WEBHOOK_UPDATED: "webhookUpdated",
        LIST_ITEM_COMPLETED: "listItemCompleted",
        LIST_ITEM_UNCOMPLETED: "listItemUncompleted",
        LIST_ITEM_CREATED: "listItemCreated",
        LIST_ITEM_UPDATED: "listItemUpdated",
        LIST_ITEM_DELETED: "listItemDeleted",
        CHANNEL_CREATED: "channelCreated",
        CHANNEL_UPDATED: "channelUpdated",
        CHANNEL_DELETED: "channelDeleted",
        DOC_CREATED: "docCreated",
        DOC_UPDATED: "docUpdated",
        DOC_DELETED: "docDeleted",
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
