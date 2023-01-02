import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import fetchDocs from "../../../lib/loader";

type Props = { classes: string[], functions: string[], types: string[] }
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const { libs } = ctx.params as { libs: string };

	const docs = await fetchDocs();
	const lib = docs.children!.find(x => x.name === libs)!;

	const classes = lib.children!.filter(x => x.kind === 128).map(x => x.name);
	const functions = lib.children!.filter(x => x.kind === 64).map(x => x.name);
	const types = lib.children!.filter(x => x.kind === 4_194_304).map(x => x.name);
	return { "props": { classes, functions, types } }
}

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await fetchDocs();
	return {
		paths: docs.children!.map(x => x.name),
		fallback: false, // can also be true or 'blocking'
	}
}


const DocsPackage: NextPage<Props> = (props) => {
	return <div>
		{
			Object.keys(props).map(type =>
				<div key={type}>
					<h1 className="text-3xl">{type}</h1>
					{props[type as keyof Props].map(entity =>
						<p className="text-md" key={entity}>{entity}</p>
					)}
				</div>
			)
		}
	</div>
}

export default DocsPackage