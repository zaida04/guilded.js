<div align="center">
    <img src="https://raw.githubusercontent.com/guildedjs/guilded.js/main/static/readme-header.png?token=AEUKDFXMMP5EVBPSLIT6VLLBGAX34" width="546" alt="guildedjs"/>
    <p><b>Tools for interacting with the official <a href="https://www.guilded.gg/">Guilded.gg</a> API.</b></p>  
    <br />
    <p>
        <a href="https://discord.gg/jf66UUN"><img src="https://img.shields.io/discord/732714723744940032.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2 "></a>
        <img src="https://github.com/guildedjs/guilded.js/actions/workflows/ci.yml/badge.svg" alt="CI">
        <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a><br>
    </p>
</div>

## 📝 About
This repo serves as a monorepo that houses several packages, mainly the `@guildedjs/guilded.js` package, which is a library for the Guilded API.

## 📦 Packages
* `@guildedjs/guilded.js` (**[GitHub](https://github.com/guildedjs/guilded.js/tree/main/packages/guilded.js#readme), [NPM](https://www.npmjs.com/package/@guildedjs/guilded.js)**) - main package that provides a lib for the guilded.gg API. Comes with built in caching, structures, etc.
* `@guildedjs/guilded-api-types` (**[GitHub](https://github.com/guildedjs/guilded.js/tree/main/packages/guilded-api-typings#readme), [NPM](https://www.npmjs.com/package/@guildedjs/guilded-api-typings)**) - thinking of making your own guilded lib/wrapper? This package consists of typings for the guilded.gg API. No need to write your own typings and reinvent the wheel.
* `@guildedjs/rest` (**[GitHub](https://github.com/guildedjs/guilded.js/tree/main/packages/rest#readme), [NPM](https://www.npmjs.com/package/@guildedjs/rest)**) - Utility for making REST requests to the Guilded API. Includes ratelimit handling.
* `@guildedjs/ws` (**[GitHub](https://github.com/guildedjs/guilded.js/tree/main/packages/ws#readme), [NPM](https://www.npmjs.com/package/@guildedjs/ws)**) - Utility for connection to Guilded's WebSocket gateway.


## 📥 Installation

<a href="https://npmjs.org/package/@guildedjs/guilded.js"><img src="https://nodei.co/npm/@guildedjs/guilded.js.png" alt="NPM"></a>

**Recommended that you use node v12+**
- `npm install @guildedjs/guilded.js`  
- `yarn add @guildedjs/guilded.js`

## ⚡ Usage
You can find extra examples [here](https://github.com/guildedjs/guilded.js/tree/main/examples)

```ts
const { Client } = require("@guildedjs/guilded.js");
// import { Client } from "@guildedjs/guilded.js";
const client = new Client();

client.on('ready', () => console.log(`Bot is successfully logged in`));
client.on("messageCreate", message => {
    if(message.content === "poggers") {
        return message.channel.send("poggers indeed");
    }
})

client.login("TOKEN_HERE");
```

## 📃 Documentation
Documentation is viewable here: https://guilded.js.org

<!--END GETTING STARTED-->

## ✋ Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

**Please run `npm run bootstrap` after running npm install in your local environment.**
**Please ensure your commits pass the test, lint, and build scripts.**

**We make use of [lerna](https://lerna.js.org/) to manage our monorepo. The main commands used are below**
* `lerna add <module> [--scope=package-name]` - add npm module dependency to all/specific package(s)
* `lerna create <package>` - create a new package
* `npm run bootstrap` = `lerna bootstrap` - recursively install dependencies in all packages and symlink local packages
* `lerna run <npm-script>` - recursively execute command in all packages (must exist in each packages package.json)

## 🤝 Acknowledgements
[Discord.js](https://github.com/discordjs/discord.js) - Inspiration & derived work.

## ⚖️ LICENSING  
> **Guilded.JS** © [zaida04](https://github.com/zaida04). All packages released under [MIT](https://github.com/guildedjs/guilded.js/blob/main/LICENSE). 

Maintained by: [zaida04](https://github.com/zaida04), [Skillz4Killz](https://github.com/Skillz4Killz), and [Uhuh](https://github.com/Uhuh)
