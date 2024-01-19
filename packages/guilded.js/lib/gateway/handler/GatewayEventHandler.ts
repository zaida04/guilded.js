import type { Client } from "../../structures/Client";

export abstract class GatewayEventHandler {
	constructor(public readonly client: Client) {}
}
