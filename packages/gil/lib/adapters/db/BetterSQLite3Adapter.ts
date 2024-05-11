import type sqlite from "better-sqlite3";
import { DatabaseAdapter, type StoredRole, type StoredServer } from "./DatabaseAdapter";

export class BetterSQLite3Adapter extends DatabaseAdapter {
	public constructor(
		readonly options: {
			sqliteInstance: sqlite.Database;
			serverTable: string;
			serverIdKey: string;
			roleTable: string;
		},
	) {
		super();
	}

	public async getServer(serverId: string): Promise<StoredServer | null> {
		const server = this.options.sqliteInstance.prepare(`SELECT * FROM ${this.options.serverTable} WHERE ${this.options.serverIdKey} = ?`).get(serverId) as StoredServer;
		if (!server) return null;

		return {
			server_id: server[this.options.serverIdKey as keyof StoredServer]!,
			prefix: server.prefix,
			premium_level: server.premium_level,
		};
	}

	public async createServer(serverId: string): Promise<StoredServer> {
		const server = this.options.sqliteInstance
			.prepare(
				`INSERT INTO ${this.options.serverTable} (${this.options.serverIdKey}, prefix, premium_level) 
				VALUES (?, ?, ?) 
				RETURNING *`,
			)
			.get(serverId, null, null) as StoredServer;

		return server;
	}

	public async getRoles(serverId: string): Promise<StoredRole[]> {
		const roles = this.options.sqliteInstance.prepare(`SELECT * FROM ${this.options.roleTable} WHERE server_id = ?`).all(serverId) as StoredRole[];

		return roles;
	}
}
