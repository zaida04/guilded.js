import { Command, CommandOptions, StoredRoleType } from "../../../lib";

export default class Ping extends Command {
	options = {
		name: "ping",
		description: "Tests the bot.",
		userRole: StoredRoleType.Admin,
	} satisfies CommandOptions;

	public async execute() {
		return "Pong!";
	}
}
