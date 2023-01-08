import Link from "next/link";
import { useState } from "react";

const topBars = {
	Docs: "/docs",
	Guide: "https://guilded-js.gitbook.io/api-docs/create-a-basic-bot",
	Github: "https://github.com/guildedjs/guilded.js",
	"Support Server": "https://guilded.gg/guildedjs",
	"Legacy Docs": "https://guildedjs.github.io/"
}

export const Navbar = () => {
	const [expanded, setExpanded] = useState(false);

	return <div>
		<nav className="flex items-center justify-between flex-wrap bg-black p-6 md:pl-40">
			<Link href="/">
				<div className="flex items-center flex-shrink-0 mr-12 font-semibold text-3xl tracking-tight">
					<span className="text-guilded">Guilded</span>
					<span className="text-white">.JS</span>
				</div>
			</Link>
			<div className="block md:hidden" onClick={() => setExpanded(!expanded)}>
				<button className="flex items-center px-3 py-2 border rounded text-guilded border-guilded hover:text-white hover:border-white" type="button">
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
				</button>
			</div>
			<div className={`${expanded ? "block" : "hidden"} md:block w-full flex-grow lg:flex lg:items-center lg:w-auto`}>
				<div className="text-lg lg:flex-grow">
					{Object.keys(topBars).map(link =>
						<Link className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-guilded mr-8" href={topBars[link as keyof typeof topBars]} key={link}>
							{link}
						</Link>
					)}
				</div>
			</div>
		</nav>
	</div>
}