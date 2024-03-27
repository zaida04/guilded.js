import { Message, UserType } from "guilded.js";
import { GilClient } from "../GilClient";
import { Listener, ListenerContext } from "../structures/Listener";
import { getPrefix } from "../utils/prefix";

export default class MessageListener extends Listener<"messageCreated"> {
	constructor(gil: GilClient) {
		super(gil, { event: "messageCreated", emitter: "gjs" });
	}

	public async execute(ctx: ListenerContext, message: Message) {
		const clientId = this.gil.client.user?.id;
		if (!message.serverId) return;
		if (message.authorId === clientId) return;
		if (message.createdByWebhookId || message.authorId === "Ann6LewA") return;

		const server = await this.gil.db.getServer(message.serverId);
		const member = await this.gil.client.members.fetch(message.serverId, message.authorId);
		if (!member || member.user?.type === UserType.Bot) return;

		const prefix = getPrefix(server);
		if (!message.content.startsWith(prefix)) {
			this.gil.emitter.emit("nonCommandMessage", {
				message,
				server,
				member,
			});
			return;
		}

		this.gil.emitter.emit("commandMessage", {
			message,
			server,
			member,
			prefix,
		});
	}
}
