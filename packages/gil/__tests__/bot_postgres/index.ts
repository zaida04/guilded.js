import { join } from "path";
import "dotenv/config";
import { GilClient } from "../../lib/GilClient";

import postgres from "postgres";
import { ConsoleAdapter } from "../../lib";
import { PostgresAdapter } from "../../lib/adapters/db/PostgresAdapter";

const sql = postgres({
	user: "guildedjs",
	password: "testpass",
	database: "guildedjs",
	host: "localhost",
});

const YokiBot = new GilClient({
	token: process.env.TOKEN!,
	commandDirectory: join(__dirname, "..", "shared", "commands"),
	listenerDirectory: join(__dirname, "listeners"),
	loggingAdapter: new ConsoleAdapter(),
	databaseAdapter: new PostgresAdapter({
		pgInstance: sql,
		roleTable: "roles",
		serverTable: "servers",
		serverIdKey: "server_id",
	}),
});

async function startBot() {
	await sql`
        CREATE TABLE IF NOT EXISTS servers (
            server_id TEXT PRIMARY KEY,
            prefix TEXT DEFAULT '!',
            premium_level INTEGER DEFAULT 0
        );
    `;

	await sql`
        CREATE TABLE IF NOT EXISTS roles (
            role_id TEXT PRIMARY KEY,
            server_id TEXT,
            role_name TEXT,
            role_level INTEGER
        );
    `;
	YokiBot.start();
}

startBot();
