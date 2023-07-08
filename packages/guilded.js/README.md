<div align="center">
<h1>Guilded.js</h1>
<p><b>A Node.js library for the <a href="https://www.guilded.gg/">Guilded.gg</a> API.</b></p>
<p>
    <a href="https://www.guilded.gg/i/k1ber4Jp"><img src="https://shields.yoki-labs.xyz/shields/i/k1ber4Jp?style=flat"></a>
    <img src="https://github.com/zaida04/guilded.js/actions/workflows/ci.yml/badge.svg" alt="CI">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a><br>
</p>
</div>

```ts
const { Client } = require("guilded.js");
// import { Client } from "guilded.js";
const client = new Client({ token: "TOKEN_HERE" });

client.on("ready", () => {
    console.log(`Bot is successfully logged in`);
});

client.on("messageCreated", (message) => {
    if (message.content === "poggers") {
        return message.reply("test indeed");
    }
});

client.login();
```

## 📝 About

`guilded.js` is a library written in TypeScript usable in either TypeScript or JavaScript projects. It provides structures, abstraction, and utilities for interaction between your bot and the Guilded API.

## 📥 Installation

<a href="https://npmjs.org/package/guilded.js"><img src="https://nodei.co/npm/guilded.js.png" alt="NPM"></a>

**Recommended that you use node v18+**

### Using `create-guilded-app`

-   `yarn create guilded-app <project-name>`
-   `pnpm create guilded-app <project-name>`
-   `npm init guilded-app <project-name>`

### Manual Installation

-   `npm install guilded.js`
-   `yarn add guilded.js`
-   `pnpm add guilded.js`

## 📃 Documentation

> ### Looking for all the Client events? See [here](https://guildedjs.github.io/types/guilded_js.ClientEvents.html)
>
> Documentation is viewable here: https://guilded.js.org  
> A general purpose guide is available here: https://guilded-js.gitbook.io/api-docs/

## ✋ Contributing

Please see the main [README.md](https://github.com/zaida04/guilded.js) for info on how to contribute to this package or the other `@guildedjs` packages.

## 🤝 Acknowledgements

-   [`Discord.js`](https://discord.js.org/#/) - Inspiration and caching strategy

## ⚖️ LICENSING

Licensed under the [MIT License](https://github.com/zaida04/guilded.js/blob/main/LICENSE)
