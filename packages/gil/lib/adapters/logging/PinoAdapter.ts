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

	public debug(message: string, decorate?: string): void {
		if (decorate) this.logger.debug(`[DEBUG] ${decorate}: ${message}`);
		else this.logger.debug(`[DEBUG] ${message}`);
	}
}
