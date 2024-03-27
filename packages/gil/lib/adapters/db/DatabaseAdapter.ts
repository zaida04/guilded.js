export abstract class DatabaseAdapter {
	public abstract getServer(serverId: string): Promise<StoredServer | null>;
	public abstract createServer(serverId: string): Promise<StoredServer>;
	public abstract getRoles(serverId: string): Promise<StoredRole[]>;
}

export interface StoredServer {
	server_id: string;
	prefix: string | null;
	premium_level: string;
}

export interface StoredRole {
	role_id: string;
	server_id: string;
	type: StoredRoleType;
}

export enum StoredRoleType {
	Minimod = "minimod",
	Mod = "mod",
	Admin = "admin",
}
