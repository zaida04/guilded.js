require("dotenv/config");
if (!process.env.TOKEN) throw new Error("Please supply a Guilded API token in your .env file.");

const { Collection } = require("@discordjs/collection");
const { readdir } = require("fs/promises");
const { join } = require("path");
const { Client } = require("guilded.js");

const client = new Client({ token: process.env.TOKEN });
const prefix = process.env.PREFIX;
const commands = new Collection();

client.on("messageCreated", async (msg) => {
	if (!msg.content.startsWith(prefix)) return;
	let [commandName, ...args] = msg.content.slice(prefix.length).trim().split(/ +/);
	commandName = commandName.toLowerCase();

	const command = commands.get(commandName) ?? commands.find((x) => x.aliases?.includes(commandName));
	if (!command) return;

	try {
		await command.execute(msg, args);
	} catch (e) {
		void client.messages.send(msg.channelId, "There was an error executing that command!");
		void console.error(e);
	}
});

// client.on("debug", console.log);
client.on("error", console.log);
client.on("ready", () => console.log("Guilded bot is ready!"));
client.on("exit", () => console.log("Disconnected!"));

void (async () => {
	// read the commands dir and have the file extensions.
	const commandDir = await readdir(join(__dirname, "commands"), {
		withFileTypes: true,
	});

	// go through all the files/dirs scanned from the readdir, and make sure we only have js files
	for (const file of commandDir.filter((x) => x.name.endsWith(".js"))) {
		console.log(file.name);
		const command = require(join(__dirname, "commands", file.name));
		commands.set(command.name, command);
	}

	client.login();
})();
