import { AppContext } from "@/app/+context/app.context";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import {
	Dimensions,
	Image,
	SafeAreaView,
	StyleSheet,
	View,
} from "react-native";
const { width, height } = Dimensions.get("window");
export default function StartScreen() {
	const router = useRouter();
	const { isAuthenticated, isInitializing } = useContext(AppContext);
	useEffect(() => {
		if (isInitializing) return;
		if (isAuthenticated) {
			router.replace("/(protected)/(tabs)");
		} else {
			const timer = setTimeout(() => {
				router.replace("/(auth)/onboarding");
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [router, isAuthenticated, isInitializing]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<Image
					source={require("../assets/images/map-streaming.png")}
					style={styles.map}
					resizeMode="contain"
				/>
				<Image
					source={require("../assets/images/app-golive-getting-started.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#235DFF",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		position: "absolute",
		width,
		height,
		opacity: 0.2,
	},
	logo: {
		width: 120,
		height: 120,
	},
});
