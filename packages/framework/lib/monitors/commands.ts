import type { Message } from "guilded.js";

import { Monitor } from "../structures/Monitor";

export default class CommandsMonitor extends Monitor {
    // Commands should not ignore dms.
    ignoreDM = false;

    execute(message: Message): unknown {
        return console.log("in command monitor", message);
    }

    init(): unknown {
        return void 0;
    }
}
