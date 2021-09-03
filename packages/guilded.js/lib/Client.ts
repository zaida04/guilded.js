import { EventEmitter } from "events";

interface ClientOptions {
    /** The bot's token */
    token: string;
}

export class Client extends EventEmitter {
    /** The time in milliseconds the Client connected */
    readyTimestamp = 0;

    /** The options used to create this client */
    options: ClientOptions;

    // TODO: Enable the manager once it is built.
    /** The manager for the bot to make requests to the REST api. */
    // rest: RestManager;

    // TODO: Enable the manager once it is built
    /** The gateway manager for the bot to manage all gateway connections through websockets. */
    // gateway: GatewayManager;

    constructor(public options: ClientOptions) {
        super();

        // TODO: Enable the manager once it is built
        // this.gateway = new GatewayManager();
        // this.rest = new RestManager();
    }

    /** The amount of time the bot has been online in milliseconds. */
    get uptime() {
        return this.readyTimestamp ? Date.now() - this.readyTimestamp : 0;
    }

    /** The bot's token. */
    get token() {
        return this.options.token;
    }

    /** Connects the bot to the api. */
    async connect() {
        return;
    }

    /** Disconnects the bot. */
    async disconnect() {
        return;
    }
}

export default Client;
