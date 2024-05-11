import type { StoredServer } from "../adapters/db/DatabaseAdapter";

export function getPrefix(server: StoredServer) {
	return server.prefix ?? process.env.DEFAULT_PREFIX ?? "!";
}
