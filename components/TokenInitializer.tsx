import http from "@/app/utils/http";
import { useEffect } from "react";

export default function TokenInitializer() {
	useEffect(() => {
		const bootstrap = async () => {
			await http.init();
		};
		bootstrap();
	}, []);

	return null;
}
