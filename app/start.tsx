import { router } from "expo-router";
import {
	ImageBackground,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function StartScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={require("../assets/images/get-started.jpg")}
				resizeMode="cover"
				style={styles.container}
			>
				{/* Nội dung trong đây */}
				<View style={styles.centered}>
					<Text style={styles.title}>GoLive App</Text>
					<Text style={styles.subtitle}>
						Đi bộ – Sức khỏe – Tích điểm –{"\n"}Đổi quà – Mua sắm
					</Text>

					<TouchableOpacity
						style={styles.button}
						onPress={() => router.push("/login")}
					>
						<Text style={styles.buttonText}>Bắt đầu</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	centered: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-end",
		paddingHorizontal: 24,
		paddingBottom: 60,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 12,
	},
	subtitle: {
		fontSize: 16,
		color: "#fff",
		textAlign: "center",
		marginBottom: 40,
		lineHeight: 24,
	},
	button: {
		backgroundColor: "#FA724B",
		paddingVertical: 14,
		paddingHorizontal: 40,
		borderRadius: 12,
		width: 300,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
	},
});
