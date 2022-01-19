/**
 * GET
 * /members/:userId/roles
 */
export interface RESTGetMemberRolesResult {
    roleIds: number[];
}

/**
 * PUT
 * /members/:userId/nickname
 */
export interface RESTPutMemberNicknameResult {
    nickname: string;
}
export interface RESTPutMemberNicknameBody {
    nickname: string;
}

/**
 * DELETE
 * /members/:userId/nickname
 */
export type RESTDeleteMemberNicknameResult = never;
