export default abstract class LoggerAdapter {
	public abstract error(message: string): void | Promise<void>;
	public abstract warn(message: string): void | Promise<void>;
	public abstract info(message: string): void | Promise<void>;
	public abstract debug(message: string): void | Promise<void>;
}
