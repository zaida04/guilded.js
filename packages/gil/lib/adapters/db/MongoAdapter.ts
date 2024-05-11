import type mongoose from "mongoose";
import { DatabaseAdapter, type StoredRole, type StoredServer } from "./DatabaseAdapter";

export class MongoAdapter extends DatabaseAdapter {
	public constructor(
		readonly options: {
			serverModel: typeof mongoose.Model<mongoose.Document>;
			serverIdKey: string;
			serverStaffRolesKey: string;
		},
	) {
		super();
	}

	public async getServer(serverId: string): Promise<StoredServer | null> {
		const server = await this.options.serverModel.findOne({
			[this.options.serverIdKey]: serverId,
		});
		if (!server) return null;

		return {
			server_id: server[this.options.serverIdKey],
			prefix: server.prefix,
			premium_level: server.premium_level,
		};
	}

	public async createServer(serverId: string): Promise<StoredServer> {
		const server = await this.options.serverModel.create({
			[this.options.serverIdKey]: serverId,
			prefix: null,
			premium_level: null,
		});

		return server;
	}

	public async getRoles(serverId: string): Promise<StoredRole[]> {
		const server = await this.options.serverModel.findOne({ [this.options.serverIdKey]: serverId });
		if (!server) return [];

		if (!(this.options.serverStaffRolesKey in server)) return [];
		const roles = server[this.options.serverStaffRolesKey as keyof typeof server] as StoredRole[];

		return roles;
	}
}
