import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Copiable = ({ text }: { text: string }) => {
	const [
		recentlyCopied,
		setRecentlyCopied,
	] =
		useState(
			false,
		);
	return (
		<div
			className="p-2 mt-1 md:mt-0 md:mr-1 border-2 rounded-lg border-gray bg-black text-white hover:cursor-pointer"
			onClick={async () => {
				await navigator.clipboard.writeText(
					text,
				);
				setRecentlyCopied(
					true,
				);
				setTimeout(
					() =>
						setRecentlyCopied(
							false,
						),
					750,
				);
			}}
		>
			<p>
				{
					text
				}
				{recentlyCopied ? (
					<FontAwesomeIcon
						className="ml-2"
						icon={
							faCheck
						}
					/>
				) : (
					<FontAwesomeIcon
						className="ml-2"
						icon={
							faCopy
						}
					/>
				)}
			</p>
		</div>
	);
};
