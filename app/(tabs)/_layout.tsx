import { IconSymbol } from "@/components/ui/IconSymbol";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import RankIcon from "../../assets/images/shopping-bag.svg";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: "rgba(255, 112, 72, 1)",
				tabBarStyle: {
					position: "absolute",
					bottom: 32,
					left: 20,
					right: 20,
					height: 70,
					borderRadius: 20,
					backgroundColor: "#1B3D85",
					marginInline: 35,
				},
				tabBarItemStyle: {
					height: "100%",
					justifyContent: "center",
					alignItems: "center",
				},
				tabBarButton: (props) => (
					<TouchableWithoutFeedback onPress={props.onPress} accessible={false}>
						<View style={{ flex: 1 }}>{props.children}</View>
					</TouchableWithoutFeedback>
				),
				tabBarBackground: () => (
					<View
						style={{
							// backgroundColor: "rgba(47, 60, 80, 1)",
							borderRadius: 20,
						}}
					/>
				),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ focused }) => (
						<FontAwesome
							name="home"
							size={28}
							color={focused ? "rgba(255, 112, 72, 1)" : "#ccc"}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ color }) => (
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								height: "100%",
								marginTop: 35,
							}}
						>
							{/* <Ionicons
								name="chatbubble"
								size={24}
								color="rgba(255,255,255,0.6)"
							/> */}
							<RankIcon width={24} height={24} fill="#fff" />
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					title: "Setting",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="paperplane.fill" color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="rank"
				options={{
					title: "Rank",
					tabBarIcon: ({ color }) => (
						<IconSymbol size={28} name="paperplane.fill" color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
