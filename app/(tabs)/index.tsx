import { CircleProgress } from "@/components/CircleProgress";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
	Dimensions,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import StarSvg from "../../assets/images/star.svg";

const { width } = Dimensions.get("window");
export default function HomeScreen() {
	const steps = 2045;
	const goal = 5000;
	const percentage = Math.min(steps / goal, 1);
	const angle = percentage * 360;

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient colors={["#286BAF", "#77A5D4"]} style={styles.gradient}>
				<ScrollView style={styles.content}>
					{/* Header */}
					<View style={styles.header}>
						<View style={styles.profile}>
							<View style={styles.avatar}>
								<Text style={styles.avatarText}>P</Text>
							</View>
							<View>
								<Text style={styles.greeting}>Chào buổi sáng!</Text>
								<View style={styles.actionHeaderInfo}>
									<Text style={styles.name}>Phi</Text>
									<Text style={styles.rectangle}>/</Text>
									<Text style={styles.textLogout}>Đăng xuất</Text>
								</View>
							</View>
						</View>
						<Ionicons name="chatbubble-outline" size={24} color="white" />
					</View>
					{/* Progress */}
					<View style={styles.progressSection}>
						<View style={{ width: width - 100 }}>
							<View style={styles.progressHeader}>
								<View style={styles.boxProgressText}>
									<Text style={styles.progressText1}>14,000</Text>
									<Text style={styles.progressText2}>/</Text>
									<Text style={styles.progressText3}>15,000</Text>
									<Text style={styles.progressText4}>Bước</Text>
								</View>
								<View>
									<Text style={styles.levelText}>Level 5</Text>
								</View>
							</View>
							<View style={styles.progressBar}>
								<LinearGradient
									colors={["#FA724B", "#FFDCD2"]}
									style={[styles.progressFill, { width: "60%" }]}
									start={{ x: 0, y: 0 }}
									end={{ x: 1, y: 1 }}
								></LinearGradient>
							</View>
						</View>
						<View>
							<StarSvg width={48} height={48} />
						</View>
					</View>
					{/* Activity Card */}
					<View style={styles.card}>
						<View style={styles.activityRow}>
							<View style={styles.activityInfo}>
								<View style={styles.whiteCircle}>
									<Image
										source={require("../../assets/images/runner.png")}
										width={48}
										height={48}
									/>
									{/* Hình tròn xanh */}
									<View style={styles.greenDot} />
									<View style={styles.blueRing} />
								</View>
								<View style={{ gap: 4 }}>
									<Text style={styles.date}>26 tháng 03</Text>
									<Text style={styles.day}>Hôm nay</Text>
									<Text style={styles.time}>01:09:44</Text>
								</View>
							</View>
							<CircleProgress steps={steps} goal={goal} />
						</View>
					</View>
					{/* Stats */}
					<View style={styles.statsRow}>
						<View style={styles.statCard}>
							<Text style={styles.statNumber}>53,524</Text>
							<Text style={styles.statLabel}>Bước</Text>
						</View>
						<View style={styles.statCard}>
							<Text style={styles.statNumber}>1000</Text>
							<Text style={styles.statLabel}>S Point</Text>
						</View>
					</View>

					{/* History */}
					<View style={styles.historySection}>
						<View style={styles.historyHeader}>
							<Text style={styles.historyTitle}>Lịch sử</Text>
							<Text style={styles.viewAll}>Tất cả</Text>
						</View>

						{[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
							<View key={i} style={styles.historyItem}>
								<View>
									<Text style={styles.historyDate}>27 tháng 05 năm 2025</Text>
									<Text style={styles.historyDetail}>12.4 km • 1222 kcal</Text>
								</View>
								<View>
									<Text style={styles.historyValue}>11,120</Text>
									<Text style={styles.historyUnit}>Bước</Text>
								</View>
							</View>
						))}
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	gradient: { flex: 1 },
	content: { flex: 1, padding: 20 },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
	},
	actionHeaderInfo: {
		flexDirection: "row",
		gap: 5,
	},
	rectangle: {
		color: "#fff",
		marginTop: 2,
	},
	profile: { flexDirection: "row", alignItems: "center", gap: 10 },
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 100,
		backgroundColor: "#FF6B6B",
		alignItems: "center",
		justifyContent: "center",
	},
	avatarText: { color: "white", fontSize: 18, fontWeight: "bold" },
	greeting: { color: "white", fontSize: 14 },
	textLogout: { color: "white", fontSize: 14, marginTop: 2 },
	name: { color: "white", fontSize: 16, fontWeight: "bold" },
	progressSection: {
		marginBottom: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
	},
	progressHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	boxProgressText: {
		flexDirection: "row",
		gap: 4,
	},
	progressText1: {
		color: "white",
		fontSize: 13,
		fontWeight: "400",
		marginTop: 4,
	},
	progressText2: { color: "white", fontSize: 15, fontWeight: "500" },
	progressText3: { color: "white", fontSize: 18, fontWeight: "700" },
	progressText4: {
		color: "white",
		fontSize: 14,
		fontWeight: "400",
		marginTop: 3,
	},
	levelText: { color: "#FFC932", fontSize: 22, fontWeight: "600" },
	progressBar: {
		height: 10,
		backgroundColor: "rgba(255,255,255,0.3)",
		borderRadius: 5,
	},
	progressFill: {
		height: "100%",
		borderRadius: 4,
	},
	card: {
		borderRadius: 20,
		padding: 20,
		marginBottom: 20,
		backgroundColor: "rgba(255, 255, 255, 0.10)",
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.17)",
	},
	activityRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	activityInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
	date: { fontSize: 15, fontWeight: "500", color: "#fff" },
	day: { color: "#43C465", fontSize: 18, fontWeight: 500 },
	time: { fontSize: 14, color: "#fff" },
	statsRow: { flexDirection: "row", gap: 15, marginBottom: 30 },
	statCard: {
		flex: 1,
		backgroundColor: "rgba(255, 255, 255, 0.10)",
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.17)",
		borderRadius: 20,
		height: 125,
		justifyContent: "center",
		alignItems: "center",
	},
	statNumber: {
		fontSize: 30,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 5,
	},
	statLabel: { fontSize: 14, color: "#fff" },
	historySection: { marginBottom: 100 },
	historyHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	historyTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
	viewAll: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
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
	historyDetail: { fontSize: 14, color: "#fff" },
	historyValue: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "right",
	},
	historyUnit: { fontSize: 12, color: "#fff", textAlign: "right" },
	whiteCircle: {
		width: 48,
		height: 48,
		borderRadius: 100,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	},
	greenDot: {
		width: 16,
		height: 16,
		backgroundColor: "#4CAF50",
		borderRadius: 16,
		position: "absolute",
		bottom: -5,
		right: 4,
		zIndex: 2,
	},
	blueRing: {
		width: 20,
		height: 20,
		borderRadius: 20,
		backgroundColor: "rgba(255,255,255,0.2)",
		position: "absolute",
		bottom: -7,
		right: 2,
		zIndex: 1,
	},
});
