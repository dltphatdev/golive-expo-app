import { ChartStep } from "@/app/+types/step";
import { formatNumberToSocicalStyle } from "@/app/+utils/common";
import { sortChartDataByWeek } from "@/app/+utils/sortChartDataByWeek";
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

interface Props {
	data: ChartStep[];
}

const { width } = Dimensions.get("window");

export default function WeeklyChart({ data }: Props) {
	if (!data || !data.length) return null;
	const sortedData = sortChartDataByWeek(data);
	const chartWidth = width - 40; // 40 = 20 padding trái + phải
	const chartHeight = 90;
	const columnCount = 7;
	const labelWidth = chartWidth / columnCount;

	// Tính toán các điểm (x, y)
	const chartPoints = sortedData.map((item, index) => {
		const x = index * labelWidth + labelWidth / 2;
		let y = chartHeight - (item.chartValue / 100) * chartHeight;
		return { x, y };
	});

	// Kết hợp điểm cho polyline
	const points = chartPoints.map((p) => `${p.x},${p.y}`).join(" ");
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
					{sortedData.map((item: ChartStep, index: number) => (
						<View
							key={index}
							style={{
								width: labelWidth,
								alignItems: "center",
							}}
						>
							{item.isCompleted && <Check width={18} height={18} />}
							<Text style={styles.dayText}>{item.date}</Text>
						</View>
					))}
				</View>

				{/* Biểu đồ */}
				<View>
					<ImageBackground
						resizeMode="stretch"
						source={require("@/assets/images/grap-chart.png")}
					>
						<Svg width={chartWidth} height={chartHeight}>
							<Polyline
								points={points}
								fill="none"
								stroke="rgba(255, 255, 255, 0.8)"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							{chartPoints.map((point, index) => (
								<Circle
									key={index}
									cx={point.x}
									cy={point.y}
									r="6"
									fill="rgba(255, 255, 255, 0.5)"
									stroke="white"
									strokeWidth="2"
								/>
							))}
						</Svg>
					</ImageBackground>
				</View>

				{/* Value labels */}
				<View style={[styles.valueRow]}>
					{sortedData.map((item: ChartStep, index: number) => (
						<View
							key={index}
							style={[styles.valueContainer, { width: labelWidth - 8 }]}
						>
							<Text style={styles.valueText}>
								{formatNumberToSocicalStyle(item.steps)}
							</Text>
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
		paddingInline: 5,
	},
	dayText: {
		color: "rgba(205, 205, 205, 1)",
		fontSize: 11,
		fontWeight: "500",
		marginTop: 6,
		marginBottom: 10,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	valueRow: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10,
		gap: 8,
		paddingBottom: 10,
	},
	valueContainer: {
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		paddingVertical: 2,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "rgba(255, 255, 255, 0.6)",
	},
	valueText: {
		color: "rgba(255, 255, 255, 1)",
		fontSize: 12,
		fontWeight: "500",
		textAlign: "center",
	},
});
