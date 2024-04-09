export function strip(strings: TemplateStringsArray, ...values: any[]): string {
	let slices: string[] = strings.map((x) => x);
	if (strings[0] === "") {
		slices = strings.slice(1);
	}
	const fullString = slices.reduce((acc, str, i) => acc + str + (values[i] || ""), "");
	const trimmedLines = fullString.split("\n").map((x) => x.trim());

	if (trimmedLines[0] === "") {
		trimmedLines.shift();
	}

	return trimmedLines.join("\n");
}
