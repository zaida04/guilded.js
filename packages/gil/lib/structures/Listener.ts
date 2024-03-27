import { GilClient } from "../GilClient";

interface ListenerOptions<T> {
	event: T;
	emitter: "gjs" | "gil";
}
export interface ListenerContext {
	gil: GilClient;
}
export abstract class Listener<E extends string> {
	public constructor(
		public readonly gil: GilClient,
		public readonly options: ListenerOptions<E>,
	) {}

	public abstract execute(context: ListenerContext, ...args: unknown[]): unknown | Promise<unknown>;
}
