import type { GilClient } from "../GilClient";

interface ListenerOptions {
	event: string;
	emitter: "gjs" | "gil";
}
export interface ListenerContext {
	gil: GilClient;
}
export abstract class Listener {
	public constructor(
		public readonly gil: GilClient,
		public readonly options: ListenerOptions,
	) {}

	public abstract execute(context: ListenerContext, ...args: unknown[]): unknown | Promise<unknown>;
}
