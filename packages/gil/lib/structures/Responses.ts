import { Embed, type MessageContent } from "guilded.js";
import { strip } from "../utils/string";
import type { CommandArg } from "./Command";

export type Response = (...args: any[]) => MessageContent;
export type ParamsObject<T> = T extends (...args: infer P) => any ? { [K in keyof P]: P[K] } : never;
export type DefaultResponseParams = {
	[K in keyof typeof defaultResponses]: ParamsObject<(typeof defaultResponses)[K]>;
};

export const defaultResponses = {
	serverNotPremium: (p: { tier: string }) =>
		new Embed().setTitle("This server is not premium").setDescription(`This server does not have premium. To use this command, the server must be on the ${p.tier} tier.`),
	userNotPremium: (p: { tier: string }) => new Embed().setTitle("You are not premium").setDescription(`You do not have premium. To use this command, you must be on the ${p.tier} tier.`),
	userMissingRole: (p: { requiredRole: string[] }) =>
		new Embed().setTitle("You can't run this!").setDescription(`You do not have a role with the ${inlineCode(p.requiredRole.join(", "))} permission.`),
	invalidArguments: (p: { reason_code: string; extra_info: unknown }) => {
		const embed = new Embed().setTitle("Invalid Usage!").setColor("RED");

		switch (p.reason_code) {
			case "MISSING_ARGUMENT": {
				const extra_info = p.extra_info as { argument: CommandArg };
				embed.setDescription(strip`
					You are missing the required argument: ${inlineCode(extra_info.argument.name)}.
					
					It should be of type ${inlineCode(extra_info.argument.type)}.
				`);
				break;
			}
			case "INVALID_NUMBER":
				embed.setDescription("I was unable to understand the number you provided.\n\nPlease ensure your numbers are formatted like so: `123`, `111`, or `1e4`. Do not include commands or decimals.");
				break;
			case "NUMBER_OUT_OF_RANGE":
				embed.setDescription("The number you provided is out of acceptable range.\n\nPlease make sure your number is between `-2,147,483,648` and `2,147,483,647`.");
				break;
			case "BAD_STRING":
				embed.setDescription("You provided an invalid string.");
				break;
			case "INVALID_MEMBER_INPUT":
				embed.setDescription(strip`
					I was expecting a mention or ID of a user. It may look something like this: \`@user\` or \`pmbOB8VA\` 
		
					This user **must** currently be in the server.
					Don't know how to get IDs? Refer to this [Guilded Post](https://support.guilded.gg/hc/en-us/articles/6183962129303-Developer-mode#:~:text=Once%20you've%20enabled%20Developer,by%20right%2Dclicking%20on%20it.).
				`);
				break;
			case "MEMBER_NOT_FOUND":
				embed.setDescription(strip`
					The user you provided was not found. It may look something like this: \`@user\` or \`pmbOB8VA\`

					This user **must** currently be in the server.
				`);
				break;
			case "NO_USER_IN_MENTIONS":
				embed.setDescription("You did not mention a user.");
				break;
			case "INVALID_ROLE_INPUT":
				embed.setDescription(strip`
					I was expecting the mention or ID of a role in this server. It may look something like this: \`@role\` or \`28086957\`
		
					Don't know how to get IDs? Refer to this [Guilded Post](https://support.guilded.gg/hc/en-us/articles/6183962129303-Developer-mode#:~:text=Once%20you've%20enabled%20Developer,by%20right%2Dclicking%20on%20it.).
				`);
				break;
			case "ROLE_NOT_FOUND":
				embed.setDescription(strip`
					The role you provided was not found. It may look something like this: \`@role\` or \`28086957\`

					This role **must** exist in the server.
				`);
				break;
			case "NO_ROLE_IN_MENTIONS":
				embed.setDescription("You did not mention a role.");
				break;
			case "INVALID_CHANNEL_ETC":
				embed.setDescription(strip`
					I was expecting either a mention or ID of a channel. It may look something like this: \`#channel\` or \`8942a219-6fde-49f0-8d11-13974df4681c\`

					**The bot must have read, send, & manage permission on the channel**
					Ensure **none** of the bot's roles deny these permissions.
					
					Don't know how to get IDs? Refer to this [Guilded Post](https://support.guilded.gg/hc/en-us/articles/6183962129303-Developer-mode#:~:text=Once%20you've%20enabled%20Developer,by%20right%2Dclicking%20on%20it.).
				`);
				break;
			case "CHANNEL_NOT_FOUND":
				embed.setDescription(strip`
					The channel you provided was not found. It may look something like this: \`#channel\` or \`8942a219-6fde-49f0-8d11-13974df4681c\`

					This channel **must** exist in the server.
				`);
				break;
			case "NO_CHANNEL_IN_MENTIONS":
				embed.setDescription("You did not mention a channel.");
				break;
			case "INVALID_TIME":
				embed.setDescription("You provided an invalid time. Please ensure your time is formatted like so: `1d`, `1h`, `1m`, or `1s`.");
				break;
			case "INVALID_BOOLEAN":
				embed.setDescription("You provided an invalid boolean. Please ensure your input is either `true` or `false`.");
				break;
			default:
				embed.setDescription("You provided invalid arguments.");
				break;
		}

		return embed;
	},
	errorCommand: (p: { error_message: string; error_id: string; support_server?: string }) =>
		new Embed()
			.setTitle("An error occurred")
			.setColor("RED")
			.setDescription(strip`
				There was an error while running this command. If this issue persists, please ${p.support_server ? `[report it here](${p.support_server})` : "report it to the bot owner"}.
				
				When making your report, please provide this error ID: ${inlineCode(p.error_id)}
			`),
	noop: () => "",
} as const;

export const inlineCode = (str: string) => {
	return `\`${str}\``;
};
