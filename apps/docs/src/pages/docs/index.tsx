import type { NextPage } from "next";
import Button from "../../components/Button";
import { LayoutWrapper } from "../../components/LayoutWrapper";
// import { PackageBadge } from "../../components/PackageBadge";
// import fetchDocs from "../../lib/loader.ts.ignore";

type Props = { packages: string[] };
// export const getStaticProps: GetStaticProps<Props> = async () => {
// 	const docs = fetchDocs();
// 	const packageNames = docs.children!.map((x) => x.name);
// 	return { props: { packages: packageNames } };
// };

const Docs: NextPage<Props> = ({ packages }) => {
	return (
		<LayoutWrapper>
			<div className="flex justify-center">
				<div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 w-3/4" role="alert">
					<p className="font-bold">Be Warned</p>
					<p>
						All the docs pages below "Advanced Docs" are currently in development. There will likely be bugs. They're meant to be a simplified version of the typedoc docs, but they will certainly be
						lacking for those who are advanced users.{" "}
						<a className="underline underline-offset-2" href="https://github.com/zaida04/guilded.js/issues">
							<b>Please report bugs here!</b>
						</a>
					</p>
				</div>
			</div>

			<div className="min-h-screen flex items-center flex-col pt-12">
				<h1 className="text-4xl text-white font-bold pb-4">Packages:</h1>
				<a href="https://guildedjs.github.io/">
					<Button>Click here for stable docs (typedoc)</Button>
				</a>
				{/* {packages
					.sort((a, b) => a.length - b.length)
					.map((x) => (
						<PackageBadge key={x} text={x} />
					))} */}
			</div>
		</LayoutWrapper>
	);
};

export default Docs;
