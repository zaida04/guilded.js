import type { JSONOutput } from "typedoc";
// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
// @ts-ignore Depending on if docs were not generated, this import may fail.
import docs from "../../../../docs/output.json";

// potentially use some other way than local fs
const fetchDocs = () => docs as JSONOutput.ContainerReflection

export default fetchDocs;