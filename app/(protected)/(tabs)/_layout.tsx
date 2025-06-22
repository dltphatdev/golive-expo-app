import IconTabHome from "@/assets/images/tab-home.svg";
import IconTabNews from "@/assets/images/tab-news.svg";
import IconTabRank from "@/assets/images/tab-rank.svg";
import IconTabStore from "@/assets/images/tab-store.svg";
import TabBarButton from "@/components/TabBarButton";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useSharedValue, withSpring } from "react-native-reanimated";

export default function TabLayout() {
	const activeIndex = useSharedValue(0);

	const tabs = [
		{ name: "index", label: "Trang chủ", icon: IconTabHome },
		{ name: "rank", label: "Xếp hạng", icon: IconTabRank },
		{ name: "news", label: "Tin tức", icon: IconTabNews },
		{ name: "store", label: "Cửa hàng", icon: IconTabStore },
	];

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
			}}
			tabBar={({ state, navigation }) => {
				return (
					<View style={styles.tabBar}>
						{state.routes.map((route, index) => {
							const isFocused = state.index === index;
							const tab = tabs.find((t) => t.name === route.name);
							if (!tab) return null;

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
			<Tabs.Screen name="store" options={{ title: "Cài đặt" }} />
		</Tabs>
	);
}

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 12,
		backgroundColor: "rgba(34, 34, 96, 1)",
		paddingBottom: 30,
		paddingTop: 16,
		paddingHorizontal: 20,
	},
});
