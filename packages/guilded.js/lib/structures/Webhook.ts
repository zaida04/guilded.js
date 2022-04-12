import type { RESTPutServerWebhookBody } from "@guildedjs/guilded-api-typings";
import type { WebhookPayload } from "@guildedjs/guilded-api-typings/dist/v1/structs/Webhook";
import { Base } from "./Base";
import type Client from "./Client";
import type { User } from "./User";

/**
 * Object representing received webhook data. This object is NOT to be used to send data to webhooks. That will be WebhookClient
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
    createdAt: Date;

    /**
     * The date this webhook was deleted if it was deleted
     */
    deletedAt: Date | null = null;

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
        this.createdAt = new Date(data.createdAt);
        this.authorID = data.createdBy;
        this._update(data);
    }

    /** The author of this webhook */
    get user(): User | null {
        return this.client.users.cache.get(this.id) ?? null;
    }

    _update(data: Partial<WebhookPayload>): this {
        if ("name" in data && data.name !== undefined) this.name = data.name;
        if ("channelId" in data && data.channelId !== undefined) this.channelID = data.channelId;
        if ("token" in data && data.token !== undefined) this.token = data.token ?? null;
        if ("deletedAt" in data && data.deletedAt !== undefined) {
            this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        }

        return this;
    }

    update(options: RESTPutServerWebhookBody): Promise<Webhook> {
        return this.client.webhooks.updateWebhook(this.serverId, this.id, options);
    }

    delete(): Promise<this> {
        return this.client.webhooks.deleteWebhook(this.serverId, this.id).then(() => this);
    }
}
