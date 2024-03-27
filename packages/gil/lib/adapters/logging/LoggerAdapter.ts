export abstract class LoggerAdapter {
	public abstract error(error: Error, decorate?: string): void | Promise<void>;
	public abstract warn(message: string, decorate?: string): void | Promise<void>;
	public abstract info(message: string): void | Promise<void>;
	public abstract debug(message: string, decorate?: string): void | Promise<void>;
}
