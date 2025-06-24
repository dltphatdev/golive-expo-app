import React, { useCallback, useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Image,
	NativeScrollEvent,
	NativeSyntheticEvent,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface SlideData {
	id: string;
	image: any;
}

const slideData: SlideData[] = [
	{ id: "1", image: require("@/assets/images/slide.png") },
	{ id: "2", image: require("@/assets/images/slide.png") },
	{ id: "3", image: require("@/assets/images/slide.png") },
	{ id: "4", image: require("@/assets/images/slide.png") },
	{ id: "5", image: require("@/assets/images/slide.png") },
	{ id: "6", image: require("@/assets/images/slide.png") },
];

const SlideCarousel: React.FC = () => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const scrollRef = useRef<ScrollView>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const SLIDE_WIDTH = screenWidth * 0.72;
	const SIDE_PADDING = screenWidth * 0.14;

	const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetX = e.nativeEvent.contentOffset.x;
		const index = Math.round(offsetX / SLIDE_WIDTH);
		setCurrentIndex(index);
	};

	const scrollToIndex = useCallback(
		(index: number) => {
			scrollRef.current?.scrollTo({
				x: index * SLIDE_WIDTH,
				animated: true,
			});
		},
		[SLIDE_WIDTH]
	);

	// Auto-play logic
	useEffect(() => {
		const interval = setInterval(() => {
			let nextIndex = currentIndex + 1;
			if (nextIndex >= slideData.length) nextIndex = 0;
			scrollToIndex(nextIndex);
		}, 3000); // 3 giây

		return () => clearInterval(interval); // Cleanup
	}, [currentIndex, scrollToIndex]);

	const renderSlide = (item: SlideData, index: number) => {
		const inputRange = [
			(index - 1) * SLIDE_WIDTH,
			index * SLIDE_WIDTH,
			(index + 1) * SLIDE_WIDTH,
		];

		const scale = scrollX.interpolate({
			inputRange,
			outputRange: [0.92, 1, 0.92],
			extrapolate: "clamp",
		});

		return (
			<Animated.View
				key={item.id}
				style={[
					styles.slide,
					{
						width: SLIDE_WIDTH,
						transform: [{ scale }],
					},
				]}
			>
				<Image source={item.image} style={styles.image} />
			</Animated.View>
		);
	};

	return (
		<>
			<Animated.ScrollView
				ref={scrollRef}
				horizontal
				snapToInterval={SLIDE_WIDTH}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				bounces={false}
				contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
				onMomentumScrollEnd={handleScrollEnd}
			>
				{slideData.map(renderSlide)}
			</Animated.ScrollView>

			<View style={styles.dotsContainer}>
				{slideData.map((_, index) => (
					<TouchableOpacity
						key={index}
						style={[
							styles.dot,
							currentIndex === index ? styles.activeDot : styles.inactiveDot,
						]}
						onPress={() => scrollToIndex(index)}
					/>
				))}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	slide: {
		borderRadius: 8,
		overflow: "hidden",
	},
	image: {
		width: "100%",
	},
	dotsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 12,
	},
	dot: {
		width: 12,
		height: 4,
		borderRadius: 4,
		marginHorizontal: 4,
	},
	activeDot: {
		width: 24,
		backgroundColor: "rgba(255, 255, 255, 0.85)",
	},
	inactiveDot: {
		backgroundColor: "rgba(255, 255, 255, 0.45)",
	},
});

export default SlideCarousel;
