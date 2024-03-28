import { pino } from "pino";
import { LoggerAdapter } from "./LoggerAdapter";

export class PinoAdapter extends LoggerAdapter {
	public constructor(readonly logger = pino()) {
		super();
	}

	public error(error: Error): void {
		this.logger.error(error);
	}

	public warn(message: string): void {
		this.logger.warn(message);
	}

	public info(message: string): void {
		this.logger.info(message);
	}

	// biome-ignore lint/suspicious/noExplicitAny: Allow for verbose logging
	public debug(message: string, decorate?: any): void {
		if (decorate) this.logger.debug(typeof decorate === "string" ? { extra_info: decorate } : decorate, message);
		else this.logger.debug(message);
	}
}
