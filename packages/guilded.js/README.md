<div align="center">
<h1>Guilded.js</h1>
<p><b>A Node.js library for the <a href="https://www.guilded.gg/">Guilded.gg</a> API.</b></p>
<p>
    <a href="https://www.guilded.gg/i/k1ber4Jp"><img src="https://guilded.nico.engineer/shields/i/k1ber4Jp?style=flat"></a>
    <img src="https://github.com/guildedjs/guilded.js/actions/workflows/ci.yml/badge.svg" alt="CI">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a><br>
</p>
</div>

```ts
const { Client } = require("guilded.js");
// import { Client } from "guilded.js";
const client = new Client({ token: "TOKEN_HERE" });

client.on("ready", () => console.log(`Bot is successfully logged in`));
client.on("messageCreated", (message) => {
    if (message.content === "poggers") {
        return message.reply("test indeed");
    }
});

client.login();
```

## 📝 About

`guilded.js` is a library written in TypeScript usable in either TypeScript or JavaScript projects. It provides structures, abstraction, and utilities for interaction between the guilded API and your userbot. It includes the other various pieces that make up the Guilded.JS collection of packages.

## 📥 Installation

<a href="https://npmjs.org/package/guilded.js"><img src="https://nodei.co/npm/guilded.js.png" alt="NPM"></a>

**Recommended that you use node v12+**

-   `npm install guilded.js`
-   `yarn add guilded.js`

## 📃 Documentation

Documentation is located [here](https://guilded.js.org)

## ✋ Contributing

Please see the main [README.md](https://github.com/guildedjs/guilded.js) for info on how to contribute to this package or the other `@guildedjs` packages.

## 🤝 Acknowledgements

-   [`Discord.js`](https://discord.js.org/#/) - Inspiration and caching strategy

## ⚖️ LICENSING

Licensed under the [MIT License](https://github.com/guildedjs/guilded.js/blob/main/LICENSE)
