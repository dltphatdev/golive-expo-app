import React, { useEffect, useRef } from "react";
import {
	Animated,
	GestureResponderEvent,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";

interface Props {
	focused: boolean;
	onPress?: (event: GestureResponderEvent) => void;
	icon: React.ReactNode;
	label: string;
}

export default function CustomTabBarButton({
	focused,
	onPress,
	icon,
	label,
}: Props) {
	const widthAnim = useRef(new Animated.Value(focused ? 120 : 50)).current;

	useEffect(() => {
		Animated.timing(widthAnim, {
			toValue: focused ? 120 : 50,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [focused, widthAnim]);

	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.9}
			style={styles.wrapper}
		>
			<Animated.View
				style={[
					styles.container,
					{
						width: widthAnim,
						backgroundColor: focused ? "#fff" : "transparent",
					},
				]}
			>
				{icon}
				{focused && <Text style={styles.label}>{label}</Text>}
			</Animated.View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 999,
		height: 48,
	},
	label: {
		marginLeft: 6,
		color: "#1a1a4b",
		fontWeight: "600",
	},
});
