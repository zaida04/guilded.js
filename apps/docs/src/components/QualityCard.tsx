import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import { QualityDisplay } from "./QualityDisplay";

export const QualityCard = ({ quality, lib }: { lib: string, quality: DeclarationReflection }) => {
	const signature = quality.signatures?.[0].comment?.summary;

	if (["#", "_"].some(x => quality.name.startsWith(x))) return null;
	return <div className="min-w-[20rem] md:max-w-6xl border-[1px] border-white p-4 md:p-8" id={quality.name}>
		<h1 className="text-md md:text-3xl text-white">.{quality.name}{quality.kind === 2_048 ? "()" : ""}</h1>
		<QualityDisplay lib={lib} quality={quality} />
		{signature?.length && !quality.name.startsWith("_") && <p className="text-sm md:text-xl text-white">{signature[0].text}</p>}
	</div>
}