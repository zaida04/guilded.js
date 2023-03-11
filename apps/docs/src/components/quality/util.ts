import type { SomeType } from "typedoc";
import { packageLookup } from "../../lib/loader";

export type Type = { isLink?: boolean; name: string; pkg?: string };
export const unionMap = (input: SomeType): Type => {
    switch (input.type) {
        case "literal":
            return { name: String(input.value) };
        case "reference": {
            if ("id" in input) return { name: input.name, isLink: true };

            const pkg = packageLookup(input.name);
            if (pkg) return { name: input.name, pkg, isLink: true };
            return { name: input.name };
        }

        case "intrinsic":
            return { name: input.name };
        case "reflection":
            return { name: input.declaration?.name, isLink: true };
        default:
            return { name: "unknown" };
    }
};
