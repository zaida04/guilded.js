import type { GetStaticProps, NextPage } from "next";
import { LayoutWrapper } from "../../components/LayoutWrapper";
import { PackageBadge } from "../../components/PackageBadge";
import fetchDocs from "../../lib/loader";

type Props = { packages: string[] }
export const getStaticProps: GetStaticProps<Props> = async () => {
	const docs = await fetchDocs();
	const packageNames = docs.children!.map(x => x.name);
	return { "props": { packages: packageNames } }
}

const Docs: NextPage<Props> = ({ packages }) => {
	return <LayoutWrapper>
		<div className="min-h-screen flex items-center flex-col pt-12">
			<h1 className="text-5xl text-white font-bold pb-4">Packages:</h1>
			{packages.map(x => <PackageBadge key={x} text={x} />)}
		</div>
	</LayoutWrapper>
}

export default Docs