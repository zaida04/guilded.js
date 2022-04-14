/* istanbul ignore file */

export class GuildedAPIError extends Error {
    public constructor(msg: string, public readonly method: string, public readonly path: string, public readonly code: number | string) {
        super(`[GuildedAPIError:${code}:${method.toUpperCase()}] ${path} - ${msg}`);
    }
}
