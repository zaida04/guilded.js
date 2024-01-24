export default function Button(props: { children: React.ReactNode }) {
	return (
		<div className="py-2 px-4 bg-guilded rounded-lg transition-transform transform hover:scale-110">
			<p className="text-lg text-gray font-bold">{props.children}</p>
		</div>
	);
}
