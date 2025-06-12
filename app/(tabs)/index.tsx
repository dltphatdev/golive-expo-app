import { CircleProgress } from "@/components/CircleProgress";
import HistoryItem from "@/components/HistoryItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
	Dimensions,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import MessageSvg from "../../assets/images/message-icon.svg";
import StarSvg from "../../assets/images/star.svg";

const { width } = Dimensions.get("window");
export default function HomeScreen() {
	const steps = 2045;
	const goal = 5000;
	const router = useRouter();
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={["#1E70C1", "#73AEE1", "#E1B7C1"]}
				style={styles.gradient}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
			>
				<ScrollView
					style={styles.content}
					contentContainerStyle={{ paddingBottom: 35 }}
				>
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
						<MessageSvg width={24} height={24} color="white" />
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
							<View style={styles.statContainerSub}>
								<MaterialCommunityIcons
									name="foot-print"
									size={32}
									color="white"
								/>
								<Text style={styles.statLabel}>Bước</Text>
							</View>
						</View>
						<View style={styles.statCard}>
							<Text style={styles.statNumber}>1000</Text>

							<View style={styles.statContainerSub}>
								<MaterialCommunityIcons name="star" size={26} color="white" />
								<Text style={styles.statLabel}>S Point</Text>
							</View>
						</View>
					</View>

					{/* History */}
					<View style={styles.historySection}>
						<View style={styles.historyHeader}>
							<Text style={styles.historyTitle}>Lịch sử</Text>
							<Text
								style={styles.viewAll}
								onPress={() => router.push("/history")}
							>
								Tất cả
							</Text>
						</View>

						{[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
							<HistoryItem key={i} />
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
		paddingVertical: 30,
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
	statContainerSub: {
		flexDirection: "row",
		gap: 2,
		alignItems: "center",
	},
	statLabel: { fontSize: 16, color: "#fff" },
	historySection: { marginBottom: 100 },
	historyHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
	},
	historyTitle: { fontSize: 18, fontWeight: "bold", color: "white" },
	viewAll: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
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
		width: 12,
		height: 12,
		backgroundColor: "#4CAF50",
		borderRadius: 16,
		position: "absolute",
		bottom: -2,
		right: 6,
		zIndex: 2,
	},
	blueRing: {
		width: 14,
		height: 14,
		borderRadius: 20,
		backgroundColor: "rgba(255,255,255,0.2)",
		position: "absolute",
		bottom: -3,
		right: 5,
		zIndex: 1,
	},
});
