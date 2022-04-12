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
    },
} as const;
export type ClientEvent = typeof constants.clientEvents;
