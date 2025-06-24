import Spoint from "@/assets/images/header-spoint.svg";
import { StyleSheet, Text, View } from "react-native";

export default function CardSpoint() {
	return (
		<View style={styles.container}>
			<View style={styles.cardTop}>
				<Spoint width={21} />
				<Text style={styles.spoint}>00.00</Text>
			</View>
			<Text style={styles.label}>Đã dùng</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		borderRadius: 8,
		gap: 4,
		padding: 6,
		width: "30%",
	},
	spoint: {
		color: "rgba(255, 255, 255, 1)",
		fontSize: 18,
		fontWeight: 600,
	},
	cardTop: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	label: {
		fontWeight: 400,
		color: "rgba(205, 205, 205, 1)",
		fontSize: 12,
		textAlign: "center",
	},
});
