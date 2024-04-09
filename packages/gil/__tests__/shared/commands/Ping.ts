import { Command, CommandOptions, StoredRoleType } from "../../../lib";

export default class Ping extends Command {
	options = {
		name: "ping",
		description: "Tests the bot.",
	} satisfies CommandOptions;

	public async execute() {
		return "Pong!";
	}
}
