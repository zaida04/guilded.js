import type { Message } from "guilded.js";

import { Monitor } from "../structures/Monitor";

export class CommandsMonitor extends Monitor {
    // Commands should not ignore dms.
    ignoreDM = false;

    execute(message: Message): unknown {
        return console.log("in command monitor", message);
    }
}
