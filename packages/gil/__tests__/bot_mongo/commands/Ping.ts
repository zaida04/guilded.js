import { Command } from "../../../lib";

export default class Ping extends Command {
	options = {
		name: "ping",
		description: "Tests the bot.",
	};

	public async execute() {
		return "Pong!";
	}
}
