export const ClientEvents = {
    messageCreate: "messageCreate",
    messageUpdate: "messageUpdate",
    messageDelete: "messageDelete",
    teamMemberUpdated: "memberUpdate",
    // This is intentional. Legacy change on Guilded's end.
    teamRolesUpdated: "rolesUpdate",
} as const;
export type ClientEvent = typeof ClientEvents;