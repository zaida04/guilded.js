import type { GetStaticPropsResult, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { CodeBlock, androidstudio } from "react-code-blocks";
import { Copiable } from "../components/Copiable";
import { LayoutWrapper } from "../components/LayoutWrapper";

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

const description = "Guilded.js is a library written in TypeScript usable in either TypeScript or JavaScript projects. It provides structures, abstractions, and utilities for interaction with the Guilded API.";

export default function Home({ buildDate }: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<Head>
				<title>Guilded.js - A Guilded library.</title>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1.0" name="viewport" />
				<meta content={description} name="description" />
				<meta content="Guilded.JS Team" name="author" />
				<meta content="guilded, guilded api, guilded.js, guilded js, guilded-js, guilded-api" name="keywords" />
				<meta content="Guilded.JS" name="og:title" property="og:title" />
				<meta content={description} name="og:description" />
				<meta content={description} name="twitter:card" />
			</Head>
			<LayoutWrapper buildDate={buildDate}>
				<div className="md:mt-8 w-full min-h-screen">
					<div className="flex justify-center">
						<h1 className="md:text-8xl text-5xl font-bold mt-12 mb-8">
							<span className="text-guilded">Guilded</span>
							<span className="text-white">.JS</span>
						</h1>
					</div>
					<div className="grid place-items-center md:flex md:justify-center">
						{["npm install guilded.js", "yarn add guilded.js", "pnpm add guilded.js"].map(click => <Copiable key={click} text={click} />)}
					</div>
					<div className="pt-2 flex justify-center">
						<Link href="/docs">
							<div className="py-2 px-4 bg-guilded rounded-lg transition-transform transform hover:scale-110">
								<p className="text-xl text-gray font-bold">Read the Docs</p>
							</div>
						</Link>
					</div>
					<div className="flex justify-center text-lg pt-8 text-white">
						<div className="w-full md:w-4/5">
							<p className="text-md text-center md:text-start pb-8">{description}</p>
							<div className="border-gray border-[3.5px] rounded-lg">
								<CodeBlock language="javascript" showLineNumbers={false} text={exampleCode} theme={androidstudio} />
							</div>
						</div>
					</div>
				</div>
			</LayoutWrapper>
		</>
	)
}
