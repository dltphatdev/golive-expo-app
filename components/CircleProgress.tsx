import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

interface Props {
	steps: number;
	goal: number;
}

export const CircleProgress = ({ steps, goal }: Props) => {
	const fill = Math.min((steps / goal) * 100, 100); // Tính phần trăm

	return (
		<View>
			<ImageBackground
				resizeMode="center"
				source={require("@/assets/images/bg-progess.png")}
			>
				<View style={styles.container}>
					<AnimatedCircularProgress
						size={300}
						width={10}
						fill={fill}
						tintColor="#FF7143"
						backgroundColor="white"
						rotation={180}
						lineCap="round"
					>
						{() => (
							<View style={styles.inner}>
								<Text style={styles.icon}>
									<FontAwesome5
										name="walking"
										size={80}
										color="rgba(251, 118, 80, 1)"
									/>
								</Text>
								<View style={styles.info}>
									<Text style={styles.steps}>{steps}</Text>
									<View style={styles.line}></View>
									<Text style={styles.goal}>{goal}</Text>
								</View>
							</View>
						)}
					</AnimatedCircularProgress>
				</View>
			</ImageBackground>
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
		flexDirection: "row",
		gap: 20,
	},
	icon: {
		marginBottom: 4,
	},
	steps: {
		fontSize: 48,
		color: "rgba(251, 118, 80, 1)",
		fontWeight: "600",
	},
	goal: {
		fontSize: 48,
		color: "rgba(67, 196, 101, 1)",
		fontWeight: "400",
	},
	line: {
		height: 1,
		backgroundColor: "white",
		width: "100%",
	},
	info: {
		gap: 10,
	},
});
