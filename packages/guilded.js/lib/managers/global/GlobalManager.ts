import type Client from "../../structures/Client";

export default class GlobalManager {
    constructor(public readonly client: Client) {}
}
