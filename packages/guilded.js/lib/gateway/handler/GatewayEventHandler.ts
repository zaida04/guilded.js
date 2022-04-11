import type { Client } from "../../structures/Client";

export default abstract class GatewayEventHandler {
    constructor(public readonly client: Client) {}
}
