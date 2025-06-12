import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: "rgba(255, 112, 72, 1)",
				tabBarStyle: {
					position: "absolute",
					bottom: 40,
					left: 20,
					right: 20,
					height: 70,
					borderRadius: 20,
					backgroundColor: "#2F3C50",
					marginInline: 35,
					borderTopWidth: 0,
					elevation: 0,
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
							borderRadius: 16,
							backgroundColor: "#2F3C50",
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
						<View style={styles.containerItemIcon}>
							<FontAwesome
								name="home"
								size={32}
								color={focused ? "rgba(255, 112, 72, 1)" : "#fff"}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="explore"
				options={{
					title: "Explore",
					tabBarIcon: ({ focused }) => (
						<View style={styles.containerItemIcon}>
							<FontAwesome
								name="trophy"
								size={32}
								color={focused ? "rgba(255, 112, 72, 1)" : "#fff"}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="setting"
				options={{
					title: "Setting",
					tabBarIcon: ({ focused }) => (
						<View style={styles.containerItemIcon}>
							<FontAwesome
								name="shopping-bag"
								size={26}
								color={focused ? "rgba(255, 112, 72, 1)" : "#fff"}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="rank"
				options={{
					title: "Rank",
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: "center",
								justifyContent: "center",
								height: "100%",
								marginTop: 32,
							}}
						>
							<FontAwesome
								name="newspaper-o"
								size={28}
								color={focused ? "rgba(255, 112, 72, 1)" : "#fff"}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="history"
				options={{
					tabBarLabel: "History",
					href: null,
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	containerItemIcon: {
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		marginTop: 30,
	},
});
