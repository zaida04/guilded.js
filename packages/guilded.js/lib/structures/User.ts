import { Schema, WSPayload } from "@guildedjs/guilded-api-typings";
import { Base } from "./Base";
import type { Client } from "./Client";

export class User extends Base<Schema<"User">> {
  /** The name for this user */
  name: string;
  /** The type of this user */
  readonly type: UserType;
  /** The avatar image associated with this user */
  avatar: string | null = null;
  /** The banner image associated with this user */
  banner: string | null = null;
  /** When this user was created */
  readonly _createdAt: number | null;

  constructor(client: Client, data: Schema<"User">) {
    super(client, data);
    this.name = data.name;
    this._createdAt = Date.parse(data.createdAt);
    this.type = data.type === "bot" ? UserType.Bot : UserType.User;

    this._update(data);
  }

  get createdAt(): Date | null {
    return this._createdAt ? new Date(this._createdAt) : null;
  }

  _update(data: Partial<Schema<"User">>): this {
    if ("avatar" in data) {
      this.avatar = data.avatar ?? null;
    }

    if ("banner" in data) {
      this.banner = data.banner ?? null;
    }

    return this;
  }
}

export class ClientUser extends User {
  // User who has created this bot
  readonly createdBy: string;
  // The bot ID (not to be confused with the user ID) of this bot
  readonly botId: string;

  constructor(
    client: Client,
    data: WSPayload<"_WelcomeMessage">["user"] & {
      createdBy: string;
      botId: string;
    }
  ) {
    super(client, { ...data, type: "bot" });
    this.createdBy = data.createdBy;
    this.botId = data.botId;
  }

  fetch(): Promise<User> {
    return this.client.users.fetchClient();
  }
}

export enum UserType {
  Bot,
  User,
}
