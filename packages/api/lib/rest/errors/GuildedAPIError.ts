/* istanbul ignore file */

import type { RequestOptions, ResponseDetails } from "../RestManager";

export class GuildedAPIError extends Error {
    public constructor(msg: string, public readonly request: RequestOptions, public readonly response: ResponseDetails) {
        super(`[GuildedAPIError:${response.status}:${request.method.toUpperCase()}] ${request.url} - ${msg}`);
    }
}
