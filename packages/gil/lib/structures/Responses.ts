import { Embed, MessageContent } from "guilded.js";

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
	noop: () => "",
} as const;

export const inlineCode = (str: string) => {
	return `\`${str}\``;
};
