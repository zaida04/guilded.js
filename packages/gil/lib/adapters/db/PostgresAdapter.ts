import type postgres from "postgres";
import { DatabaseAdapter, type StoredRole, type StoredServer } from "./DatabaseAdapter";

export class PostgresAdapter extends DatabaseAdapter {
	private pg: postgres.Sql;

	public constructor(
		readonly options: {
			pgInstance: postgres.Sql;
			serverTable: string;
			serverIdKey: string;
			roleTable: string;
		},
	) {
		super();
		this.pg = options.pgInstance;
	}

	public async getServer(serverId: string): Promise<StoredServer | null> {
		const [server] = await this.pg`
            SELECT * FROM ${this.pg(this.options.serverTable)} 
			WHERE ${this.pg(this.options.serverIdKey)} = ${serverId}
        `;
		if (!server) return null;

		return {
			server_id: server[this.options.serverIdKey as keyof StoredServer]!,
			prefix: server.prefix,
			premium_level: server.premium_level,
		};
	}

	public async createServer(serverId: string): Promise<StoredServer> {
		const [server] = await this.pg`
            INSERT INTO ${this.pg(this.options.serverTable)} (${this.pg(this.options.serverIdKey)})
            VALUES (${serverId})
            RETURNING *
        `;
		return server as StoredServer;
	}

	public async getRoles(serverId: string): Promise<StoredRole[]> {
		const roles = await this.pg<StoredRole[]>`
            SELECT * FROM ${this.pg(this.options.roleTable)} WHERE ${this.pg("server_id")} = ${serverId}
        `;
		return roles;
	}
}
