import "@fortawesome/fontawesome-svg-core/styles.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import "../styles/globals.css";

const Mono = localFont({
	src: "../styles/fonts/webfonts/JetBrainsMono-Regular.woff2",
	variable: "--font-mono",
	display: "swap",
});
export default function App({ Component, pageProps }: AppProps) {
	return (
		<main className={`${Mono.variable} font-sans`}>
			<Component {...pageProps} />
		</main>
	);
}
