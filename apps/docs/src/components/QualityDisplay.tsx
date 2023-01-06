/* eslint-disable @typescript-eslint/switch-exhaustiveness-check */
/* eslint-disable sonarjs/no-nested-switch */
import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import type { ReferenceType, SomeType } from "typedoc/dist/lib/models/types";
import { RefLink } from "./RefLink";

const unionMap = (lib: string) => (input: SomeType) => {
	switch (input.type) {
		case "literal": return String(input.value);
		case "reference": return "id" in input ? <RefLink lib={lib} name={input.name} /> : input.name;
		case "intrinsic": return input.name;
		case "reflection": return <RefLink lib={lib} name={input.declaration?.name} />
		default: return "unknown"
	}
}

const PromiseMapper = ({ signatureType, lib }: { lib: string, signatureType: ReferenceType; }) => <span className="inline">Promise&lt;{
	signatureType.typeArguments?.map(typeArgument => {
		const type = typeArgument.type;

		switch (type) {
			case "intrinsic": {
				return typeArgument.name;
			}

			case "reference": {
				return <RefLink lib={lib} name={typeArgument.name} />
			}

			case "union": {
				return typeArgument.types.map(unionMap(lib)).sort((a, b) => b > a ? 1 : -1).join(" or ");
			}

			default: { return null }
		}
	})
}&gt;</span>

export const QualityDisplay = ({ quality, lib }: { lib: string, quality: DeclarationReflection }): JSX.Element | null => {
	let result: JSX.Element | string = "";

	switch (quality.kind) {
		case 1_024: {
			const qualityType = quality.type;
			if (!qualityType) return null;

			switch (qualityType.type) {
				case "union": {
					result = qualityType.types.map(unionMap(lib)).sort((a, b) => b > a ? 1 : -1).join(" or ");
					break;
				}

				case "reference": {
					result = qualityType.name;
					break;
				}

				case "reflection": {
					const entity = qualityType.declaration;
					result = entity.name === "__type" ? "Object" : <RefLink lib={lib} name={entity.name} />
					break;
				}

				case "intrinsic": {
					result = qualityType.name;
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
					result = getSignatureType.types.map(unionMap(lib)).sort((a, b) => b > a ? -1 : 1).join(" or ");
					break;
				}

				case "reference": {
					result = getSignatureType.name;
					break;
				}

				case "reflection": {
					const entity = getSignatureType.declaration;
					result = <RefLink lib={lib} name={entity.name} />
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
						result = <PromiseMapper lib={lib} signatureType={signatureType} />;
					} else {
						result = signatureType.name;
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

	return <p className="text-guilded text-xl">Type: {result}</p>
}