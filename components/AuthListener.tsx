import { AppContext } from "@/app/context/app.context";
import { eventEmitter } from "@/app/utils/eventEmitter";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";

export default function AuthListener() {
	const { reset } = useContext(AppContext);
	const router = useRouter();

	useEffect(() => {
		eventEmitter.on("clearLS", () => {
			reset(); // ✅ Gọi lại reset từ context
			router.replace("/login");
		});

		return () => {
			eventEmitter.off("clearLS", reset);
		};
	}, [reset, router]);

	return null;
}
