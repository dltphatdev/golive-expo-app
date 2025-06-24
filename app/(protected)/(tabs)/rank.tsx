import Header from "@/components/Header";
import LeaderBoard from "@/components/Leaderboard";
import RankItem from "@/components/RankItem";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function RankScreen() {
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

					{/* LeaderBoard */}
					<View style={styles.leaderBoardWp}>
						<LeaderBoard />
					</View>

					<View style={styles.rankContainer}>
						<RankItem />
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	gradient: { flex: 1 },
	content: { flex: 1, paddingVertical: 40, paddingInline: 10 },
	rankContainer: {
		marginTop: 16,
	},
	leaderBoardWp: {
		marginTop: 30,
	},
});
