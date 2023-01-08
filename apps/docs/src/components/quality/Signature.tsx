import Link from "next/link";
import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import { unionMap } from "./util";

type ParamTypeValue = { isLink?: boolean, name: string, pkg?: string };
type ParamType = { name: string, type: ParamTypeValue };

const resultTransform = (lib: string) => (param: ParamType, index: number, arr: ParamType[]) => {
	return <span>
		<span>
			{param.name}
		</span>
		:
		{param.type.isLink ?
			<Link className="text-guilded hover:underline underline-offset-2" href={`/docs/${param.type.pkg ?? lib}/${param.type.name}`} key={index}>{param.type.name}</Link>
			: <p className="inline">{param.type.name}</p>}
		{arr.length !== 1 && index !== arr.length - 1 && <p className="inline pr-2">,</p>}
	</span>
}

export const Signature = ({ quality, lib }: { lib: string, quality: DeclarationReflection }) => {
	if (quality.kind === 2_048) {
		const signature = quality.signatures?.[0];
		if (!signature) return null;

		const parameters = signature.parameters;
		if (!parameters) return null

		const resolvedParams: ParamType[] = parameters.map(param => {
			const type = param.type;
			if (!type) return { name: param.name, type: { "name": "unknown" } };

			return { name: param.name, type: unionMap(type) }
		});

		const transformedResult = resolvedParams.map(resultTransform(lib));
		return <h1 className="text-md md:text-3xl text-white">
			.{quality.name}
			<span className="inline">
				({transformedResult})
			</span>
		</h1>
	} else {
		return <h1 className="text-md md:text-3xl text-white">.{quality.name}</h1>
	}
}