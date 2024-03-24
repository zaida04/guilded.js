import { LoggerAdapter } from "./LoggerAdapter";

export class ConsoleAdapter extends LoggerAdapter {
	public error(message: string): void {
		console.error(`[ERROR] ${message}`);
	}

	public warn(message: string): void {
		console.warn(`[WARN] ${message}`);
	}

	public info(message: string): void {
		console.info(`[INFO] ${message}`);
	}

	public debug(message: string): void {
		console.debug(`[DEBUG] ${message}`);
	}
}
