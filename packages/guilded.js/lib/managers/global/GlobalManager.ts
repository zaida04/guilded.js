import type Client from "../../Client";

export default class GlobalManager {
    constructor(public readonly client: Client) {}
}
