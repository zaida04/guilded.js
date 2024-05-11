import type { GilClient } from "../GilClient";

export abstract class Manager {
	public constructor(public readonly gil: GilClient) {}

	public abstract init(): void | Promise<void>;
}
