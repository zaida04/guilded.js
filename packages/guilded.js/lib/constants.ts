export const constants = {
    clientEvents: {
        MESSAGE_CREATED: "messageCreated",
        MESSAGE_UPDATED: "messageUpdated",
        MESSAGE_DELETED: "messageDeleted",
        TEAM_MEMBER_UPDATED: "memberUpdated",
        TEAM_ROLES_UPATED: "rolesUpdated",
        TEAM_MEMBER_JOINED: "memberJoined",
        TEAM_MEMBER_REMOVED: "memberRemoved"

    }
} as const;
export type ClientEvent = typeof constants.clientEvents;
