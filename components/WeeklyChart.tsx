import Check from "@/assets/images/Check.svg";
import { LinearGradient } from "expo-linear-gradient";
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Svg, { Circle, Polyline } from "react-native-svg";

interface ChartData {
	day: string;
	value: string;
	completed: boolean;
	chartValue: number;
}

const { width } = Dimensions.get("window");

export default function WeeklyChart() {
	const chartWidth = width - 40; // paddingHorizontal: 20 * 2
	const chartHeight = 130;

	const data: ChartData[] = [
		{ day: "Thứ 2", value: "2.2K", completed: true, chartValue: 30 },
		{ day: "Thứ 3", value: "2.2K", completed: true, chartValue: 80 },
		{ day: "Thứ 4", value: "2.2K", completed: true, chartValue: 45 },
		{ day: "Thứ 5", value: "2.2K", completed: true, chartValue: 25 },
		{ day: "Thứ 6", value: "2.2K", completed: true, chartValue: 35 },
		{ day: "Thứ 7", value: "2.2K", completed: true, chartValue: 75 },
		{ day: "CN", value: "2.2K", completed: true, chartValue: 60 },
	];

	const labelWidth = chartWidth / data.length; // 7 cột chia đều

	const points = data
		.map((item, index) => {
			const x = index * labelWidth + labelWidth / 2;
			const y = chartHeight - (item.chartValue / 100) * chartHeight;
			return `${x},${y}`;
		})
		.join(" ");
	return (
		<LinearGradient
			colors={["rgba(31, 113, 163, 0.3)", "rgba(153, 153, 153, 0.3)"]}
			start={{ x: 0.5, y: 0 }}
			end={{ x: 0.5, y: 1 }}
			style={styles.container}
		>
			<View style={styles.content}>
				{/* Header (icon + label) */}
				<View style={[styles.headerRow, { width: chartWidth }]}>
					{data.map((item, index) => (
						<View
							key={index}
							style={{
								width: labelWidth,
								alignItems: "center",
							}}
						>
							<Check width={18} height={18} />
							<Text style={styles.dayText}>{item.day}</Text>
						</View>
					))}
				</View>

				{/* Biểu đồ */}
				<View>
					<ImageBackground
						resizeMode="contain"
						source={require("@/assets/images/grap-chart.png")}
					>
						<Svg width={chartWidth + labelWidth} height={chartHeight}>
							<Polyline
								points={points}
								fill="none"
								stroke="rgba(255, 255, 255, 0.5)"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							{data.map((item, index) => {
								const x = index * labelWidth + labelWidth / 2;
								const y = chartHeight - (item.chartValue / 100) * chartHeight;
								return (
									<Circle
										key={index}
										cx={x}
										cy={y}
										r="6"
										fill="rgba(255, 255, 255, 0.5)"
										stroke="white"
										strokeWidth="2"
									/>
								);
							})}
						</Svg>
					</ImageBackground>
				</View>

				{/* Value labels */}
				<View style={styles.valueRow}>
					{data.map((item, index) => (
						<View key={index} style={styles.valueContainer}>
							<Text style={styles.valueText}>{item.value}</Text>
						</View>
					))}
				</View>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 10,
		marginTop: 30,
	},
	content: {
		flex: 1,
		overflow: "hidden",
		paddingInline: 5,
	},
	dayText: {
		color: "rgba(205, 205, 205, 1)",
		fontSize: 14,
		fontWeight: "500",
		marginTop: 8,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	valueRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 12,
		paddingInline: 5,
	},
	valueContainer: {
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		paddingVertical: 4,
		paddingInline: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.6)",
		marginHorizontal: 2,
		alignItems: "center",
	},
	valueText: {
		color: "rgba(255, 255, 255, 1)",
		fontSize: 12,
		fontWeight: "500",
	},
});
