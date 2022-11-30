/**
 * PUT
 * /servers/:serverId/members/:userId/roles/:roleId
 */
export type RESTPutMemberRoleResult = never;

/**
 * DELETE
 * /servers/:serverId/members/:userId/roles/:roleId
 */
export type RESTDeleteMemberRoleResult = never;

/**
 * GET
 * /servers/:serverId/members/:userId/roles
 */
export type RESTGetMemberRolesResult = {
    roleIds: number[];
}
