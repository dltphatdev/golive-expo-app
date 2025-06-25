import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const slides = [
	{
		id: "1",
		title: "Đi bộ mỗi ngày\ncùng GoLive",
		description:
			"Đi bộ mỗi ngày, sức khỏe mỗi phút. Hãy để GoLive app cùng bạn nâng cao sức khoẻ của mình mỗi ngày.",
		backgroundColor: "#CDE3F3",
		image: require("@/assets/images/walk.png"),
	},
	{
		id: "2",
		title: "Vóc dáng\ncân đối cùng GoLive",
		description:
			"Vóc dáng thon gọn, tự tin toả sáng. Hãy để GoLive app cùng bạn cải thiện vóc dáng của mình mỗi ngày.",
		backgroundColor: "#D4ECCD",
		image: require("@/assets/images/health.png"),
	},
	{
		id: "3",
		title: "Tích điểm\nmua sắm cùng GoLive",
		description: "Tích điểm đổi quà, mua sắm thả ga cùng GoLive app.",
		backgroundColor: "#F8EED4",
		image: require("@/assets/images/start.png"),
	},
];

export default function Onboarding() {
	const insets = useSafeAreaInsets();
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef<FlatList>(null);
	const router = useRouter();

	const scrollToIndex = (index: number) => {
		flatListRef.current?.scrollToIndex({ index, animated: true });
		setCurrentIndex(index);
	};

	const onViewableItemsChanged = useRef(
		({ viewableItems }: { viewableItems: ViewToken[] }) => {
			const firstItem = viewableItems[0];
			if (firstItem?.index != null) {
				setCurrentIndex(firstItem.index);
			}
		}
	);
	const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "white",
				paddingTop: insets.top,
				paddingBottom: insets.bottom,
			}}
		>
			<FlatList
				ref={flatListRef}
				data={slides}
				keyExtractor={(item) => item.id}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={onViewableItemsChanged.current}
				viewabilityConfig={viewConfigRef.current}
				style={{ flex: 1 }}
				renderItem={({ item, index }) => (
					<View style={styles.slide}>
						<View
							style={[styles.card, { backgroundColor: item.backgroundColor }]}
						>
							<Text style={styles.title}>{item.title}</Text>
							<Text style={styles.description}>{item.description}</Text>
							<View style={styles.imageContainer}>
								<Image
									source={item.image}
									style={styles.image}
									resizeMode="contain"
								/>
							</View>
							<View style={styles.buttonRow}>
								{index > 0 && (
									<TouchableOpacity
										style={styles.arrowButton}
										onPress={() => scrollToIndex(index - 1)}
									>
										<Feather name="arrow-left" size={24} color="#F49612" />
									</TouchableOpacity>
								)}
								{index < slides.length - 1 && (
									<TouchableOpacity
										style={styles.arrowButton}
										onPress={() => scrollToIndex(index + 1)}
									>
										<Feather name="arrow-right" size={24} color="#F49612" />
									</TouchableOpacity>
								)}
							</View>
						</View>

						<View
							style={[styles.bottom, { backgroundColor: item.backgroundColor }]}
						>
							<TouchableOpacity
								style={styles.exploreButton}
								onPress={() => router.replace("/login")}
							>
								<Text style={styles.exploreText}>Khám phá ngay!</Text>
							</TouchableOpacity>
							<View style={styles.dots}>
								{slides.map((_, i) => (
									<View
										key={i}
										style={[styles.dot, currentIndex === i && styles.activeDot]}
									/>
								))}
							</View>
						</View>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	slide: {
		width,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,
		gap: 16,
	},
	card: {
		width: width * 0.9,
		borderRadius: 32,
		paddingVertical: 32,
		paddingInline: 32,
	},
	title: {
		fontSize: 48,
		fontWeight: "600",
		color: "#000",
	},
	description: {
		fontSize: 15,
		color: "#444",
		lineHeight: 22,
		marginVertical: 12,
	},
	image: {
		marginVertical: 10,
		width: 193,
		height: 193,
	},
	imageContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		width: "100%",
		marginTop: 20,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
		marginTop: 8,
	},
	arrowButton: {
		width: 56,
		height: 56,
		borderRadius: 56,
		borderColor: "#F49612",
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	bottom: {
		alignItems: "center",
		gap: 12,
		width: width * 0.9,
		borderRadius: 32,
		paddingHorizontal: 24,
		paddingVertical: 28,
	},
	exploreButton: {
		backgroundColor: "#235DFF",
		paddingVertical: 12,
		paddingHorizontal: 40,
		borderRadius: 12,
		width: "100%",
	},
	exploreText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
	dots: {
		flexDirection: "row",
		gap: 8,
		marginTop: 4,
	},
	dot: {
		width: 8,
		height: 8,
		backgroundColor: "#C0D4FF",
		borderRadius: 4,
	},
	activeDot: {
		backgroundColor: "#326BDF",
	},
});
