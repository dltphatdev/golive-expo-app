import { CircleProgress } from "@/components/CircleProgress";
import Header from "@/components/Header";
import MetricCard from "@/components/MetricCard";
import WeeklyChart from "@/components/WeeklyChart";
import useMockStepWhenAppOpen from "@/hooks/useMockStepWhenAppOpen";
import useStepSyncOnFocus from "@/hooks/useStepSyncOnFocus";
import { LinearGradient } from "expo-linear-gradient";

import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
	const goal = 5000;
	const step = 3800;

	useMockStepWhenAppOpen(); // Khi mở app
	useStepSyncOnFocus(); // Khi app quay lại
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
					<Header />

					{/* CircleProgress */}
					<CircleProgress steps={step} goal={goal} />

					{/* WeeklyChart */}
					<WeeklyChart />

					{/* Metric Card */}
					<View style={styles.metricBox}>
						<Text style={styles.metricLabel}>Hoạt động</Text>
						<MetricCard />
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	gradient: { flex: 1 },
	content: { flex: 1, paddingVertical: 20, paddingInline: 10 },
	metricBox: {
		marginTop: 16,
	},
	metricLabel: {
		color: "rgba(255, 255, 255, 0.8)",
		fontSize: 18,
		fontWeight: 600,
		marginBottom: 10,
	},
});
