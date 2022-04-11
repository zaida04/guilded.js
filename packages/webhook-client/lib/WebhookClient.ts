import { ROUTES } from "@guildedjs/common";
import Embed from "@guildedjs/embeds";
import { APIContent, APIPostWebhookResult } from "@guildedjs/guilded-api-typings";
import { RestManager } from "@guildedjs/rest";

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
        this.URL = `https://${ROUTES.MEDIA_DOMAIN}/webhooks/${this.id}/${this.token}`;
        this.rest = new RestManager({ proxyURL: this.URL, token: this.token });
    }

    /* istanbul ignore next */
    public send(content: string, embeds?: Embed[]): Promise<WebhookExecuteResponse> {
        return this.rest
            .post<APIPostWebhookResult>("", {
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

export interface WebhookExecuteResponse extends Omit<APIPostWebhookResult, "content"> {
    content: string;
    parsedContent: parsedMessage;
    rawContent: APIContent;
}

export default WebhookClient;
