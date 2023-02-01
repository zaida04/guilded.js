import path from "node:path";
import type { RequestOptions, ResponseDetails } from "../RestManager";
import { GuildedAPIError } from "./GuildedAPIError";

export class PermissionsError extends GuildedAPIError {
    public constructor(
        msg: string,
        methodOrRequest: RequestOptions | string, // backwards compatibility
        pathOrResponse: ResponseDetails | string, // backwards compatibility
        public readonly missingPermissions?: string[], // this can be removed eventually, as it should be returned on the response
    ) {
        super(msg, methodOrRequest, pathOrResponse, 403);
    }
}
