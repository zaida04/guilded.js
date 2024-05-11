import { join } from "node:path";
import "dotenv/config";
import { GilClient } from "../../lib/GilClient";
import { BetterSQLite3Adapter } from "../../lib/adapters/db/BetterSQLite3Adapter";

import sqlite from "better-sqlite3";
import { ConsoleAdapter } from "../../lib";
const database = sqlite("test.db");

const YokiBot = new GilClient({
	token: process.env.TOKEN!,
	commandDirectory: join(__dirname, "..", "shared", "commands"),
	listenerDirectory: join(__dirname, "listeners"),
	loggingAdapter: new ConsoleAdapter(),
	databaseAdapter: new BetterSQLite3Adapter({
		sqliteInstance: database,
		serverTable: "servers",
		serverIdKey: "server_id",
		roleTable: "roles",
	}),
});

database.exec(`
	CREATE TABLE IF NOT EXISTS servers (
		server_id TEXT PRIMARY KEY,
		prefix TEXT DEFAULT '!',
		premium_level INTEGER DEFAULT 0
	);
		
	CREATE TABLE IF NOT EXISTS roles (
		role_id TEXT PRIMARY KEY,
		server_id TEXT,
		role_name TEXT
	);`);
YokiBot.start();
