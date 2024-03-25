import { ClientEvents } from "guilded.js";
import { GilClient } from "../GilClient";

type EventHandlerParameters<T> = T extends (...args: infer P) => unknown ? P : never;
interface ListenerOptions<T> {
	event: T;
}
export interface ListenerContext {
	gil: GilClient;
}
export abstract class Listener<E extends keyof ClientEvents> {
	public constructor(
		public readonly gil: GilClient,
		public readonly options: ListenerOptions<E>,
	) {}

	public abstract execute(context: ListenerContext, ...args: EventHandlerParameters<ClientEvents[E]>): unknown | Promise<unknown>;
}
