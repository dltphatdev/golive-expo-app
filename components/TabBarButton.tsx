import React, { useEffect } from "react";
import { Pressable, Text } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

interface TabBarButtonProps {
	onPress: () => void;
	onLongPress: () => void;
	isFocused: boolean;
	label: string;
	icon: any;
	index: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TabBarButton({
	onPress,
	onLongPress,
	isFocused,
	label,
	icon: Icon,
}: TabBarButtonProps) {
	const scale = useSharedValue(1);
	const opacity = useSharedValue(isFocused ? 1 : 0.6);
	const translateY = useSharedValue(0);

	useEffect(() => {
		scale.value = withSpring(isFocused ? 1.1 : 1, {
			damping: 15,
			stiffness: 150,
		});
		opacity.value = withSpring(isFocused ? 1 : 0.6);
		translateY.value = withSpring(isFocused ? -2 : 0);
	}, [isFocused, opacity, scale, translateY]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }, { translateY: translateY.value }],
		opacity: opacity.value,
	}));

	const backgroundStyle = useAnimatedStyle(() => ({
		backgroundColor: "white",
	}));

	const handlePressIn = () => {
		scale.value = withSpring(1, { damping: 15, stiffness: 200 });
	};

	return (
		<AnimatedPressable
			onPress={onPress}
			onLongPress={onLongPress}
			onPressIn={handlePressIn}
			style={[
				{
					alignItems: "center",
					justifyContent: "space-between",
					borderRadius: 10,
					minWidth: isFocused ? 126 : 60,
				},
				backgroundStyle,
			]}
		>
			<Animated.View
				style={[
					{
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "row",
						gap: 8,
						padding: 16,
					},
					animatedStyle,
				]}
			>
				<Icon size={28} color="rgba(34, 34, 96, 1)" strokeWidth={2} />

				<Text
					style={{
						fontSize: 14,
						color: "rgba(34, 34, 96, 1)",
						marginTop: 5,
						display: isFocused ? "flex" : "none",
					}}
				>
					{label}
				</Text>
			</Animated.View>
		</AnimatedPressable>
	);
}
