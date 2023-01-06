import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import { LayoutWrapper } from "../../../components/LayoutWrapper";
import { Qualities } from "../../../components/Qualities";
import { QualityCard } from "../../../components/QualityCard";
import fetchDocs from "../../../lib/loader";
import type { Entity } from "../../../lib/types";
import { capitalize } from "../../../lib/util";

type Props = {
	entity: Entity;
	lib: string;
};
export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
	const { lib, entity } = ctx.params as { entity: string; lib: string };

	const docs = await fetchDocs();
	const entityLookup = docs.children!.find((x) => x.name === lib)!.children!.find((x) => x.name === entity);
	if (!entityLookup) return { notFound: true };

	const properties = (entityLookup.children?.filter((x) => x.kind === 1_024) ?? []) as DeclarationReflection[];
	const accessors = (entityLookup.children?.filter((x) => x.kind === 262_144) ?? []) as DeclarationReflection[];
	const methods = (entityLookup.children?.filter((x) => x.kind === 2_048) ?? []) as DeclarationReflection[];
	const constructors = (entityLookup.children?.filter((x) => x.kind === 512) ?? []) as DeclarationReflection[];

	return { props: { entity: { name: entityLookup.name, properties, accessors, methods, constructors }, lib } };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const docs = await fetchDocs();
	return {
		paths: docs.children!.flatMap((x) => x.children!.map((y) => ({ params: { lib: x.name, entity: y.name } }))),
		fallback: false, // can also be true or 'blocking'
	};
};

const DocksEntity: NextPage<Props> = ({ entity, lib }) => {
	const qualities: Record<string, DeclarationReflection[]> = {
		// eslint-disable-next-line @typescript-eslint/require-array-sort-compare
		"properties": [...entity.accessors, ...entity.properties].sort((a, b) => a.name > b.name ? 1 : -1),
		"methods": [...entity.methods],
	};

	return <LayoutWrapper>
		<div className="my-16 ml-8 md:ml-20 grid grid-cols-none gap-8">
			<h1 className="text-white text-5xl font-bold pb-6">{capitalize(entity.name)}</h1>
			{Object.keys(qualities).map(x => <Qualities key={x} name={x} qualities={qualities[x]} />)}
		</div>
		<div className="flex justify-center">
			<hr className="w-1/2 h-px bg-guilded border-0" />
		</div>
		<div className="grid place-content-center mt-32 space-y-4">
			{Object.keys(qualities)
				.map(qualityKey =>
					qualities[qualityKey].map(quality => <QualityCard key={quality.name} lib={lib} quality={quality} />)
				)}
		</div>
	</LayoutWrapper>
};

export default DocksEntity;
