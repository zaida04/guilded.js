import { Message } from "guilded.js";
import { GilClient } from "../GilClient";
import { Listener, ListenerContext } from "../structures/Listener";

export default class MessageListener extends Listener<"messageCreated"> {
	constructor(gil: GilClient) {
		super(gil, { event: "messageCreated" });
	}

	public async execute(ctx: ListenerContext, message: Message) {
		console.log(ctx, message);
		this.gil.logger.info("Message received!");
	}
}
