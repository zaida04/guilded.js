import WebSocket from "ws";
import { EventEmitter } from "events";
import { ROUTES } from "@guildedjs/common";
import type TypedEmitter from "typed-emitter";
import { SkeletonWSPayload, WSOpCodes } from "@guildedjs/guilded-api-typings";

export default class WebSocketManager {
    /** The version of the websocket to connect to. */
    version = this.options.version ?? 1;

    /** Token used to authenticate requests. */
    token = this.options.token;

    /** The websocket connected to guilded. */
    socket: WebSocket | null = null;

    /** Whether or not this connection is connected and heartbeating. */
    isAlive = false;

    /** The amount of milliseconds the websocket took to respond to the last ping request. */
    ping: number | null = null;

    /** The timestamp in milliseconds of the last ping request. */
    lastPingedAt = 0;

    /** The last message id received. Used in the event of resuming connections. */
    messageId: string | null = null;

    /** The date since the last initial connection was established. */
    connectedAt: Date | null = null;

    /** Emitter in charge of emitting ws gateway related events */
    emitter = new EventEmitter() as TypedEmitter<WebsocketManagerEvents>;

    /** Count of how many times a reconnect has been attempted */
    reconnectAttemptAmount = 0;

    constructor(public readonly options: WebSocketOptions) {
        if (this.options.autoConnect) this.connect();
    }

    /** The url that will be used to connect. Prioritizes proxy url and if not available uses the default base url for guidled. */
    get wsURL() {
        return this.options.proxyURL ?? `wss://${ROUTES.WS_DOMAIN}/v${this.version}/websocket`;
    }

    get reconnectAttemptExceeded() {
        return this.reconnectAttemptAmount >= (this.options.reconnectAttemptLimit ?? Infinity);
    }

    connect() {
        this.socket = new WebSocket(this.wsURL, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });

        this.socket.on("open", this.onSocketOpen.bind(this));

        this.socket.on("message", (data) => {
            this._debug(data);
            this.onSocketMessage(data);
        });

        this.socket.on("error", (err) => {
            this._debug("Gateway connection errored.");
            this.emitter.emit("error", "Gateway Error", err);
            if (!(this.options.autoConnectOnErr ?? true) || this.reconnectAttemptExceeded) {
                this.reconnectAttemptAmount++;
                return this.connect();
            }
            this.destroy();
            this.emitter.emit("exit", "Gateway connection permanently closed due to error.");
        });

        this.socket.on("close", (code: number, reason: string) => {
            this._debug(`Gateway connection terminated with code ${code} for reason: ${reason}`);
            if (!(this.options.autoConnect ?? true) || this.reconnectAttemptExceeded) {
                this.reconnectAttemptAmount++;
                return this.connect();
            }
            this.destroy();
            this.emitter.emit("exit", "Gateway connection permanently closed.");
        });

        this.socket.on("pong", this.onSocketPong.bind(this));
    }

    destroy() {
        if (!this.socket) throw new Error("There is no active connection to destroy.");
        this.socket.removeAllListeners();
        if (this.socket.OPEN) this.socket.close();
    }

    onSocketMessage(packet: WebSocket.Data) {
        this.emitter.emit("raw", packet);
        if (typeof packet !== "string") {
            this.emitter.emit("error", "packet was not typeof string", null);
            return void 0;
        }

        let EVENT_NAME;
        let EVENT_DATA;

        try {
            const data = JSON.parse(packet) as SkeletonWSPayload;
            EVENT_NAME = data.t;
            EVENT_DATA = data;
        } catch (error) {
            this.emitter.emit("error", "ERROR PARSING WS EVENT", error as Error, packet);
            return void 0;
        }

        // SAVE THE ID IF AVAILABLE. USED FOR RESUMING CONNECTIONS.
        if (EVENT_DATA.s) this.messageId = EVENT_DATA.s;

        switch (EVENT_DATA.op) {
            // Normal event based packets
            case WSOpCodes.SUCCESS:
                this.emitter.emit("gatewayEvent", EVENT_NAME, EVENT_DATA);
                break;
            // Auto handled by ws lib
            case WSOpCodes.WELCOME:
                break;
            default:
                this.emitter.emit("unknown", "unknown opcode", packet);
                break;
        }
    }

    onSocketOpen() {
        this.isAlive = true;
        this.connectedAt = new Date();
    }

    onSocketPong() {
        this.ping = Date.now() - this.lastPingedAt;
    }

    _debug(str: any) {
        return this.emitter.emit("debug", str);
    }
}

export interface WebSocketOptions {
    /** The bot's token. */
    token: string;
    /** The base url that the websocket will connect to. */
    proxyURL?: string;
    /** The version of the websocket to connect to. */
    version?: 1;
    /** Whether to connect automatically on instantiation. */
    autoConnect?: boolean;
    /** Whether to try to re-establish connection on error */
    autoConnectOnErr?: boolean;
    /** Limit of how many times a reconnection should be attempted */
    reconnectAttemptLimit?: number;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type WebsocketManagerEvents = {
    debug: (data: any) => unknown;
    raw: (data: any) => unknown;
    error: (reason: string, err: Error | null, data?: any) => unknown;
    exit: (info: string) => unknown;
    unknown: (reason: string, data: any) => unknown;
    reconnect: () => unknown;
    gatewayEvent: (event: string, data: Record<string, any>) => unknown;
};
