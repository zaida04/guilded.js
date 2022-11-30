import { readFileSync } from "node:fs";
import { WebhookClient } from "../../../lib/index";

const client = new WebhookClient("");

void (async (): Promise<unknown> => {
    return client.send({ files: [{ name: "bbb.png", content: readFileSync("./bbb.png") }] });
})();
