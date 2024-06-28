import { Collection } from "@discordjs/collection";
import glob from "fast-glob";
import { GilClient } from "../GilClient";
import { Manager } from "./Manager";
import Cron from "node-cron";

interface TaskOptions {
	// The internal-safe name of the task
	name: string;
	// A cron representing the interval at which the task should run.
	interval: string;
	// Whether the task should run immediately upon startup.
	runImmediately?: boolean;
}
export abstract class Task {
	public constructor(
		public readonly gil: GilClient,
		public readonly options: TaskOptions,
	) { }

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
		if (!files.length) return this.gil.logger.warn("Despite providing a task directory, no tasks were found.");

		for (const file of files) {
			const imported = await import(file);
			if (!imported.default) {
				this.gil.logger.warn(`Task file ${file} does not export a default export.`);
				continue;
			}

			const createdTask: Task = new imported.default(this.gil);
			this.gil.logger.info(`Task ${createdTask.options.name} loaded.`);
			this.tasks.set(createdTask.options.name, createdTask);

			if (createdTask.options.runImmediately) {
				this.gil.logger.info(`Running task ${createdTask.options.name} immediately.`);
				createdTask.execute();
			}

			Cron.schedule(createdTask.options.interval, createdTask.execute.bind(createdTask));
		}
	}
}
