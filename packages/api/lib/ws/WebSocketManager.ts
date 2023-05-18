/* eslint-disable @typescript-eslint/no-base-to-string */
import { EventEmitter } from "node:events";
import type TypedEmitter from "typed-emitter";
import WebSocket from "ws";
import type {
	ClientUserData,
	SkeletonWSPayload,
	WSEvent,
	WSEventNames,
	WSPayload,
} from "../generated/api-typings";
import { WSOpCodes } from "../generated/api-typings";
import Heartbeater from "./Heartbeater";

export class WebSocketManager {
	/**
	 * The version of the websocket to connect to.
	 */
	version = this.options.version ?? 1;

	/**
	 * Token used to authenticate requests.
	 */
	token = this.options.token;

	/**
	 * The websocket connected to guilded.
	 */
	socket: WebSocket | null = null;

	/**
	 * Whether or not this connection is connected and heartbeating.
	 */
	isAlive = false;

	/**
	 * The amount of milliseconds the websocket took to respond to the last ping request. This will be zero before the first heartbeat
	 */
	ping = 0;

	/**
	 * The timestamp in milliseconds of the last ping request.
	 */
	lastPingedAt = 0;

	/**
	 * The last message id received. Used in the event of resuming connections.
	 */
	lastMessageId: string | null = null;

	/**
	 * The date since the last initial connection was established.
	 */
	connectedAt: Date | null = null;

	/**
	 * Emitter in charge of emitting ws gateway related events
	 */
	emitter = new EventEmitter() as TypedEmitter<WebsocketManagerEvents>;

	/**
	 * Count of how many times a reconnect has been attempted
	 */
	reconnectAttemptAmount = 0;

	/**
	 * Heartbeating helper
	 */
	heartbeater: Heartbeater | null = null;

	constructor(public readonly options: WebSocketOptions) { }

	/**
	 * The url that will be used to connect. Prioritizes proxy url and if not available uses the default base url for guidled.
	 */
	get wsURL(): string {
		return (
			this.options.proxyURL ?? `wss://www.guilded.gg/websocket/v${this.version}`
		);
	}

	get reconnectAttemptExceeded(): boolean {
		return (
			this.reconnectAttemptAmount >=
			(this.options.reconnectAttemptLimit ?? Number.POSITIVE_INFINITY)
		);
	}

	get shouldReplayMissedEvents(): boolean {
		return this.options.replayMissedEvents !== false;
	}

	get shouldRequestMissedEvents(): boolean {
		return this.shouldReplayMissedEvents && this.lastMessageId !== null;
	}

	connect(): void {
		this._debug(`Connecting to Guilded WS Gateway at url ${this.wsURL}.`);
		const headers: Record<string, string> = {
			Authorization: `Bearer ${this.token}`,
		};

		if (this.shouldRequestMissedEvents) {
			this._debug(
				`Requesting missed events from last message ${this.lastMessageId}.`
			);
			if (this.lastMessageId) {
				headers["guilded-last-message-id"] = this.lastMessageId;
			}
		}

		try {
			this.socket = new WebSocket(this.wsURL, {
				headers,
			});
			this._debug("Socket created.");
		} catch (error) {
			this._debug(`Error creating socket ${(error as Error).message}.`);
			if (!this.shouldRequestMissedEvents && this.lastMessageId) throw error;

			this.lastMessageId = null;
			if (error instanceof Error) {
				this.emitter.emit("error", "Error connecting to socket", error);
			}

			this._handleDisconnect({ blockReconnects: false });
			return;
		}

		this.socket.on("open", this.onSocketOpen.bind(this));
		this.socket.on("ping", this.onSocketPing.bind(this));
		this.socket.on("pong", this.onSocketPong.bind(this));
		this.socket.on("message", (data) => {
			this.emitter.emit("raw", data);
			this.onSocketMessage(data.toString());
		});

		this.socket.on("error", (err) => {
			this._debug(`Error received from WS. ${err.message}`);
			this.emitter.emit("exit", "Gateway connection  closed due to error.");
			this._handleDisconnect({ blockReconnects: true });
		});

		this.socket.on("close", (code, reason) => {
			this.emitter.emit("exit", "Gateway connection closed.");
			this._handleDisconnect({ blockReconnects: false });
		});
	}

