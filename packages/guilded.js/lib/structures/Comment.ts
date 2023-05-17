import { Schema } from "@guildedjs/guilded-api-typings";
import { Base } from "./Base";
import { Client } from "./Client";

export interface BaseComment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  channelId: string;
  createdBy: string;
  mentions?: Schema<"Mentions">;
}

export class Comment extends Base<BaseComment, number> {
  // Content of the comment
  content!: string;

  /** The timestamp that the comment was created at. */
  readonly _createdAt: number;

  /** The timestamp that the comment was last updated at. */
  _updatedAt: number | null;

  // Channel this comment belongs to
  channelId: string;

  // User who created this comment
  createdBy: string;

  // Mentions in this comment
  mentions!: Schema<"Mentions">;

  constructor(client: Client, data: BaseComment) {
    super(client, data);

    this._createdAt = Date.parse(data.createdAt);
    this._updatedAt = null;
    this.channelId = data.channelId;
    this.createdBy = data.createdBy;

    this._update(data);
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  _update(data: Partial<BaseComment>) {
    if ("content" in data && typeof data.content !== "undefined") {
      this.content = data.content;
    }
    if ("mentions" in data && typeof data.mentions !== "undefined") {
      this.mentions = data.mentions;
    }
    if ("updatedAt" in data && typeof data.updatedAt !== "undefined") {
      this._updatedAt = data.updatedAt ? Date.parse(data.updatedAt) : null;
    }
  }
}
