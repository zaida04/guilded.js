import { LoggerAdapter } from "./LoggerAdapter";

export class ConsoleAdapter extends LoggerAdapter {
	public error(error: Error): void {
		console.error(`[ERROR] ${error}`);
	}

	public warn(message: string): void {
		console.warn(`[WARN] ${message}`);
	}

	public info(message: string): void {
		console.info(`[INFO] ${message}`);
	}

	public debug(message: string, decorate?: string): void {
		if (decorate) console.debug(`[DEBUG] ${decorate}: ${message}`);
		else console.debug(`[DEBUG] ${message}`);
	}
}
