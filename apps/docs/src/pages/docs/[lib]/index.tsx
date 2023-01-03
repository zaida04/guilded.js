import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { LayoutWrapper } from "../../../components/LayoutWrapper";
import fetchDocs from "../../../lib/loader";
import { getUnscopedPackageName } from "../../../lib/util";

type Props = { classes: string[], functions: string[], types: string[] }
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const { lib: libName } = ctx.params as { lib: string };

	const docs = await fetchDocs();
	const lib = docs.children!.find(x => x.name.includes(libName))!;

	const classes = lib.children!.filter(x => x.kind === 128).map(x => x.name);
	const functions = lib.children!.filter(x => x.kind === 64).map(x => x.name);
	const types = lib.children!.filter(x => x.kind === 4_194_304).map(x => x.name);
	return { "props": { classes, functions, types } }
}

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await fetchDocs();
	return {
		paths: docs.children!.map(x => `/docs/${getUnscopedPackageName(x.name)}`),
		fallback: false, // can also be true or 'blocking'
	}
}

const EntityList = ({ name, entity }: { entity: string[], name: string }) => {
	if (!Object.keys(entity).length) return null;

	return <div>
		<h1 className="text-white text-5xl font-bold pb-6 underline underline-offset-8">{name.slice(0, 1).toUpperCase() + name.slice(1)}</h1>
		<div className="grid grid-rows-[auto] grid-cols-3 gap-x-[1rem]">
			{entity.map(entity =>
				<p className="text-xl" key={entity}>{entity}</p>
			)}
		</div>
	</div>
}

const DocsPackage: NextPage<Props> = (props) => {
	return <LayoutWrapper>
		<div className="my-16 ml-20 text-white grid grid-cols-none gap-8">
			{Object
				.keys(props)
				.map(type =>
					<EntityList entity={props[type as keyof typeof props]} key={type} name={type} />
				)}
		</div>
	</LayoutWrapper>
}

export default DocsPackage