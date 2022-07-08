/* eslint-disable @typescript-eslint/no-base-to-string */
import { SkeletonWSPayload, WSEvent, WSOpCodes, WSWelcomePayload } from "@guildedjs/guilded-api-typings";
import { EventEmitter } from "events";
import type TypedEmitter from "typed-emitter";
import WebSocket from "ws";

export class WebSocketManager {
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
    lastMessageId: string | null = null;

    /** The date since the last initial connection was established. */
    connectedAt: Date | null = null;

    /** Emitter in charge of emitting ws gateway related events */
    emitter = new EventEmitter() as TypedEmitter<WebsocketManagerEvents>;

    /** Count of how many times a reconnect has been attempted */
    reconnectAttemptAmount = 0;

    constructor(public readonly options: WebSocketOptions) {}

    /** The url that will be used to connect. Prioritizes proxy url and if not available uses the default base url for guidled. */
    get wsURL(): string {
        return this.options.proxyURL ?? `wss://api.guilded.gg/v${this.version}/websocket`;
    }

    get reconnectAttemptExceeded(): boolean {
        return this.reconnectAttemptAmount >= (this.options.reconnectAttemptLimit ?? Infinity);
    }

    get shouldRequestMissedEvents(): boolean {
        return this.options.replayMissedEvents !== false;
    }

    connect(): void {
        this.socket = new WebSocket(this.wsURL, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                "guilded-last-message-id": this.shouldRequestMissedEvents ? this.lastMessageId ?? undefined : undefined,
            },
        });

        this.socket.on("open", this.onSocketOpen.bind(this));
        this.socket.on("ping", this.onSocketPing.bind(this));
        this.socket.on("pong", this.onSocketPong.bind(this));
        this.socket.on("message", (data) => {
            this.emitter.emit("raw", data);
            this._debug(data.toString());
            this.onSocketMessage(data.toString());
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

        this.socket.on("close", (code, reason) => {
            this._debug(`Gateway connection terminated with code ${code} for reason: ${reason.toString()}`);
            if ((this.options.autoConnectOnErr ?? true) && !this.reconnectAttemptExceeded) {
                this.reconnectAttemptAmount++;
                return this.connect();
            }
            this.destroy();
            this.emitter.emit("exit", "Gateway connection permanently closed.");
        });
    }

    destroy(): void {
        if (!this.socket) throw new Error("There is no active connection to destroy.");
        this.socket.removeAllListeners();
        if (this.socket.OPEN) this.socket.close();
        this.isAlive = false;
    }

    _debug(str: any): boolean {
        return this.emitter.emit("debug", `[DEBUG] ${str}`);
    }

    private onSocketMessage(packet: string): void {
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
        if (EVENT_DATA.s) this.lastMessageId = EVENT_DATA.s;

        switch (EVENT_DATA.op) {
            // Normal event based packets
            case WSOpCodes.SUCCESS:
                this.emitter.emit("gatewayEvent", EVENT_NAME as keyof WSEvent, EVENT_DATA);
                break;
            // Auto handled by ws lib
            case WSOpCodes.WELCOME:
                this.emitter.emit("ready", (EVENT_DATA as WSWelcomePayload).d.user);
                break;
            case WSOpCodes.RESUME:
                this.lastMessageId = null;
                break;
            default:
                this.emitter.emit("unknown", "unknown opcode", packet);
                break;
        }
    }

    private onSocketOpen(): void {
        this._debug("Socket connection opened.");
        this.isAlive = true;
        this.connectedAt = new Date();
    }

    private onSocketPing(): void {
        this._debug("Ping received.");
        this.lastPingedAt = Date.now();
        this.socket!.ping();
    }

    private onSocketPong(): void {
        this._debug("Pong received.");
        this.ping = Date.now() - this.lastPingedAt;
    }
}

export interface WebSocketOptions {
    /** The bot's token. */
    token: string;
    /** The base url that the websocket will connect to. */
    proxyURL?: string;
    /** The version of the websocket to connect to. */
    version?: 1;
    /** Whether to try to re-establish connection on error */
    autoConnectOnErr?: boolean;
    /** Limit of how many times a reconnection should be attempted */
    reconnectAttemptLimit?: number;
    /** Whether the manager should request missed events on reconnect */
    replayMissedEvents?: boolean;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type WebsocketManagerEvents = {
    debug: (data: any) => unknown;
    raw: (data: any) => unknown;
    error: (reason: string, err: Error | null, data?: any) => unknown;
    exit: (info: string) => unknown;
    unknown: (reason: string, data: any) => unknown;
    reconnect: () => unknown;
    gatewayEvent: (event: keyof WSEvent, data: SkeletonWSPayload) => unknown;
    ready: (user: WSWelcomePayload["d"]["user"]) => unknown;
};
