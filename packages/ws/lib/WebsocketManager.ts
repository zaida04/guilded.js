import WebSocket from "ws";

export interface WebSocketOptions {
    /** The bot's token. */
    token: string;
    /** The base url that the websocket will connect to. */
    proxyURL?: string;
    /** The version of the websocket to connect to. */
    version?: 1;
    /** Whether to connect automatically on instantiation. */
    autoConnect?: boolean;
    /** The callback handler that will run when a event packet is received. */
    handleEventPacket: (packet: WebsocketPayload) => any;
}

export enum WebsocketOpCodes {
    Dispatch,
    Welcome,
    Eight = 8,
    Nine,
}

export type WebsocketEventNames = "ChatMessageCreated" | "ChatMessageUpdated" | "ChatMessageDeleted" | "TeamMemberUpdated" | "teamRolesUpdated";

export interface WebsocketPayload {
    /** An operation code corresponding to the nature of the sent message (for example, success, failure, etc.) */
    op: WebsocketOpCodes;
    /** Data of any form depending on the underlying event */
    d?: Record<string, unknown>;
    /** Message ID used for replaying events after a disconnect */
    s?: string;
    /** Event name for the given message */
    t?: WebsocketEventNames;
}

export default class WebSocketManager {
    /** The options used to instantiate the WebSocket manager. */
    options: WebSocketOptions;

    /** The base url that the websocket will connect to. */
    baseURL = "wss://api.guilded.gg/";

    /** The version of the websocket to connect to. */
    version = 1;

    /** The websocket connected to guilded. */
    socket!: WebSocket;

    /** Whether or not this connection is connected and heartbeating. */
    isAlive = false;

    /** The amount of milliseconds the websocket took to respond to the last ping request. */
    ping = 0;

    /** The timestamp in milliseconds of the last ping request. */
    lastPingedAt = 0;

    /** The last message id received. Used in the event of resuming connections. */
    messageId = "";

    constructor(options: WebSocketOptions) {
        this.options = options;

        this.onPacket = this.onPacket.bind(this);
        this.onSocketOpen = this.onSocketOpen.bind(this);
        this.onSocketMessage = this.onSocketMessage.bind(this);
        this.onSocketError = this.onSocketError.bind(this);
        this.onSocketClose = this.onSocketClose.bind(this);
        this.onSocketPong = this.onSocketPong.bind(this);

        if (options.autoConnect) this.connect();
    }

    /** The bot's token. */
    get token() {
        return this.options.token;
    }

    /** The proxy url that the websocket will connect to if provided. */
    get proxyURL() {
        return this.options.proxyURL;
    }

    /** The url that will be used to connect. Prioritizes proxy url and if not available uses the default base url for guidled. */
    get wsURL() {
        return this.proxyURL ?? `${this.baseURL}v${this.version}/websocket`;
    }

    connect() {
        this.socket = new WebSocket("wss://api.guilded.gg/v1/websocket", {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        this.socket.on("open", this.onSocketOpen);
        this.socket.on("message", this.onSocketMessage);
        this.socket.on("error", this.onSocketError);
        this.socket.on("close", this.onSocketClose);
        this.socket.on("pong", this.onSocketPong);
    }

    onPacket(packet: WebsocketPayload) {
        // TODO: raw event here somehow
        // console.log("RAW", packet);

        // SAVE THE ID IF AVAILABLE. USED FOR RESUMING CONNECTIONS.
        if (packet.s) this.messageId = packet.s;

        switch (packet.op) {
            // Normal event based packets
            case WebsocketOpCodes.Dispatch:
                this.options.handleEventPacket(packet);
                break;
            // Auto handled by ws lib
            case WebsocketOpCodes.Welcome:
                break;
        }
    }

    onSocketClose(code: number, reason: string) {
        console.log(`[Websocket] Closed with code: ${code} for reason: ${reason}`);
        // RECONNECT WHEN CONNECTION IS CLOSED
        this.connect();
    }

    onSocketError(error: Error) {
        console.log(error);
        // RECONNECT WHEN CONNECTION ERRORS
        this.connect();
    }

    onSocketMessage(data: WebSocket.Data) {
        if (typeof data !== "string") return console.log("data from websocket was not of type string");

        try {
            const payload = JSON.parse(data);
            this.onPacket(payload);
        } catch (error) {
            console.log(error);
        }
    }

    onSocketOpen() {
        this.isAlive = true;
    }

    onSocketPong() {
        this.isAlive = true;
        this.ping = Date.now() - this.lastPingedAt;
    }
}

export interface WelcomePayload {
    op: 1;
    d: {
        heartbeatIntervalMs: number;
        lastMessageId: string;
    };
}
