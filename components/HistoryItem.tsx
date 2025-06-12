import { StyleSheet, Text, View } from "react-native";

const HistoryItem = () => {
	return (
		<View style={styles.historyItem}>
			<View>
				<Text style={styles.historyDate}>27 tháng 05 năm 2025</Text>
				<View style={styles.historyRow}>
					<Text style={styles.historyPoint}>100 S Point</Text>
					<Text style={styles.historyDot}>•</Text>
					<Text style={styles.historyDetail}>12.4 km</Text>
					<Text style={styles.historyDot}>•</Text>
					<Text style={styles.historyDetail}>1222 kcal</Text>
				</View>
			</View>
			<View>
				<Text style={styles.historyValue}>11,120</Text>
				<Text style={styles.historyUnit}>Bước</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	historyItem: {
		backgroundColor: "rgba(47,60,80,0.4)",
		borderRadius: 12,
		paddingHorizontal: 20,
		paddingVertical: 20,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	historyDate: {
		fontSize: 18,
		fontWeight: "500",
		color: "#fff",
		marginBottom: 4,
	},
	historyDot: { fontSize: 14, color: "#fff", paddingInline: 4 },
	historyRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	historyDetail: { fontSize: 14, color: "#fff" },
	historyPoint: {
		color: "#FE904B",
		fontSize: 14,
	},
	historyValue: {
		fontSize: 25,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "right",
	},
	historyUnit: { fontSize: 12, color: "#fff", textAlign: "right" },
});

export default HistoryItem;
