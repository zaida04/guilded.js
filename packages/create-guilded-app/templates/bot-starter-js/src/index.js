require("dotenv/config");
if (!process.env.TOKEN) throw new Error("Please supply a Guilded API token in your .env file.");

const { Client, Embed } = require("guilded.js");
const client = new Client({ token: process.env.TOKEN });
const prefix = process.env.PREFIX;

client.on("messageCreated", async (m) => {
	if (m.createdByBotId || !m.content.startsWith(prefix)) return;
	const [commandName, ...args] = m.content.slice(prefix.length).split(" ");
	switch (commandName) {
		case "test": {
			await m.send("TESTING!");
			break;
		}
		case "embed": {
			await m.send(
				new Embed()
					.setTitle("This is a test title!")
					.setDescription("This is a test description")
					.setColor("GREEN")
					.setFooter("This is a test footer", "https://google.com/")
					.setTimestamp()
					.setURL("https://google.com")
					.setAuthor("Test author")
					.addFields([
						{
							name: "Test field 1",
							value: "This is a test field",
							inline: true,
						},
						{
							name: "Test field 2",
							value: "This is a test field",
							inline: true,
						},
						{
							name: "Test field 3",
							value: "This is a test field",
							inline: false,
						},
					]),
			);
			break;
		}
		case "echo": {
			await m.send(args.join(" "));
			break;
		}
	}
});

// client.on("debug", console.log);
client.on("error", console.log);
client.once("ready", () => console.log("Guilded bot is ready!"));
client.on("exit", () => console.log("Disconnected!"));

client.login();
