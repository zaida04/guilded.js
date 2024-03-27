export abstract class DatabaseAdapter {
	public abstract getServer(serverId: string): Promise<StoredServer>;
}

export interface StoredServer {
	server_id: string;
	prefix: string | null;
}
