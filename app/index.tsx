import { useRouter } from "expo-router";
import { useEffect } from "react";
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
	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace("/(auth)/onboarding");
		}, 3000); // 3 giây

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				<Image
					source={require("../assets/images/map-streaming.png")}
					style={styles.map}
					resizeMode="contain"
				/>
				<Image
					source={require("../assets/images/golive-logo-streaming.png")}
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
