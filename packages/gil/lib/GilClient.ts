import { Collection } from "@discordjs/collection";
import { Client, ClientOptions } from "guilded.js";

interface GilClientOptions {
	token: string;
	clientOptions: ClientOptions;
	customContext: unknown;
}
export default class GilClient {
	public readonly client = new Client({
		...this.options.clientOptions,
		token: this.options.token,
	});

	public readonly commands = new Collection<string, string>();
	public readonly listeners = new Collection<string, string>();
	public readonly tasks = new Collection<string, string>();

	public constructor(public options: GilClientOptions) {}
}
