import { Message, UserType } from "guilded.js";
import { GilClient } from "../GilClient";
import { Listener, ListenerContext } from "../structures/Listener";
import { getPrefix } from "../utils/prefix";

export default class MessageListener extends Listener {
	constructor(gil: GilClient) {
		super(gil, { event: "messageCreated", emitter: "gjs" });
	}

	public async execute(ctx: ListenerContext, message: Message) {
		const clientId = this.gil.client.user?.id;
		this.gil.logger.debug(`Received message from ${message.authorId} in ${message.serverId}`, message.id);

		if (!message.serverId) {
			this.gil.logger.debug("Message was not sent in a server", message.id);
			return;
		}
		if (message.authorId === clientId) {
			this.gil.logger.debug("Message was sent by the bot", message.id);
			return;
		}
		if (message.createdByWebhookId || message.authorId === "Ann6LewA") {
			this.gil.logger.debug("Message was sent by a webhook or Ann6LewA", message.id);
			return;
		}

		const server = await this.gil.db.getServer(message.serverId);
		if (!server) {
			this.gil.logger.debug("Server was not found", message.id);
			return;
		}

		const member = await this.gil.client.members.fetch(message.serverId, message.authorId);
		if (!member || member.user?.type === UserType.Bot) {
			this.gil.logger.debug("Member was not found or is a bot", message.id);
			return;
		}

		const prefix = getPrefix(server);
		if (!message.content.startsWith(prefix)) {
			this.gil.logger.debug("Message does not start with prefix", message.id);
			this.gil.emitter.emit("nonCommandMessage", {
				message,
				server,
				member,
			});
			return;
		}

		this.gil.logger.debug("Message starts with prefix", message.id);
		this.gil.emitter.emit("commandMessage", {
			message,
			server,
			member,
			prefix,
		});
	}
}
