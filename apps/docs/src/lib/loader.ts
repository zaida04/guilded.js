import type { JSONOutput } from "typedoc";
import docs from "../../../../docs/output.json";

// potentially use some other way than local fs
const fetchDocs = () => docs as JSONOutput.ContainerReflection

export default fetchDocs;