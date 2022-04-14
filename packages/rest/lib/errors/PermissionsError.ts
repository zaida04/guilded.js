import { GuildedAPIError } from "./GuildedAPIError";

export class PermissionsError extends GuildedAPIError {
    public constructor(msg: string, method: string, path: string, public readonly missingPermissions: string[]) {
        super(msg, method, path, 403);
    }
}
