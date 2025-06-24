import Spoint from "@/assets/images/header-spoint.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HistoryItem() {
	return (
		<LinearGradient
			colors={["#4A499A", "#717099"]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={styles.historyContainer}
		>
			<View style={styles.historyTop}>
				<Text style={styles.historyDay}>12/04/2025</Text>
				<View style={styles.historyCardSpoint}>
					<Text style={styles.historyCardLabel}>Số dư</Text>
					<View style={styles.historyCardLine}></View>
					<Text style={styles.historyCardTopNumber}>199.123</Text>
					<Image
						style={styles.historySpointImg}
						width={14}
						height={14}
						source={require("@/assets/images/metric-top-spoint.png")}
					/>
				</View>
			</View>
			<View style={styles.historyCardBottom}>
				<Text style={styles.historyCardBottomText}>Cộng điểm 12/04/2025</Text>

				<View style={styles.historyCardBottomInfo}>
					<LinearGradient
						colors={["#1D1B43", "#AD1C77"]}
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 0 }}
						style={styles.historyCardBottomSpointPlus}
					>
						<Text style={styles.historyCardBottomSpointTag}>+</Text>
						<Spoint width={21} />
						<Text
							style={styles.historyCardBottomSpointNumber}
							numberOfLines={1}
						>
							3.034
						</Text>
					</LinearGradient>
				</View>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	historyContainer: {
		borderRadius: 16,
		padding: 10,
	},
	historyTop: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	historyDay: {
		width: "50%",
		fontSize: 14,
		color: "rgba(255, 255, 255, 1)",
		fontWeight: 600,
	},
	historyCardSpoint: {
		flexDirection: "row",
		gap: 8,
		width: "50%",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	historyCardLabel: {
		fontSize: 12,
		color: "rgba(255, 255, 255, 1)",
		fontWeight: 400,
	},
	historyCardLine: {
		height: 14,
		width: 1,
		backgroundColor: "rgba(64, 64, 64, 1)",
	},
	historyCardTopNumber: {
		fontSize: 14,
		fontWeight: 600,
		color: "rgba(255, 255, 255, 1)",
	},
	historySpointImg: { width: 14, height: 14 },
	historyCardBottom: {
		marginTop: 6,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	historyCardBottomText: {
		fontSize: 12,
		fontWeight: 400,
		color: "rgba(255, 255, 255, 1)",
	},
	historyCardBottomInfo: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: 8,
		width: "50%",
	},
	historyCardBottomSpointPlus: {
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
	historyCardBottomSpointTag: {
		color: "rgba(255, 255, 255, 1)",
		fontSize: 12,
		fontWeight: 600,
	},
	historyCardBottomSpointNumber: {
		color: "rgba(255, 255, 255, 1)",
		fontSize: 12,
		fontWeight: 600,
	},
});
