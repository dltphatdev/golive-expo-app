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
			router.replace("/onboarding"); // 👈 chuyển sang màn hình onboarding
		}, 3000); // 3 giây

		return () => clearTimeout(timer); // dọn timer nếu unmount
	}, [router]);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.container}>
				{/* Nền bản đồ mờ */}
				<Image
					source={require("../assets/images/map-streaming.png")}
					style={styles.map}
					resizeMode="contain"
				/>

				{/* Logo chính giữa */}
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
