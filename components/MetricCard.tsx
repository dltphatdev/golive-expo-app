import { Log } from "@/app/+types/step";
import {
	formatedDate,
	formatNumberCurrency,
	getActiveDuration,
} from "@/app/+utils/common";
import Spoint from "@/assets/images/header-spoint.svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

interface Props {
	log?: Log;
}

export default function MetricCard({ log }: Props) {
	return (
		<LinearGradient
			colors={["#4A499A", "#717099"]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={[styles.metricCardContainer]}
		>
			<View style={styles.metricCardTop}>
				<Text style={styles.metricCardDay}>
					{formatedDate(log?.date).toString() || "dd/mm/YYYY"}
				</Text>
				<View style={styles.metricCardSpoint}>
					<Text style={styles.metricCardLabel}>Số dư</Text>
					<View style={styles.metricCardLine}></View>
					<Text style={styles.metricCardTopNumber}>
						{log?.user.spoint
							? formatNumberCurrency(log.user.spoint).toString()
							: "00.00"}
					</Text>
					<Image
						style={{ width: 14, height: 14 }}
						width={14}
						height={14}
						source={require("@/assets/images/metric-top-spoint.png")}
					/>
				</View>
			</View>
			<View style={styles.metricCardBottom}>
				<View style={styles.metricCardBottomSpoint}>
					<LinearGradient
						colors={["#1D1B43", "#AD1C77"]}
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 0 }}
						style={styles.metricCardBottomSpointPlus}
					>
						<Text style={styles.metricCardBottomSpointTag}>+</Text>
						<Spoint width={21} />
						<Text style={styles.metricCardBottomSpointNumber} numberOfLines={1}>
							{log?.spoint_earned
								? formatNumberCurrency(log.spoint_earned).toString()
								: "00.00"}
						</Text>
					</LinearGradient>
					<LinearGradient
						colors={["#35397C", "#A7A3A3"]}
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 0 }}
						style={styles.metricCardBottomSpointMinus}
					>
						<Text style={styles.metricCardBottomSpointTag}>-</Text>
						<Spoint width={21} />
						<Text style={styles.metricCardBottomSpointNumber} numberOfLines={1}>
							00.00
						</Text>
					</LinearGradient>
				</View>
				<View style={styles.metricCardBottomInfo}>
					<View style={styles.metricCardBottomStepInfo}>
						<FontAwesome5
							name="walking"
							size={14}
							color="rgba(251, 118, 80, 1)"
						/>
						<Text style={styles.metricCardBottomStepNumber}>
							{log?.steps ? formatNumberCurrency(log.steps).toString() : "0000"}
						</Text>
					</View>
					<View style={styles.metricCardBottomTimeInfo}>
						<FontAwesome5
							name="clock"
							size={14}
							color="rgba(255, 255, 255, 1)"
						/>
						<Text style={styles.metricCardBottomStepNumber}>
							{log?.start_time && log.last_time
								? getActiveDuration(log.start_time, log.last_time)
								: "00p"}
						</Text>
					</View>
				</View>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	metricCardContainer: {
		borderRadius: 16,
		padding: 10,
	},
	metricCardTop: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	metricCardDay: {
		width: "50%",
		fontSize: 14,
		color: "rgba(255, 255, 255, 1)",
		fontWeight: 600,
	},
	metricCardSpoint: {
		flexDirection: "row",
		gap: 8,
		width: "50%",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	metricCardLabel: {
		fontSize: 12,
		color: "rgba(255, 255, 255, 1)",
		fontWeight: 400,
	},
	metricCardLine: {
		height: 14,
		width: 1,
		backgroundColor: "rgba(64, 64, 64, 1)",
	},
	metricCardTopNumber: {
		fontSize: 14,
		fontWeight: 600,
		color: "rgba(255, 255, 255, 1)",
	},
	metricCardBottom: {
		marginTop: 6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	metricCardBottomSpoint: {
		width: "50%",
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	metricCardBottomSpointPlus: {
		overflow: "hidden",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 5,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 5,
		paddingVertical: 6,
		paddingInline: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 4,
	},
	metricCardBottomSpointMinus: {
		paddingVertical: 6,
		paddingInline: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 4,
		overflow: "hidden",
		borderTopLeftRadius: 5,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 20,
	},
	metricCardBottomSpointTag: {
		color: "rgba(255, 255, 255, 1)",
		fontSize: 12,
		fontWeight: 600,
	},
	metricCardBottomSpointNumber: {
		color: "rgba(255, 255, 255, 1)",
		fontSize: 12,
		fontWeight: 600,
	},
	metricCardBottomInfo: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: 8,
		width: "50%",
	},
	metricCardBottomStepInfo: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 5,
		paddingInline: 10,
		paddingVertical: 8,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 4,
	},
	metricCardBottomStepNumber: {
		color: "rgba(255, 255, 255, 1)",
		fontWeight: 600,
		fontSize: 12,
	},
	metricCardBottomTimeInfo: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 5,
		paddingInline: 10,
		paddingVertical: 8,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 8,
	},
});
