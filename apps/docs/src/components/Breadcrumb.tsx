import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faBook, faBox, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { capitalize } from "../lib/util";
import { BreadCrumbSep } from "./customIcons/BreadCrumbSep";

type Path = { icon?: IconDefinition; isActive?: boolean; name: string; path: string };
export const Breadcrumb = () => {
	const {
		query,
		asPath,
	} =
		useRouter();
	const lib =
		query.lib as
			| string
			| undefined;
	if (
		typeof lib !==
		"string"
	)
		return null;

	const defaultPaths: Path[] =
		[
			{
				name: "Home",
				icon: faHome,
				path: "/",
			},
			{
				name: "Docs",
				icon: faBook,
				path: "/docs",
			},
			{
				name: lib,
				icon: faBox,
				path: `/docs/${lib}`,
			},
		];

	const splittedPaths: Path[] =
		asPath
			.split(
				"/",
			)
			.slice(
				3,
			)
			.map(
				(
					x,
				) => ({
					name: capitalize(
						x,
					),
					path: `/docs/${lib}/${x}`,
				}),
			);
	const combinedPaths =
		[
			...defaultPaths,
			...splittedPaths,
		];
	const activePath =
		combinedPaths.find(
			(
				x,
			) =>
				x.path ===
				asPath,
		);
	if (
		activePath
	)
		activePath.isActive = true;

	return (
		<nav className="flex items-center justify-between flex-wrap text-white bg-black py-4 pl-8 md:pl-40">
			<ol className="inline-flex items-center space-x-1 md:space-x-3">
				{combinedPaths.map(
					(
						path,
						index,
						arr,
					) => {
						const res =
							(
								<li
									className="inline-flex items-center"
									key={
										index
									}
								>
									<Link
										className={`inline-flex items-center text-xs md:text-sm font-medium ${
											path.isActive
												? "text-guilded"
												: "text-white hover:text-guilded"
										}`}
										href={
											path.path
										}
									>
										{path.icon && (
											<FontAwesomeIcon
												className="pr-2"
												icon={
													path.icon
												}
											/>
										)}
										{
											path.name
										}
									</Link>
								</li>
							);

						if (
							index !==
								0 &&
							index !==
								arr.length
						)
							return (
								<>
									<BreadCrumbSep
										key={
											index +
											arr.length
										}
									/>
									{
										res
									}
								</>
							);
						return res;
					},
				)}
			</ol>
		</nav>
	);
};
