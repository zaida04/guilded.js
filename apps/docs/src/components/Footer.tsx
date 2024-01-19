const HoverableLink = ({ link, children }: { children: any; link: string }) => (
	<a
		className="hover:underline"
		href={
			link
		}
	>
		{
			children
		}
	</a>
);

export const Footer = ({ buildDate }: { buildDate?: number }) => {
	return (
		<footer className="mt-8 p-4 md:p-8 bg-black rounded-lg shadow md:flex md:items-center md:justify-between text-white">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				<HoverableLink link="https://github.com/zaida04/guilded.js">
					Guilded.JS
				</HoverableLink>
				,
				docs
				site
				built
				with{" "}
				<HoverableLink link="https://nextjs.org/">
					Next.js
				</HoverableLink>{" "}
				and{" "}
				<HoverableLink link="https://tailwindcss.com/">
					TailwindCSS
				</HoverableLink>
				.{" "}
				<HoverableLink link="https://www.jetbrains.com/lp/mono/">
					Jetbrains
					Mono
				</HoverableLink>{" "}
				is
				the
				font.{" "}
				{buildDate &&
					`Last built at ${new Date(
						buildDate,
					).toISOString()}`}
			</span>
		</footer>
	);
};
