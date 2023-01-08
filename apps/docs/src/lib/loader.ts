import type { JSONOutput } from "typedoc";
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore Depending on if docs were not generated, this import may fail.
import docs from "../../output.json";
import { getUnscopedPackageName } from "./util";

// potentially use some other way than local fs
const fetchDocs = () => docs as JSONOutput.ContainerReflection;

export const packageToMembers = docs.children.reduce((prev, curr) => {
    return {
        ...prev,
        [getUnscopedPackageName(curr.name)]: curr.children.map((x) => x.name),
    };
}, {}) as Record<string, string[]>;

export const packages = Object.keys(packageToMembers);
export const packageLookup = (name: string) => packages.find((x) => packageToMembers[x as keyof typeof packageToMembers].includes(name));

export default fetchDocs;
