import type { WebhookPayload } from "@guildedjs/guilded-api-typings/dist/v1/structs/Webhook";
import { Base } from "./Base";
import type { Client } from "./Client";
import type { User } from "./User";
import { RestBody, RestPath } from "@guildedjs/guilded-api-typings";

/**
 * Object representing received webhook data. This object is NOT to be used to send data to webhooks. That would be WebhookClient
 */
export class Webhook extends Base<WebhookPayload> {
  /**
   * The username belonging to this webhook
   */
  name!: string;

  /**
   * The ID of the channel this webhook belongs to
   */
  channelID!: string;

  /**
   * The ID of the server this webhook belongs to
   */
  readonly serverId: string;

  /**
   * The date in which this webhook was created
   */
  _createdAt: number;

  /**
   * The date this webhook was deleted if it was deleted
   */
  _deletedAt: number | null = null;

  /**
   * The user who created this webhook
   */
  readonly authorID: string;

  /**
   * The token of this webhook
   */
  token!: string | null;

  constructor(client: Client, data: WebhookPayload) {
    super(client, data);
    this.serverId = data.serverId;
    this._createdAt = Date.parse(data.createdAt);
    this.authorID = data.createdBy;
    this._update(data);
  }

  /**
   * Returns the creation date of this webhook
   * @returns The creation date of this webhook
   */
  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  /**
   * Returns the deletion date of this webhook if it was deleted
   * @returns The deletion date of this webhook if it was deleted, otherwise null
   */
  get deletedAt(): Date | null {
    return this._deletedAt ? new Date(this._deletedAt) : null;
  }

  /**
   * Returns the author of this webhook
   * @returns The author of this webhook, or null if the author is not cached
   */
  get user(): User | null {
    return this.client.users.cache.get(this.id) ?? null;
  }

  /**
   * Updates this webhook with new options
   * @param options The new options for this webhook
   * @returns A promise that resolves with the updated webhook
   */
  update(
    options: RestBody<
      RestPath<"/servers/{serverId}/webhooks/{webhookId}">["put"]
    >
  ): Promise<Webhook> {
    return this.client.webhooks.update(this.serverId, this.id, options);
  }

  /**
   * Deletes this webhook
   * @returns A promise that resolves with this webhook after it has been deleted
   */
  delete(): Promise<this> {
    return this.client.webhooks.delete(this.serverId, this.id).then(() => this);
  }

  _update(data: Partial<WebhookPayload>): this {
    if ("name" in data && data.name !== undefined) this.name = data.name;
    if ("channelId" in data && data.channelId !== undefined)
      this.channelID = data.channelId;
    if ("token" in data && data.token !== undefined)
      this.token = data.token ?? null;
    if ("deletedAt" in data && data.deletedAt !== undefined) {
      this._deletedAt = data.deletedAt ? Date.parse(data.deletedAt) : null;
    }

    return this;
  }
}
