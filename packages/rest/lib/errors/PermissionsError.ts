import type { RequestOptions, ResponseDetails } from "../RestManager";
import { GuildedAPIError } from "./GuildedAPIError";

export class PermissionsError extends GuildedAPIError {
    public constructor(
        msg: string,
        request: RequestOptions,
        response: ResponseDetails,
        public readonly missingPermissions?: string[]
    ) {
        super(msg, request, response);
    }
}
