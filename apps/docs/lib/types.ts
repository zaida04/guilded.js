import type { DeclarationReflection } from "typedoc";

export type EntityType = { comment?: { summary: { kind: string; text: string }[] }; name: string };
export type Entity = {
	accessors: DeclarationReflection[];
	constructors: DeclarationReflection[];
	methods: DeclarationReflection[];
	name: string;
	properties: DeclarationReflection[];
};
