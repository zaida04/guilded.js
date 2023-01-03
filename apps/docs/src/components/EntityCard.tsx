import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faICursor, faAtom, faBox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { EntityType } from "../lib/types";

const entityTypeToIcon: Record<string, IconDefinition> = { classes: faBox, functions: faAtom, types: faICursor }
export const EntityChildCard = ({ entity, entityChild }: { entity: string, entityChild: EntityType }) =>
	<div className="max-w-[20rem] md:max-w-6xl border-[1px] border-white p-4 md:p-8" id={entityChild.name}>
		<h1 className="text-md md:text-3xl text-guilded"><FontAwesomeIcon icon={entityTypeToIcon[entity]} /> {entityChild.name}</h1>
		{entityChild.comment?.summary.length && <p className="pt-4 text-sm md:text-2xl text-white">{entityChild.comment.summary[0].text}</p>}
	</div>
