import { AppContext } from "@/app/+context/app.context";
import { useRouter } from "expo-router";
import { ReactNode, useContext, useEffect } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated, isInitializing } = useContext(AppContext);
	const router = useRouter();
	useEffect(() => {
		if (isInitializing) return;
		if (!isAuthenticated) {
			router.push("/login");
		} else {
			router.replace("/(protected)/(tabs)");
		}
	}, [isAuthenticated, router, isInitializing]);
	if (isInitializing) return null; // hoặc splash screen
	return <>{children}</>;
}
