import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient colors={["#4A90E2", "#7BB3F0"]} style={styles.gradient}>
				<ScrollView style={styles.content}>
					{/* Header */}
					<View style={styles.header}>
						<Ionicons name="menu" size={24} color="white" />
						<View style={styles.profile}>
							<View style={styles.avatar}>
								<Text style={styles.avatarText}>P</Text>
							</View>
							<View>
								<Text style={styles.greeting}>Chào buổi sáng!</Text>
								<Text style={styles.name}>Phi</Text>
							</View>
						</View>
						<Ionicons name="chatbubble-outline" size={24} color="white" />
					</View>

					{/* Progress */}
					<View style={styles.progressSection}>
						<View style={styles.progressHeader}>
							<Text style={styles.progressText}>14,000 / 15,000 Bu/cc</Text>
							<View style={styles.levelBadge}>
								<Ionicons name="star" size={16} color="#FFD700" />
								<Text style={styles.levelText}>Level 5</Text>
							</View>
						</View>
						<View style={styles.progressBar}>
							<View style={styles.progressFill} />
						</View>
					</View>

					{/* Activity Card */}
					<View style={styles.card}>
						<View style={styles.activityRow}>
							<View style={styles.activityInfo}>
								<View style={styles.activityIcon}>
									<Ionicons name="walk" size={20} color="#4A90E2" />
								</View>
								<View>
									<Text style={styles.date}>26 tháng 03</Text>
									<Text style={styles.time}>01:09:44</Text>
								</View>
							</View>
							<View style={styles.circle}>
								<Text style={styles.circleText}>2345</Text>
							</View>
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
							<Text style={styles.statLabel}>Point</Text>
						</View>
					</View>

					{/* History */}
					<View style={styles.historySection}>
						<View style={styles.historyHeader}>
							<Text style={styles.historyTitle}>Lịch sử</Text>
							<Text style={styles.viewAll}>Tất cả</Text>
						</View>
						{[1, 2, 3].map((_, i) => (
							<View key={i} style={styles.historyItem}>
								<View>
									<Text style={styles.historyDate}>27 tháng 05 năm 2025</Text>
									<Text style={styles.historyDetail}>12.4 km • 1222 kcal</Text>
								</View>
								<View>
									<Text style={styles.historyValue}>11,120</Text>
									<Text style={styles.historyUnit}>Bu/cc</Text>
								</View>
							</View>
						))}
					</View>
				</ScrollView>

				{/* Bottom Nav */}
				{/* <View style={styles.bottomNav}>
					<Ionicons name="home" size={24} color="#FF6B6B" />
					<Ionicons name="trophy" size={24} color="rgba(255,255,255,0.6)" />
					<Ionicons name="person" size={24} color="rgba(255,255,255,0.6)" />
					<Ionicons name="chatbubble" size={24} color="rgba(255,255,255,0.6)" />
				</View> */}
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
	profile: { flexDirection: "row", alignItems: "center", gap: 10 },
	avatar: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#FF6B6B",
		alignItems: "center",
		justifyContent: "center",
	},
	avatarText: { color: "white", fontSize: 18, fontWeight: "bold" },
	greeting: { color: "white", fontSize: 14 },
	name: { color: "white", fontSize: 16, fontWeight: "bold" },
	progressSection: { marginBottom: 20 },
	progressHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	progressText: { color: "white", fontSize: 16, fontWeight: "600" },
	levelBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.2)",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 15,
		gap: 4,
	},
	levelText: { color: "white", fontSize: 12, fontWeight: "600" },
	progressBar: {
		height: 8,
		backgroundColor: "rgba(255,255,255,0.3)",
		borderRadius: 4,
	},
	progressFill: {
		height: "100%",
		width: "93%",
		backgroundColor: "#FF6B6B",
		borderRadius: 4,
	},
	card: {
		backgroundColor: "rgba(255,255,255,0.9)",
		borderRadius: 16,
		padding: 20,
		marginBottom: 20,
	},
	activityRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	activityInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
	activityIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#E8F4FD",
		alignItems: "center",
		justifyContent: "center",
	},
	date: { fontSize: 16, fontWeight: "600", color: "#333" },
	time: { fontSize: 14, color: "#666" },
	circle: {
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 4,
		borderColor: "#4A90E2",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
	},
	circleText: { fontSize: 14, fontWeight: "bold", color: "#4A90E2" },
	statsRow: { flexDirection: "row", gap: 15, marginBottom: 30 },
	statCard: {
		flex: 1,
		backgroundColor: "rgba(255,255,255,0.9)",
		borderRadius: 16,
		padding: 20,
		alignItems: "center",
	},
	statNumber: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 5,
	},
	statLabel: { fontSize: 14, color: "#666" },
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
		backgroundColor: "rgba(255,255,255,0.9)",
		borderRadius: 12,
		padding: 16,
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	historyDate: {
		fontSize: 14,
		fontWeight: "600",
		color: "#333",
		marginBottom: 4,
	},
	historyDetail: { fontSize: 12, color: "#666" },
	historyValue: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
		textAlign: "right",
	},
	historyUnit: { fontSize: 12, color: "#666", textAlign: "right" },
	bottomNav: {
		backgroundColor: "rgba(0,0,0,0.3)",
		flexDirection: "row",
		paddingVertical: 15,
		justifyContent: "space-around",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
});
