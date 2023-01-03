import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const LayoutWrapper = ({ buildDate, children }: { buildDate?: number, children: any }) =>
	<div>
		<Navbar />
		{children}
		<Footer buildDate={buildDate} />
	</div>