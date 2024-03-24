import GilClient from "../GilClient";

interface TaskOptions {
	// The internal-safe name of the task
	name: string;
	// The interval to run the task. You can put anything that https://github.com/breejs/bree supports.
	// For example, you can use crons like "0 0 * * *" to run the task every day at midnight.
	interval: string;
}
export default abstract class Task<CustomContext extends {}> {
	public constructor(
		public readonly client: GilClient,
		public readonly options: TaskOptions,
	) {}

	public abstract execute(customContext: CustomContext): unknown | Promise<unknown>;
}
