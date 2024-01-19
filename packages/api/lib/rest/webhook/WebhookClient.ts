import FormData from "form-data";
import type { APIContent, APIEmbed, RESTPostWebhookBody, RESTPostWebhookResult } from "../../generated/api-typings";
import { RestManager } from "../RestManager";
import {
	type MessageAttachment,
	type WebhookMessageContent,
	parseMessage,
	type parsedMessage,
	transformEmbedToAPIEmbed,
} from "../util/message";
import type { WebhookEmbed } from "./WebhookEmbed";

export class WebhookClient {
	public URL: string;

	public id: string;

	public token: string;

	public username:
		| string
		| null;

	public avatarURL:
		| string
		| null;

	private readonly rest: RestManager;

	public constructor(
		webhookConnection:
			| string
			| {
					id: string;
					token: string;
			  },
		{
			username,
			avatarURL,
		}: {
			avatarURL?: string;
			username?: string;
		} = {},
	) {
		if (
			!webhookConnection
		) {
			throw new TypeError(
				`Must provide Webhook connection info in either string or object. Received ${webhookConnection}.`,
			);
		}

		if (
			typeof webhookConnection ===
			"string"
		) {
			const destructuredWebhookURL =
				/guilded.gg\/webhooks\/(?<id>[^/]+)\/(?<token>[^/]+)/.exec(
					webhookConnection,
				);
			if (
				!destructuredWebhookURL?.length
			) {
				throw new Error(
					"Not a proper guilded webhook URL! Alternatively, you can provide an ID/token",
				);
			}

			const [
				_,
				id,
				token,
			] =
				destructuredWebhookURL;
			this.id =
				id;
			this.token =
				token;
		} else if (
			webhookConnection.id &&
			webhookConnection.token
		) {
			this.id =
				webhookConnection.id;
			this.token =
				webhookConnection.token;
		} else {
			throw new TypeError(
				"You must provide either a webhook URL or a webhook ID & token in an object when constructing the Webhook Client",
			);
		}

		this.URL = `https://media.guilded.gg/webhooks/${this.id}/${this.token}`;
		this.rest =
			new RestManager(
				{
					proxyURL: this
						.URL,
					token: this
						.token,
				},
			);
		this.username =
			username ??
			null;
		this.avatarURL =
			avatarURL ??
			null;
	}

	public async send(
		content: WebhookMessageContent,
		embeds?: (
			| APIEmbed
			| WebhookEmbed
		)[],
		options?: {
			avatarURL?: string;
			files?: MessageAttachment[];
			username?: string;
		},
	): Promise<WebhookExecuteResponse> {
		const contentIsObject =
			typeof content ===
			"object";
		const resEmbeds =
			transformEmbedToAPIEmbed(
				(contentIsObject
					? content.embeds
					: embeds) ??
					[],
			);
		const resFiles =
			contentIsObject
				? content.files
				: options?.files;

		const baseBody: RESTPostWebhookBody =
			contentIsObject
				? {
						...content,
						embeds: resEmbeds,
				  }
				: {
						content,
						embeds: resEmbeds,
						username:
							options?.username ??
							this
								.username ??
							undefined,
						avatar_url:
							options?.avatarURL ??
							this
								.avatarURL ??
							undefined,
				  };

		let body:
			| FormData
			| RESTPostWebhookBody =
			baseBody;
		const formData =
			new FormData();
		if (
			resFiles?.length
		) {
			for (const [
				index,
				value,
			] of resFiles.entries()) {
				formData.append(
					`files[${index}]`,
					value.content,
					{
						filename: value.name,
						filepath: value.path,
					},
				);
			}

			formData.append(
				"payload_json",
				JSON.stringify(
					baseBody,
				),
				{
					contentType: "application/json",
				},
			);
			body =
				formData;
		}

		const data =
			await this.rest.post<
				RESTPostWebhookResult,
				| FormData
				| RESTPostWebhookBody
			>(
				"",
				body,
			);
		const parsedContent =
			parseMessage(
				data.content,
			);

		return {
			...data,
			content: parsedContent.parsedText,
			parsedContent,
			rawContent: data.content,
		} as WebhookExecuteResponse;
	}
}

export type WebhookExecuteResponse = Omit<RESTPostWebhookResult, "content"> & {
	content: string;
	parsedContent: parsedMessage;
	rawContent: APIContent;
};
