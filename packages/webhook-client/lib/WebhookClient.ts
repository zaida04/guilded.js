import type { RESTPostWebhookResult } from "@guildedjs/guilded-api-typings";
import type { APIContent } from "@guildedjs/guilded-api-typings/dist/v1/structs/Webhook";
import { RestManager } from "@guildedjs/rest";

import type { Embed } from "./Embed";
import { type parsedMessage, parseMessage } from "./messageUtil";

export class WebhookClient {
    public URL: string;

    public id: string;

    public token: string;

    private rest: RestManager;

    public constructor(webhookConnection: string | { id: string; token: string }) {
        if (!webhookConnection) {
            throw new TypeError(`Must provide Webhook connection info in either string or object. Received ${webhookConnection}.`);
        }
        if (typeof webhookConnection === "string") {
            const destructuredWebhookURL = webhookConnection.match(/guilded.gg\/webhooks\/([^/]+)\/([^/]+)/);
            if (!destructuredWebhookURL?.length) {
                throw new Error("Not a proper guilded webhook URL! Alternatively, you can provide an ID/token");
            }
            const [_, id, token] = destructuredWebhookURL;
            this.id = id;
            this.token = token;
        } else if (webhookConnection.id && webhookConnection.token) {
            this.id = webhookConnection.id;
            this.token = webhookConnection.token;
        } else {
            throw new TypeError("You must provide either a webhook URL or a webhook ID & token in an object when constructing the Webhook Client");
        }
        this.URL = `https://media.guilded.gg/webhooks/${this.id}/${this.token}`;
        this.rest = new RestManager({ proxyURL: this.URL, token: this.token });
    }

    public send(content: string, embeds?: Embed[]): Promise<WebhookExecuteResponse> {
        return this.rest
            .post<RESTPostWebhookResult>("", {
                content,
                embeds,
            })
            .then((data) => {
                const parsedContent = parseMessage(data.content);
                return {
                    ...data,
                    content: parsedContent.parsedText,
                    parsedContent,
                    rawContent: data.content,
                } as WebhookExecuteResponse;
            });
    }
}

export interface WebhookExecuteResponse extends Omit<RESTPostWebhookResult, "content"> {
    content: string;
    parsedContent: parsedMessage;
    rawContent: APIContent;
}
