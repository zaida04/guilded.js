import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fetchDocs from "../../../lib/loader";

type Props = { entity: string }
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const { lib, entity } = ctx.params as { entity: string, lib: string; };

	const docs = await fetchDocs();
	const entityLookup = docs.children!.find(x => x.name === lib)!.children!.find(x => x.name === entity)!.name
	return { "props": { entity: entityLookup } }
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const docs = await fetchDocs();
	return {
		paths: docs.children!.flatMap(x => x.children!.map(y => ({ params: { lib: x.name, entity: y.name } }))),
		fallback: false, // can also be true or 'blocking'
	}
}

const DocksEntity: NextPage<Props> = ({ entity }) => {
	return <div>
		{entity}
	</div>
}

export default DocksEntity;