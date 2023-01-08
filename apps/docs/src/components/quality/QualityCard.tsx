import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import { QualityDisplay } from "./QualityDisplay";
import { Signature } from "./Signature";

export const QualityCard = ({ quality, lib }: { lib: string, quality: DeclarationReflection }) => {
	const signature = quality.signatures?.[0].comment?.summary;

	if (["#", "_"].some(x => quality.name.startsWith(x))) return null;
	return <div className="min-w-[20rem] md:max-w-6xl border-[1px] border-white p-4 md:p-8" id={quality.name}>
		<Signature lib={lib} quality={quality} />
		<QualityDisplay lib={lib} quality={quality} />
		{signature?.length && !quality.name.startsWith("_") && <p className="text-sm md:text-xl text-white">{signature[0].text}</p>}
	</div>
}