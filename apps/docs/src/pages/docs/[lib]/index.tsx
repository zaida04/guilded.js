import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { EntityChildCard } from "../../../components/EntityCard";
import { EntityList } from "../../../components/EntityList";
import { LayoutWrapper } from "../../../components/LayoutWrapper";
import fetchDocs from "../../../lib/loader";
import type { EntityType } from "../../../lib/types";
import { capitalize, getUnscopedPackageName } from "../../../lib/util";

type Props = { entities: { classes: EntityType[], functions: EntityType[], types: EntityType[] }, libName: string }

const mapEntity = (entity: Record<string, any>) => ({ name: entity.name, comment: entity.comment ?? null });
const sortEntity = (a: ReturnType<typeof mapEntity>, b: ReturnType<typeof mapEntity>) => a.name < b.name ? -1 : 1

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const { lib: libName } = ctx.params as { lib: string };

	const docs = await fetchDocs();
	const lib = docs.children!.find(x => x.name.includes(libName))!;

	const classes = lib.children!.filter(x => x.kind === 128).map(mapEntity).sort(sortEntity);
	const functions = lib.children!.filter(x => x.kind === 64).map(mapEntity).sort(sortEntity);
	const types = lib.children!.filter(x => x.kind === 4_194_304).map(mapEntity).sort(sortEntity);
	return { "props": { entities: { classes, functions, types }, libName } }
}

export const getStaticPaths: GetStaticPaths = async () => {
	const docs = await fetchDocs();
	return {
		paths: docs.children!.map(x => `/docs/${getUnscopedPackageName(x.name)}`),
		fallback: false, // can also be true or 'blocking'
	}
}

type propKey = keyof Props["entities"];
const DocsPackage: NextPage<Props> = ({ entities, libName }) => {
	const propsKeys = Object.keys(entities);

	return <LayoutWrapper>
		<div className="my-16 ml-8 md:ml-20 text-white grid grid-cols-none gap-8">
			<h1 className="text-white text-5xl font-bold pb-6">{capitalize(libName)}</h1>
			{propsKeys
				.map(entity =>
					<EntityList entities={entities[entity as propKey]} key={entity} name={entity} />
				)}
		</div>
		<div className="flex justify-center">
			<hr className="w-1/2 h-px bg-guilded border-0" />
		</div>
		<div className="grid place-content-center mt-32 space-y-4">
			{propsKeys
				.map(entity =>
					entities[entity as propKey].map(children =>
						<EntityChildCard entity={entity} entityChild={children} key={entity} libName={libName} />
					)
				)}
		</div>
	</LayoutWrapper>
}

export default DocsPackage