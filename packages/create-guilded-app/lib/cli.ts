#!/usr/bin/env node

import { resolve } from "node:path";
import { create } from "create-create-app";

const templateRoot = resolve(__dirname, "..", "templates");

// See https://github.com/uetchy/create-create-app/blob/master/README.md for other options.

const caveat = `You can now get started with your very own guilded.js bot
The docs are viewable at https://guilded.js.org
A simple guide is available at https://guilded.js.org/guide

Happy coding!
`;

void create("create-guilded-app", {
	templateRoot,
	caveat,
	defaultTemplate: "command-handler-starter-js",
	promptForAuthor: false,
	promptForEmail: false,
	promptForTemplate: true,
	promptForDescription: false,
	promptForLicense: true,
	promptForPackageManager: true,
});
