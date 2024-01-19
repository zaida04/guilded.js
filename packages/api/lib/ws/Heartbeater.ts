import type { WebSocketManager } from "./WebSocketManager";

export default class Heartbeater {
	public heartbeatInterval: NodeJS.Timeout;

	public constructor(
		public readonly ws: WebSocketManager,
		public heartbeatIntervalMs: number,
	) {
		this.heartbeatInterval =
			setInterval(
				() => {
					this.ws._debug(
						"Sending heartbeat to Guilded.",
					);
					this.ws.lastPingedAt =
						Date.now();
					this.ws.socket?.ping();
				},
				this
					.heartbeatIntervalMs,
			);
	}

	public destroy(): void {
		clearInterval(
			this
				.heartbeatInterval,
		);
		this.ws.lastPingedAt =
			-1;
	}
}
