import http from "@/app/+utils/http";
import { useEffect } from "react";

export default function TokenInitializer() {
	useEffect(() => {
		async function bootstrap() {
			await http.init();
		}
		bootstrap();
	}, []);
	return null;
}
