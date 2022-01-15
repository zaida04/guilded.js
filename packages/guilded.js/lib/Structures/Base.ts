import Client from "../Client";

export default class Base {
    /** The client itself. */
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }
}
