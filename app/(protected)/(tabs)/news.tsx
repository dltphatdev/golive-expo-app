import Header from "@/components/Header";
import NewsItem from "@/components/NewsItem";
import SlideCarousel from "@/components/SlideCarousel";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function NewsScreen() {
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
					contentContainerStyle={{ paddingBottom: 25 }}
				>
					{/* Header */}
					<View style={styles.wrapContent}>
						<Header />
					</View>

					{/* Slide */}
					<View style={styles.slideWp}>
						<SlideCarousel />
					</View>

					<View style={[styles.wrapContent, { marginTop: 20 }]}>
						<View style={styles.news}>
							{Array(6)
								.fill(0)
								.map((_, index) => {
									return <NewsItem key={index} />;
								})}
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	wrapContent: { paddingInline: 10 },
	container: { flex: 1 },
	gradient: { flex: 1 },
	content: { flex: 1, paddingVertical: 40 },
	slideWp: {
		marginTop: 16,
	},
	news: {
		gap: 12,
		flexDirection: "row",
		flexWrap: "wrap",
		flex: 1,
		justifyContent: "space-between",
	},
});
