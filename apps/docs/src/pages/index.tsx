import { CodeBlock } from "react-code-blocks";

export default function Home() {
  return (
    <div>
      <div>
        <p>Guilded.JS</p>
        <p>Docs</p>
        <p>Guide</p>
        <p>GitHub</p>
        <p>Support Server</p>

      </div>
      <div>
        <img alt="banner" src="/banner.png" />
        <CodeBlock text={
          `
          const { Client } = require("guilded.js");
          // import { Client } from "guilded.js";
          const client = new Client({ token: "TOKEN_HERE" });

          client.on("ready", () => console.log(\`Bot is successfully logged in\`));
          client.on("messageCreated", (message) => {
              if (message.content === "test") {
                  return message.reply("test indeed");
              }
          });

          client.login();
          `
        } />
      </div>
    </div>
  )
}
