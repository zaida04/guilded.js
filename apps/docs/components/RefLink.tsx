import Link from "next/link";

export const RefLink = ({ lib, name }: { lib: string; name: string }) => (
	<Link className="hover:underline underline-offset-4" href={`/docs/${lib}/${name}`}>
		{name}
	</Link>
);
