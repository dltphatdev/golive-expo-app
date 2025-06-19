import { AppContext } from "@/app/context/app.context";
import { getAccessTokenFromLS, getProfileFromLS } from "@/app/utils/auth";
import http from "@/app/utils/http";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";

export default function TokenInitializer() {
	const { setIsAuthenticated, setProfile } = useContext(AppContext);
	const router = useRouter();

	useEffect(() => {
		const bootstrap = async () => {
			await http.init();
			const token = await getAccessTokenFromLS();
			const profile = await getProfileFromLS();

			if (token && profile) {
				setIsAuthenticated(true);
				setProfile(profile);
				router.replace("/(protected)/(tabs)");
			} else {
				setIsAuthenticated(false);
				setProfile(null);
				router.replace("/(auth)/login");
			}
		};

		bootstrap();
	}, [router, setIsAuthenticated, setProfile]);

	return null;
}
