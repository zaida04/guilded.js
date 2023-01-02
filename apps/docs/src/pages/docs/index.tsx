import type { GetStaticProps, NextPage } from "next";
import fetchDocs from "../../lib/loader";

type Props = { packages: string[] }
export const getStaticProps: GetStaticProps<Props> = async () => {
	const docs = await fetchDocs();
	const packageNames = docs.children!.map(x => x.name);
	return { "props": { packages: packageNames } }
}

const Docs: NextPage<Props> = ({ packages }) => {
	return <div>
		{
			packages.map(x => <p key={x}>{x}</p>)
		}
	</div>
}

export default Docs