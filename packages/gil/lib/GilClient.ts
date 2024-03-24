import { Client, ClientOptions } from "guilded.js";
import { ConsoleAdapter } from "./adapters/logging/ConsoleAdapter";
import { LoggerAdapter } from "./adapters/logging/LoggerAdapter";
import { CommandManager } from "./structures/Command";
import { ListenerManager } from "./structures/Listener";
import { TaskManager } from "./structures/Task";

interface GilClientOptions {
	token: string;
	clientOptions?: ClientOptions;
	customContext?: unknown;
	loggingAdapter?: LoggerAdapter;
	taskDirectory?: string;
	commandDirectory: string;
	listenerDirectory?: string;
}
export class GilClient {
	public readonly client = new Client({
		...this.options.clientOptions,
		token: this.options.token,
	});
	public readonly logger = this.options.loggingAdapter ?? new ConsoleAdapter();

	public readonly commands = new CommandManager(this);
	public readonly listeners = new ListenerManager(this);
	public readonly tasks = new TaskManager(this);

	public constructor(public options: GilClientOptions) {}

	public async start() {
		await this.tasks.init();
		await this.listeners.init();
		await this.commands.init();

		this.logger.info("Starting client...");
		// await this.client.login();
	}
}
