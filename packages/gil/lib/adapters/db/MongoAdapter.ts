// @ts-ignore
import type mongoose from "mongoose";
import { DatabaseAdapter, StoredRole, StoredServer } from "./DatabaseAdapter";

export class MongoAdapter extends DatabaseAdapter {
	serverModel: mongoose.Document;
	serverIdKey: string;
	serverStaffRolesKey: string;

	public constructor(options: {
		serverModel: mongoose.Document;
		serverIdKey: string;
		serverStaffRolesKey: string;
	}) {
		super();

		this.serverModel = options.serverModel;
		this.serverIdKey = options.serverIdKey;
		this.serverStaffRolesKey = options.serverStaffRolesKey;
	}

	public async getServer(serverId: string): Promise<StoredServer | null> {
		const server = await this.serverModel.findOne({
			[this.serverIdKey]: serverId,
		});
		if (!server) return null;

		return {
			server_id: server[this.serverIdKey],
			prefix: server.prefix,
			premium_level: server.premium_level,
		};
	}

	public async getRoles(serverId: string): Promise<StoredRole[]> {
		const server = await this.serverModel.findOne({ [this.serverIdKey]: serverId });
		if (!server) return [];

		if (!(this.serverStaffRolesKey in server)) return [];
		const roles = server[this.serverStaffRolesKey as keyof typeof server] as StoredRole[];

		return roles;
	}
}
