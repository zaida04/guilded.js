/**
 * GET
 * /servers/:serverId/members/:userId/roles
 */
export interface RESTGetMemberRolesResult {
    roleIds: number[];
}

/**
 * PUT
 * /servers/:serverId/members/:userId/nickname
 */
export interface RESTPutMemberNicknameResult {
    nickname: string;
}
export interface RESTPutMemberNicknameBody {
    nickname: string;
}

/**
 * DELETE
 * /servers/:serverId/members/:userId/nickname
 */
export type RESTDeleteMemberNicknameResult = never;
