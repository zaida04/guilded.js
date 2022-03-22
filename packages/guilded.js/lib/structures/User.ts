import { Base }  from "./Base";
import type { UserPayload } from "@guildedjs/guilded-api-typings";
import type Client from "./Client";

export class User extends Base<UserPayload> {
    /** The name for this user */
    name: string | null = null;
    /** The type of this user */
    type: UserType;
    /** When this user was created */
    createdAt: Date | null;

    constructor(client: Client, data: UserPayload) {
        super(client, data);
        this.name = data.name;
        this.createdAt = new Date(data.createdAt);
        this.type = data.type === "bot" ? UserType.Bot : UserType.User;
    }
}

export enum UserType {
    Bot,
    User
}