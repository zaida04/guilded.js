import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { DeclarationReflection } from "typedoc/dist/lib/models/reflections/declaration";
import fetchDocs from "../../../lib/loader";

type Props = {
    entity: {
        accessors: DeclarationReflection[];
        constructors: DeclarationReflection[];
        methods: DeclarationReflection[];
        name: string;
        properties: DeclarationReflection[];
    };
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

    return { props: { entity: { name: entityLookup.name, properties, accessors, methods, constructors } } };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const docs = await fetchDocs();
    return {
        paths: docs.children!.flatMap((x) => x.children!.map((y) => ({ params: { lib: x.name, entity: y.name } }))),
        fallback: false, // can also be true or 'blocking'
    };
};

const DocksEntity: NextPage<Props> = ({ entity }) => {
    return <div>{entity.name}</div>;
};

export default DocksEntity;
