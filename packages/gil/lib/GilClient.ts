import EventEmitter from "node:events";
import { Client, type ClientOptions, type Message } from "guilded.js";
import type TypedEmitter from "typed-emitter";
import type { DatabaseAdapter } from "./adapters/db/DatabaseAdapter";
import { ConsoleAdapter } from "./adapters/logging/ConsoleAdapter";
import type { LoggerAdapter } from "./adapters/logging/LoggerAdapter";
import type { GilEvents } from "./events";
import { CommandManager } from "./structures/Command";
import { ListenerManager } from "./structures/ListenerManager";
import { type DefaultResponseParams, defaultResponses } from "./structures/Responses";
import { TaskManager } from "./structures/Task";
import type { CommandCustomContextFn, CommandErrorHandler } from "./types";

interface GilClientOptions {
	token: string;
	clientOptions?: ClientOptions;
	supportServer?: string;
	contexts?: {
		command: CommandCustomContextFn;
	};
	errorHandler?: {
		command: CommandErrorHandler;
	};
	responses?: typeof defaultResponses;
	// adapters
	loggingAdapter?: LoggerAdapter;
	databaseAdapter: DatabaseAdapter;
	// dirs
	taskDirectory?: string;
	commandDirectory: string;
	listenerDirectory?: string;
	// other
	operators?: string[];
	premiumPrioritys?: string[];
	idGenerator?: () => string;
}
export class GilClient {
	public readonly client = new Client({
		...this.options.clientOptions,
		token: this.options.token,
	});
	public readonly emitter = new EventEmitter() as TypedEmitter<GilEvents>;
	public readonly commands = new CommandManager(this);
	public readonly listeners = new ListenerManager(this);
	public readonly tasks = new TaskManager(this);
	public readonly logger = this.options.loggingAdapter ?? new ConsoleAdapter();
	public readonly db = this.options.databaseAdapter;
	public readonly responses = {
		...defaultResponses,
		...(this.options.responses ?? {}),
	};
	public readonly idGenerator = this.options.idGenerator ?? (() => crypto.randomUUID());

	public constructor(public options: GilClientOptions) {
		if (!options.token) throw new Error("No token provided");
		if (!options.token.startsWith("gapi_")) throw new Error("Invalid token provided");
	}

	public async start() {
		await this.tasks.init();
		await this.listeners.init();
		await this.commands.init();
		this.hookClientInternals();

		this.logger.info("Starting client...");
		await this.client.login();
	}

	public send<T extends keyof typeof defaultResponses>(
		channel: { channelId: string },
		key: T,
		options?: {
			args: DefaultResponseParams[T][0];
		},
	): Promise<Message> {
		const response = this.responses[key];
		const createdResponse = options?.args ? response(options.args as any) : response({} as any);

		return this.client.messages.send(channel.channelId, createdResponse);
	}

	private hookClientInternals() {
		this.client.ws.emitter.on("error", (reason, err, data) => {
			console.log(reason, err, data);
		});
		this.client.ws.emitter.on("exit", this.logger.warn);
		// this.client.ws.emitter.on("debug", this.logger.debug);
	}
}
