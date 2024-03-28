import EventEmitter from "node:events";
import { Client, ClientOptions } from "guilded.js";
import TypedEmitter from "typed-emitter";
import { DatabaseAdapter } from "./adapters/db/DatabaseAdapter";
import { ConsoleAdapter } from "./adapters/logging/ConsoleAdapter";
import { LoggerAdapter } from "./adapters/logging/LoggerAdapter";
import { GilEvents } from "./events";
import { CommandManager } from "./structures/Command";
import { ListenerManager } from "./structures/ListenerManager";
import { TaskManager } from "./structures/Task";

interface GilClientOptions {
	token: string;
	clientOptions?: ClientOptions;
	customCommandContext?: (data: { serverId: string; authorId: string; messageId: string }) => Promise<Record<string, unknown>>;
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
}
export class GilClient {
	public readonly client = new Client({
		...this.options.clientOptions,
		token: this.options.token,
	});
	public readonly emitter = new EventEmitter() as TypedEmitter<GilEvents>;
	public readonly logger = this.options.loggingAdapter ?? new ConsoleAdapter();
	public readonly db = this.options.databaseAdapter;
	public readonly commands = new CommandManager(this);
	public readonly listeners = new ListenerManager(this);
	public readonly tasks = new TaskManager(this);

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

	private hookClientInternals() {
		this.client.ws.emitter.on("error", (reason, err, data) => {
			console.log(reason, err, data);
		});
		this.client.ws.emitter.on("exit", this.logger.warn);
		// this.client.ws.emitter.on("debug", this.logger.debug);
	}
}
