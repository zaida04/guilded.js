import Link from "next/link";
import { getUnscopedPackageName } from "../lib/util";

export const PackageBadge = ({ text }: { text: string }) =>
	<Link href={`/docs/${getUnscopedPackageName(text)}`}>
		<div className="p-4 mt-2 bg-black rounded-lg max-w-fit transition-transform transform hover:scale-110">
			<p className="text-xl text-white font-bold">{text}</p>
		</div>
	</Link>