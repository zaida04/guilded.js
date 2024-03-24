import { Collection } from "@discordjs/collection";
import glob from "fast-glob";
import { GilClient } from "../GilClient";
import { Manager } from "./Manager";

interface TaskOptions {
	// The internal-safe name of the task
	name: string;
	// The interval to run the task. You can put anything that https://github.com/breejs/bree supports.
	// For example, you can use crons like "0 0 * * *" to run the task every day at midnight.
	interval: string;
}
export abstract class Task {
	public constructor(
		public readonly gil: GilClient,
		public readonly options: TaskOptions,
	) {}

	public abstract execute(): unknown | Promise<unknown>;
}

export class TaskManager extends Manager {
	public tasks = new Collection<string, Task>();

	// TODO: start the tasks
	// TODO: find library for running tasks on a schedule
	public async init(): Promise<void> {
		if (!this.gil.options.taskDirectory) {
			this.gil.logger.warn("No task directory provided, skipping task initialization.");
			return;
		}

		this.gil.logger.info("Loading tasks...");
		const files = await glob(`${this.gil.options.taskDirectory}/**/*`, {
			dot: true,
			absolute: true,
			concurrency: 10,
		});

		for (const file of files) {
			const imported = await import(file);
			if (!imported.default) {
				this.gil.logger.warn(`Task file ${file} does not export a default export.`);
				continue;
			}

			const createdTask: Task = new imported.default(this.gil);
			this.gil.logger.info(`Task ${createdTask.options.name} loaded.`);
			this.tasks.set(createdTask.options.name, createdTask);
		}
	}
}
