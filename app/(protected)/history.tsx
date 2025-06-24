import Spoint from "@/assets/images/header-spoint.svg";
import CardSpoint from "@/components/CardSpoint";
import HeaderOther from "@/components/HeaderOther";
import HistoryItem from "@/components/HistoryItem";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={["rgba(33, 124, 197, 1)", "rgba(30, 105, 134, 1)"]}
				style={[styles.gradient, StyleSheet.absoluteFill]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
			>
				<ScrollView
					style={styles.content}
					contentContainerStyle={{ paddingBottom: 35 }}
				>
					{/* Header */}
					<HeaderOther />

					{/* History main */}
					<LinearGradient
						colors={["#4A499A", "#717099"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.historyMain}
					>
						<View style={styles.historyMainTop}>
							<View style={styles.historySpointTop}>
								<Text style={styles.historySpointTopText}>19,912</Text>
								<Spoint width={21} />
							</View>
							<View style={styles.historyTimeInfo}>
								<Text style={styles.historyTimeInfoLabel}>Cập nhật lúc</Text>
								<Text style={styles.historyTimeInfoLabelNumber}>
									12:30:59 04/04/2025
								</Text>
							</View>
						</View>
						<View style={styles.historyLine}></View>
						<View style={styles.cardSpointBox}>
							<CardSpoint />
							<CardSpoint />
							<CardSpoint />
						</View>
					</LinearGradient>

					{/* History Item */}
					<View style={styles.historyBox}>
						<Text style={styles.historyLabel}>Lịch sử thay đổi</Text>
						<HistoryItem />
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	gradient: { flex: 1 },
	content: { flex: 1, paddingTop: 50, paddingInline: 10 },
	historyBox: {
		marginTop: 16,
	},
	historyLabel: {
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: 18,
		fontWeight: 600,
		marginBottom: 10,
	},
	historyMain: {
		borderRadius: 18,
		padding: 18,
		gap: 18,
		marginTop: 16,
	},
	historyMainTop: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 20,
	},
	historySpointTop: {
		gap: 6,
		flexDirection: "row",
		alignItems: "center",
	},
	historySpointTopText: {
		fontWeight: 600,
		color: "rgba(255, 255, 255, 1)",
		fontSize: 20,
	},
	historyTimeInfo: {},
	historyTimeText: {
		color: "rgba(205, 205, 205, 1)",
		fontWeight: 400,
		fontSize: 12,
	},
	historyTimeInfoLabelNumber: {
		color: "rgba(205, 205, 205, 1)",
	},
	historyTimeInfoLabel: {
		textAlign: "center",
		color: "rgba(205, 205, 205, 1)",
	},
	historyLine: {
		width: 306,
		height: 1,
		marginInline: "auto",
		backgroundColor: "rgba(76, 115, 128, 1)",
	},
	cardSpointBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
