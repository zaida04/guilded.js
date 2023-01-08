import type { EntityType } from "../lib/types";
import { capitalize } from "../lib/util";

export const EntityList = ({ name, entities }: { entities: EntityType[], name: string }) => {
	if (!Object.keys(entities).length) return null;

	return <div className="md:ml-20">
		<h1 className="text-guilded text-4xl font-bold pb-6 underline underline-offset-8">{capitalize(name)}</h1>
		<div className="grid grid-rows-[auto] grid-cols-1 md:grid-cols-3 gap-x-[1rem]">
			{entities.map(entity =>
				<a className="text-md md:text-xl hover:text-guilded text-white" href={`#${entity.name}`} key={entity.name}>{entity.name}</a>
			)}
		</div>
	</div>
}