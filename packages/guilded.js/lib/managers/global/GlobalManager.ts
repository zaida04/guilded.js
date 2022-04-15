import type { Client } from "../../structures/Client";

export class GlobalManager {
    constructor(public readonly client: Client) {}
}
