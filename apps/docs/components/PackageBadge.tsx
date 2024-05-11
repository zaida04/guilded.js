import { faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { getUnscopedPackageName } from "../lib/util";

export const PackageBadge = ({ text }: { text: string }) => (
	<Link href={`/docs/${getUnscopedPackageName(text)}`}>
		<div className="flex p-4 mt-2 bg-black rounded-lg max-w-fit transition-transform transform hover:scale-110">
			<FontAwesomeIcon className="text-2xl text-zinc-700 pr-4" icon={faBox} />
			<p className="text-md md:text-xl text-white font-bold">{text}</p>
		</div>
	</Link>
);
