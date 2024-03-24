import { Collection } from "@discordjs/collection";
import GilClient from "../../GilClient";
import Task from "../../structures/Task";

import glob from "fast-glob";

export default class TaskManager {
	public tasks = new Collection<string, Task>();
	public constructor(public readonly client: GilClient) {}

	// TODO: start the tasks
	// TODO: find library for running tasks on a schedule
	public async init(): Promise<void> {
		const files = await glob(`${this.client.options.taskDirectory}/**/*`, {
			dot: true,
			absolute: true,
			concurrency: 10,
		});

		for (const file of files) {
			const imported = await import(file);
			if (!imported.default) {
				this.client.logger.warn(`Task file ${file} does not export a default export.`);
				continue;
			}

			const createdTask: Task = new imported.default(this.client);
			this.tasks.set(createdTask.options.name, createdTask);
		}
	}
}
