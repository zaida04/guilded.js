import "@fortawesome/fontawesome-svg-core/styles.css";
import localFont from "@next/font/local";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

const Mono = localFont({
	src: "../styles/fonts/webfonts/JetBrainsMono-Regular.woff2",
	variable: "--font-mono",
	display: "swap",
});
const description = "Guilded.js is a library for the Guilded.gg API written in TypeScript. It is usable in either TypeScript or JavaScript projects.";

export default function App({ Component, pageProps }: AppProps) {
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
			<main className={`${Mono.variable} font-sans`}>
				<Component {...pageProps} />
			</main>
		</>
	);
}
