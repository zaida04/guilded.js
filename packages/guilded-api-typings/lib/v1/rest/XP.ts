/**
 * POST
 * /servers/:serverId/members/:userId/xp
 */
export interface RESTPostUserXpResult {
    total: number;
}
export interface RESTPostUserXPBody {
    amount: number;
}

/**
 * POST
 * /servers/:serverId/roles/:roleId/xp
 */
export interface RESTPostRoleXpResult {
    total: number;
}
export interface RESTPostRoleXPBody {
    amount: number;
}
