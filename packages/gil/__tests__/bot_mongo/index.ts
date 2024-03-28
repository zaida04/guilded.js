import { join } from "path";
import "dotenv/config";
import { GilClient } from "../../lib/GilClient";
import { MongoAdapter } from "../../lib/adapters/db/MongoAdapter";

import mongoose from "mongoose";
import { ConsoleAdapter } from "../../lib";
import Server from "./db/Server";

mongoose.connect("mongodb://guildedjs:testpass@localhost:27017/", {
	connectTimeoutMS: 5000,
	retryWrites: true,
	retryReads: true,
	waitQueueTimeoutMS: 5000,
	socketTimeoutMS: 5000,
});

const YokiBot = new GilClient({
	token: process.env.TOKEN!,
	commandDirectory: join(__dirname, "..", "shared", "commands"),
	listenerDirectory: join(__dirname, "listeners"),
	loggingAdapter: new ConsoleAdapter(),
	databaseAdapter: new MongoAdapter({
		serverModel: Server,
		serverIdKey: "server_id",
		serverStaffRolesKey: "staff_roles",
	}),
});

YokiBot.start();
