import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface Props {
	steps: number;
	goal: number;
}

export const CircleProgress = ({ steps, goal }: Props) => {
	const fill = Math.min((steps / goal) * 100, 100); // Tính phần trăm

	return (
		<View style={styles.container}>
			<AnimatedCircularProgress
				size={100}
				width={8}
				fill={fill}
				tintColor="#FF7143"
				backgroundColor="rgba(255, 255, 255, 0.2)"
				rotation={0}
				lineCap="round"
			>
				{() => (
					<View style={styles.inner}>
						<Text style={styles.icon}>
							<FontAwesome5 name="walking" size={20} color="white" />
						</Text>
						<Text style={styles.steps}>{steps}</Text>
						<Text style={styles.goal}>{goal}</Text>
					</View>
				)}
			</AnimatedCircularProgress>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	inner: {
		alignItems: "center",
	},
	icon: {
		fontSize: 20,
		marginBottom: 4,
		color: "white",
	},
	steps: {
		fontSize: 20,
		color: "white",
		fontWeight: "600",
	},
	goal: {
		fontSize: 16,
		color: "limegreen",
		fontWeight: "500",
	},
});
