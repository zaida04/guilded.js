import { Base } from "./Base";
import type { UserPayload, WSWelcomePayload } from "@guildedjs/guilded-api-typings";
import type { Client } from "./Client";

export class User extends Base<UserPayload> {
    /** The name for this user */
    name: string;
    /** The type of this user */
    readonly type: UserType;
    /** When this user was created */
    readonly createdAt: Date | null;

    constructor(client: Client, data: UserPayload) {
        super(client, data);
        this.name = data.name;
        this.createdAt = new Date(data.createdAt);
        this.type = data.type === "bot" ? UserType.Bot : UserType.User;
    }
}

export class ClientUser extends User {
    // User who has created this bot
    readonly createdBy: string;
    // The bot ID (not to be confused with the user ID) of this bot
    readonly botId: string;
    constructor(client: Client, data: WSWelcomePayload["d"]["user"]) {
        super(client, { ...data, type: "bot" });
        this.createdBy = data.createdBy;
        this.botId = data.botId;
    }
}

export enum UserType {
    Bot,
    User,
}
