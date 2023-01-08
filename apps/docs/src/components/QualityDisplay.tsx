/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
/* eslint-disable sonarjs/no-nested-switch */
import Link from "next/link";
import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import type { ReferenceType, SomeType } from "typedoc/dist/lib/models/types";
import type { TypeParameterReflection } from "typedoc/dist/lib/serialization/schema";
import { RefLink } from "./RefLink";

const unionMap = (input: SomeType): Type => {
	switch (input.type) {
		case "literal": return { name: String(input.value) }
		case "reference": return "id" in input ? { name: input.name, isLink: true } : { name: input.name };
		case "intrinsic": return { name: input.name };
		case "reflection": return { name: input.declaration?.name, isLink: true };
		default: return { name: "unknown" }
	}
}

type Type = { isLink?: boolean, name: string };
const resultTransform = (lib: string) => (type: Type) => {
	if (type.isLink) return <Link className="hover:underline underline-offset-2" href={`/docs/${lib}/${type.name}`}>{type.name}</Link>
	else return <span>{type.name}</span>
}

export const QualityDisplay = ({ quality, lib }: { lib: string, quality: DeclarationReflection }): JSX.Element | null => {
	let result: { isPromise?: boolean, types: Type[] } | null = null;

	switch (quality.kind) {
		case 1_024: {
			const qualityType = quality.type;
			if (!qualityType) return null;

			switch (qualityType.type) {
				case "union": {
					result = { types: qualityType.types.map(unionMap) };
					break;
				}

				case "reference": {
					result = { types: [{ "name": qualityType.name }] };
					break;
				}

				case "reflection": {
					const entity = qualityType.declaration;
					const is__type = entity.name === "__type";
					result = { types: [{ "name": is__type ? "Object" : entity.name, isLink: !is__type }] }
					break;
				}

				case "intrinsic": {
					result = { types: [{ name: qualityType.name }] };
					break;
				}
			}

			break;
		}

		case 262_144: {
			const getSignature = quality.getSignature;
			if (getSignature?.kind !== 524_288) return null;

			const getSignatureType = getSignature.type;
			switch (getSignatureType?.type) {
				case "union": {
					result = { types: getSignatureType.types.map(unionMap) };
					break;
				}

				case "reference": {
					result = { types: [{ name: getSignatureType.name }] };
					break;
				}

				case "reflection": {
					const entity = getSignatureType.declaration;
					result = { types: [{ name: entity.name, isLink: true }] };
				}
			}

			break;
		}

		case 2_048: {
			const signature = quality.signatures?.[0];
			if (!signature) return null;
			if (signature.kind !== 4_096) return null;

			const signatureType = signature.type;
			switch (signatureType?.type) {
				case "reference": {
					if (signatureType.name === "Promise") {
						result = { isPromise: true, types: signatureType.typeArguments!.map(unionMap) }
					} else {
						result = { types: [{ name: signatureType.name }] };
					}

					break;
				}
			}

			break;
		}

		default: {
			return null;
		}
	}

	if (!result) return null;

	// i like having string in front of null, looks better.
	result.types.sort((a, b) => {
		const priorityChars = ["s"];
		if (priorityChars.some(char => a.name.startsWith(char) && !b.name.startsWith(char))) return -1;
		if (priorityChars.some(char => b.name.startsWith(char) && !a.name.startsWith(char))) return -1;

		return a.name > b.name ? 1 : -1
	});

	for (let index = 0; index < result.types.length; index++) {
		if (index === 0 || index % 2 === 0) continue;
		result.types.splice(index, 0, { name: "or " });
	}

	return <div className="text-guilded text-xl flex">Type: <span className="pl-2 flex space-x-2">{result.isPromise && "Promise<"}{result.types.map(resultTransform(lib))}{result.isPromise && ">"}</span></div>
}