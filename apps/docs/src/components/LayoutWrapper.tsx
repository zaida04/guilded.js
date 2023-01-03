import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export const LayoutWrapper = ({ buildDate, children }: { buildDate?: number, children: any }) =>
	<div>
		<Navbar />
		<div className="h-screen">
			{children}
		</div>
		<Footer buildDate={buildDate} />
	</div>