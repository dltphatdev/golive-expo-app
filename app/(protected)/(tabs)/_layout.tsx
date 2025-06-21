import { Tabs } from "expo-router";
import { Building2, FileText, Home, ShoppingCart } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TabBarButtonProps {
	onPress: () => void;
	onLongPress: () => void;
	isFocused: boolean;
	label: string;
	icon: any;
	index: number;
}

function TabBarButton({
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
		backgroundColor: "#fff",
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

export default function TabLayout() {
	const activeIndex = useSharedValue(0);

	const tabs = [
		{ name: "index", label: "Trang chủ", icon: Home },
		{ name: "rank", label: "Xếp hạng", icon: Building2 },
		{ name: "news", label: "Tin tức", icon: FileText },
		{ name: "store", label: "Cửa hàng", icon: ShoppingCart },
	];

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
			tabBar={({ state, navigation }) => {
				return (
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							gap: 12,
							backgroundColor: "rgba(34, 34, 96, 1)",
							paddingBottom: 30,
							paddingTop: 16,
							borderTopLeftRadius: 16,
							borderTopRightRadius: 16,
							paddingHorizontal: 20,
							shadowOffset: {
								width: 0,
								height: -2,
							},
						}}
					>
						{state.routes.map((route, index) => {
							const isFocused = state.index === index;
							const tab = tabs[index];

							const onPress = () => {
								const event = navigation.emit({
									type: "tabPress",
									target: route.key,
									canPreventDefault: true,
								});

								if (!isFocused && !event.defaultPrevented) {
									navigation.navigate(route.name);
									activeIndex.value = withSpring(index);
								}
							};

							const onLongPress = () => {
								navigation.emit({
									type: "tabLongPress",
									target: route.key,
								});
							};

							return (
								<TabBarButton
									key={route.key}
									onPress={onPress}
									onLongPress={onLongPress}
									isFocused={isFocused}
									label={tab.label}
									icon={tab.icon}
									index={index}
								/>
							);
						})}
					</View>
				);
			}}
		>
			<Tabs.Screen name="index" options={{ title: "Trang chủ" }} />
			<Tabs.Screen name="rank" options={{ title: "Xếp hạng" }} />
			<Tabs.Screen name="news" options={{ title: "Tin tức" }} />
			<Tabs.Screen name="store" options={{ title: "Cửa hàng" }} />
		</Tabs>
	);
}
