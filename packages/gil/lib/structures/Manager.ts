import GilClient from "../GilClient";

export default abstract class Manager {
	public constructor(public readonly client: GilClient) {}

	public abstract init(): void | Promise<void>;
}
