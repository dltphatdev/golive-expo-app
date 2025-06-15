import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

export default function NewsScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={["#286BAF", "#77A5D4"]}
				style={[styles.gradient, StyleSheet.absoluteFill]}
			>
				<ScrollView
					style={styles.content}
					contentContainerStyle={{ paddingBottom: 150 }}
					stickyHeaderIndices={[0]}
				>
					<Header headerTitle="Tin tức, Sự kiện" />
					<View style={styles.news}>
						<View style={styles.newsItem}>
							<Image
								source={require("../../assets/images/news.png")}
								style={styles.newsImg}
							/>
							<View style={styles.newsContent}>
								<View style={styles.newsContainerTitle}>
									<Text style={styles.newsTitle} numberOfLines={1}>
										Nội dung sự kiện: Tin tức chó...
									</Text>
								</View>
								<View style={styles.meta}>
									<View style={styles.likes}>
										<Feather name="heart" size={14} color="#fff" />
										<Text style={styles.metaText}>3.4k</Text>
									</View>
									<View style={styles.boxMetaText}>
										<Text style={styles.metaText}>19:00 23/05/2025</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.newsItem}>
							<Image
								source={require("../../assets/images/news.png")}
								style={styles.newsImg}
							/>
							<View style={styles.newsContent}>
								<View style={styles.newsContainerTitle}>
									<Text style={styles.newsTitle} numberOfLines={1}>
										Nội dung sự kiện: Tin tức chó...
									</Text>
								</View>
								<View style={styles.meta}>
									<View style={styles.likes}>
										<Feather name="heart" size={14} color="#fff" />
										<Text style={styles.metaText}>3.4k</Text>
									</View>
									<View style={styles.boxMetaText}>
										<Text style={styles.metaText}>19:00 23/05/2025</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.newsItem}>
							<Image
								source={require("../../assets/images/news.png")}
								style={styles.newsImg}
							/>
							<View style={styles.newsContent}>
								<View style={styles.newsContainerTitle}>
									<Text style={styles.newsTitle} numberOfLines={1}>
										Nội dung sự kiện: Tin tức chó...
									</Text>
								</View>
								<View style={styles.meta}>
									<View style={styles.likes}>
										<Feather name="heart" size={14} color="#fff" />
										<Text style={styles.metaText}>3.4k</Text>
									</View>
									<View style={styles.boxMetaText}>
										<Text style={styles.metaText}>19:00 23/05/2025</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.newsItem}>
							<Image
								source={require("../../assets/images/news.png")}
								style={styles.newsImg}
							/>
							<View style={styles.newsContent}>
								<View style={styles.newsContainerTitle}>
									<Text style={styles.newsTitle} numberOfLines={1}>
										Nội dung sự kiện: Tin tức chó...
									</Text>
								</View>
								<View style={styles.meta}>
									<View style={styles.likes}>
										<Feather name="heart" size={14} color="#fff" />
										<Text style={styles.metaText}>3.4k</Text>
									</View>
									<View style={styles.boxMetaText}>
										<Text style={styles.metaText}>19:00 23/05/2025</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.newsItem}>
							<Image
								source={require("../../assets/images/news.png")}
								style={styles.newsImg}
							/>
							<View style={styles.newsContent}>
								<View style={styles.newsContainerTitle}>
									<Text style={styles.newsTitle} numberOfLines={1}>
										Nội dung sự kiện: Tin tức chó...
									</Text>
								</View>
								<View style={styles.meta}>
									<View style={styles.likes}>
										<Feather name="heart" size={14} color="#fff" />
										<Text style={styles.metaText}>3.4k</Text>
									</View>
									<View style={styles.boxMetaText}>
										<Text style={styles.metaText}>19:00 23/05/2025</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.newsItem}>
							<Image
								source={require("../../assets/images/news.png")}
								style={styles.newsImg}
							/>
							<View style={styles.newsContent}>
								<View style={styles.newsContainerTitle}>
									<Text style={styles.newsTitle} numberOfLines={1}>
										Nội dung sự kiện: Tin tức chó...
									</Text>
								</View>
								<View style={styles.meta}>
									<View style={styles.likes}>
										<Feather name="heart" size={14} color="#fff" />
										<Text style={styles.metaText}>3.4k</Text>
									</View>
									<View style={styles.boxMetaText}>
										<Text style={styles.metaText}>19:00 23/05/2025</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.newsItem}>
							<Image
								source={require("../../assets/images/news.png")}
								style={styles.newsImg}
							/>
							<View style={styles.newsContent}>
								<View style={styles.newsContainerTitle}>
									<Text style={styles.newsTitle} numberOfLines={1}>
										Nội dung sự kiện: Tin tức chó...
									</Text>
								</View>
								<View style={styles.meta}>
									<View style={styles.likes}>
										<Feather name="heart" size={14} color="#fff" />
										<Text style={styles.metaText}>3.4k</Text>
									</View>
									<View style={styles.boxMetaText}>
										<Text style={styles.metaText}>19:00 23/05/2025</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.newsItem}>
							<Image
								source={require("../../assets/images/news.png")}
								style={styles.newsImg}
							/>
							<View style={styles.newsContent}>
								<View style={styles.newsContainerTitle}>
									<Text style={styles.newsTitle} numberOfLines={1}>
										Nội dung sự kiện: Tin tức chó...
									</Text>
								</View>
								<View style={styles.meta}>
									<View style={styles.likes}>
										<Feather name="heart" size={14} color="#fff" />
										<Text style={styles.metaText}>3.4k</Text>
									</View>
									<View style={styles.boxMetaText}>
										<Text style={styles.metaText}>19:00 23/05/2025</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gradient: { flex: 1 },
	content: { flex: 1, padding: 20 },
	news: {
		gap: 14,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
	newsItem: {
		position: "relative",
		borderRadius: 12,
		overflow: "hidden",
		width: "48%",
	},
	newsImg: {
		width: "100%",
		resizeMode: "cover",
	},
	newsContent: {
		position: "absolute",
		padding: 8,
		bottom: 0,
		left: 0,
		gap: 1,
	},
	newsContainerTitle: {
		marginBottom: 4,
		paddingVertical: 3,
		paddingInline: 8,
		borderRadius: 14,
		backgroundColor: "rgba(161,161,162,0.4)",
	},
	newsTitle: {
		fontSize: 13,
		color: "#fff",
		fontWeight: "500",
	},
	meta: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 5,
	},
	likes: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 3,
		paddingInline: 8,
		borderRadius: 14,
		backgroundColor: "rgba(161,161,162,0.4)",
	},
	boxMetaText: {
		paddingVertical: 5,
		paddingInline: 8,
		borderRadius: 14,
		backgroundColor: "rgba(161,161,162,0.4)",
	},
	metaText: {
		fontSize: 9,
		color: "#fff",
		fontWeight: "500",
		marginLeft: 4,
	},
});
