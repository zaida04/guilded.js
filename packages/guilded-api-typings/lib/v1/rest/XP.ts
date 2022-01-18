/**
 * POST
 * /members/:userId/xp
 */
export interface RESTPostUserXpResult {
    total: number;
}
export interface RESTPostUserXPBody {
    amount: number;
}

/**
 * POST
 * /roles/:roleId/xp
 */
export interface RESTPostRoleXpResult {
    total: number;
}
export interface RESTPostRoleXPBody {
    amount: number;
}
