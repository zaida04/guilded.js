import { Collection } from "@discordjs/collection";
import { Client, ClientOptions } from "guilded.js";
import ConsoleAdapter from "./adapters/logging/ConsoleAdapter";
import LoggerAdapter from "./adapters/logging/LoggerAdapter";
import TaskManager from "./defaults/managers/TaskManager";

interface GilClientOptions {
	token: string;
	clientOptions: ClientOptions;
	customContext: unknown;
	loggingAdapter: LoggerAdapter;
	taskDirectory: string;
}
export default class GilClient {
	public readonly client = new Client({
		...this.options.clientOptions,
		token: this.options.token,
	});
	public readonly logger = this.options.loggingAdapter ?? new ConsoleAdapter();

	public readonly commands = new Collection<string, string>();
	public readonly listeners = new Collection<string, string>();
	public readonly tasks = new TaskManager(this);

	public constructor(public options: GilClientOptions) {}
}
