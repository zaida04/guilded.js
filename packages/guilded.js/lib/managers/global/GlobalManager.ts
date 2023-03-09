import type { Client } from "../../structures/Client";

/**
 * Represents any manager.
 */
export class GlobalManager {
    constructor(public readonly client: Client) {}
}