	destroy(): void {
		this._debug("Destroying websocket connection.");
		if (!this.socket) {
			throw new Error("There is no active connection to destroy.");
		}

		this.heartbeater?.destroy();
		this.heartbeater = null;

		this.socket.removeAllListeners();
		if (!this.socket.CLOSED && !this.socket.CLOSING) this.socket.close();

		this.socket = null;
		this.isAlive = false;
	}

	_handleDisconnect(opts: { blockReconnects: boolean }): void {
		this._debug(`Received request to disconnect.`);
		this.destroy();
		this._debug(
			`Checking if should reconnect. 
      Reconnect allowed: ${this.options.autoConnectOnErr}. 
      Reconnect attempt ${this.reconnectAttemptAmount}. 
      Reconnect attempt limit ${this.options.reconnectAttemptLimit}.`
		);
		if (
			(!opts.blockReconnects && (this.options.autoConnectOnErr ?? true)) ||
			!this.reconnectAttemptExceeded
		) {
			this._debug("Reconnecting.");
			this.reconnectAttemptAmount++;
			this.connect();
		}
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
			this.emitter.emit(
				"error",
				"ERROR PARSING WS EVENT",
				error as Error,
				packet
			);
			return void 0;
		}

		this._debug(`Received event ${EVENT_NAME}. ${packet}}`);
		// SAVE THE ID IF AVAILABLE. USED FOR RESUMING CONNECTIONS.
		if (EVENT_DATA.s) this.lastMessageId = EVENT_DATA.s;

		switch (EVENT_DATA.op) {
			// Normal event based packets
			case WSOpCodes.SUCCESS: {
				this.emitter.emit(
					"gatewayEvent",
					EVENT_NAME as WSEventNames,
					EVENT_DATA
				);
				break;
			}

			// Auto handled by ws lib
			case WSOpCodes.WELCOME: {
				this._debug("Received welcome packet. Setting up heartbeat.");
				this.heartbeater = new Heartbeater(
					this,
					(EVENT_DATA.d as WSPayload<"_WelcomeMessage">).heartbeatIntervalMs
				);
				this.emitter.emit(
					"ready",
					(EVENT_DATA.d as WSPayload<"_WelcomeMessage">).user as ClientUserData
				);
				break;
			}

			case WSOpCodes.RESUME: {
				this._debug("Received resume packet.");
				this.lastMessageId = null;
				break;
			}

			case WSOpCodes.ERROR: {
				this._debug("Received error packet.");
				this.emitter.emit(
					"error",
					"Error received from WS",
					new Error((EVENT_DATA.d as { message: string }).message)
				);
				this.lastMessageId = null;
				this._handleDisconnect({
					blockReconnects: false,
				});
				break;
			}

			default: {
				this._debug("Received unknown opcode.");
				this.emitter.emit("unknown", "unknown opcode", packet);
				break;
			}
		}
	}

	private onSocketOpen(): void {
		this._debug(
			"Socket has been successfully opened and is ready to receive data."
		);
		this.isAlive = true;
		this.connectedAt = new Date();
	}

	private onSocketPing(): void {
		this._debug(`Ping request from Guilded received. Responding with a pong.`);
		this.socket!.pong();
	}

	private onSocketPong(): void {
		this.ping = Date.now() - this.lastPingedAt;
		this._debug(
			`Pong response from Guilded received. Latency: ${this.ping}ms.`
		);
	}
}

export type WebSocketOptions = {
	/**
	 * Whether to try to re-establish connection on error
	 */
	autoConnectOnErr?: boolean;
	/**
	 * The base url that the websocket will connect to.
	 */
	proxyURL?: string;
	/**
	 * Limit of how many times a reconnection should be attempted
	 */
	reconnectAttemptLimit?: number;
	/**
	 * Whether the manager should request missed events on reconnect
	 */
	replayMissedEvents?: boolean;
	/**
	 * The bot's token.
	 */
	token: string;
	/**
	 * The version of the websocket to connect to.
	 */
	version?: 1;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type WebsocketManagerEvents = {
	debug(data: any): unknown;
	error(reason: string, err: Error | null, data?: any): unknown;
	exit(info: string): unknown;
	gatewayEvent(event: keyof WSEvent, data: SkeletonWSPayload): unknown;
	raw(data: any): unknown;
	ready(
		user: WSPayload<"_WelcomeMessage">["user"] & {
			createdBy: string;
			botId: string;
		}
	): unknown;
	reconnect(): unknown;
	unknown(reason: string, data: any): unknown;
};
