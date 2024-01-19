import type { ServerChannelPayload } from "@guildedjs/api";
import type { Client } from "../Client";
import { Channel } from "./Channel";

export class ThreadChannel extends Channel {
	/**
	 * Root channel in the thread hierarchy
	 */
	rootId: string;

	/**
	 * Immediate parent channel of this thread
	 */
	parentId: string;

	/**
	 * Message this thread channel is attached to
	 */
	messageId: string;

	constructor(client: Client, data: ServerChannelPayload) {
		super(client, data);

		this.rootId = data.rootId!;
		this.parentId = data.parentId!;
		this.messageId = data.messageId!;
	}
}
