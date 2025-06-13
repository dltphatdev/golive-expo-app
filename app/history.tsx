import Header from "@/components/Header";
import HistoryItem from "@/components/HistoryItem";
import {
	FontAwesome5,
	Ionicons,
	MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HistoryScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={["#286BAF", "#77A5D4"]}
				style={[styles.gradient, StyleSheet.absoluteFill]}
			>
				<ScrollView
					style={styles.content}
					contentContainerStyle={{ paddingBottom: 135 }}
				>
					<Header headerTitle="Lịch sử" />
					{/* Time section */}
					<View style={styles.timeSection}>
						{/* Thời gian */}
						<View style={styles.timeItem}>
							<MaterialCommunityIcons
								name="timer-outline"
								size={24}
								color="#ff8c00"
							/>
							<Text style={styles.timeValue}>18,3 H</Text>
							<Text style={styles.timeLabel}>Thời gian</Text>
						</View>

						{/* Bước */}
						<View style={styles.divider} />
						<View style={styles.timeItem}>
							<FontAwesome5 name="walking" size={24} color="#ff8c00" />
							<Text style={styles.timeValue}>48,001</Text>
							<Text style={styles.timeLabel}>Bước</Text>
						</View>

						{/* S Point */}
						<View style={styles.divider} />
						<View style={styles.timeItem}>
							<Ionicons name="heart-circle-outline" size={24} color="#ff8c00" />
							<Text style={styles.timeValue}>1920</Text>
							<Text style={styles.timeLabel}>S Point</Text>
						</View>
					</View>

					{/* History item */}
					{[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
						<HistoryItem key={i} />
					))}
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: { flex: 1 },
	content: { flex: 1, padding: 20 },
	gradient: { flex: 1 },
	timeSection: {
		flexDirection: "row",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 20,
		paddingVertical: 16,
		paddingHorizontal: 12,
		justifyContent: "space-around",
		alignItems: "center",
		marginBottom: 20,
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.17)",
	},
	timeItem: {
		alignItems: "center",
		flex: 1,
	},
	divider: {
		width: 1,
		height: "38%",
		backgroundColor: "rgba(255,255,255,0.3)",
	},
	timeValue: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		marginTop: 4,
	},
	timeLabel: {
		fontSize: 14,
		color: "#fff",
		marginTop: 2,
	},
});
