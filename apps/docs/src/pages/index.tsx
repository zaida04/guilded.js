import type { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import { CodeBlock, androidstudio } from "react-code-blocks";
import { CopiableComponent } from "../components/CopiableComponent";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

const exampleCode = `
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
`;

export const getStaticProps = (): GetStaticPropsResult<{ buildDate: number }> => {
	const buildDate = Date.now();
	return {
		props: {
			buildDate
		}
	}
}

export default function Home({ buildDate }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div>
			<Navbar />
			<div className="md:mt-8 w-full">
				<div className="flex justify-center">
					<h1 className="md:text-8xl text-5xl mt-12 mb-8">
						<span className="text-guilded">Guilded</span>
						<span className="text-white">.JS</span>
					</h1>
				</div>
				<div className="grid place-items-center">
					{["npm install guilded.js", "yarn add guilded.js", "pnpm add guilded.js"].map(click => <CopiableComponent key={click} text={click} />)}
				</div>
				<div className="flex justify-center text-lg pt-8 text-white">
					<div className="w-full md:w-3/5">
						<p className="text-md text-center pb-8">Guilded.js is a library written in TypeScript usable in either TypeScript or JavaScript projects. It provides structures, abstractions, and utilities for interaction with the Guilded API.</p>
						<CodeBlock language="javascript" showLineNumbers={false} text={exampleCode} theme={androidstudio} />
					</div>
				</div>
			</div>
			<Footer buildDate={buildDate} />
		</div>
	)
}
