import { User } from "@/app/+types/user";
import { formatNumberCurrency } from "@/app/+utils/common";
import Spoint from "@/assets/images/header-spoint.svg";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
	data?: User;
	index?: number;
}

export default function RankItem({ data, index }: Props) {
	return (
		<LinearGradient
			colors={["#4A499A", "#717099"]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={styles.streakContainer}
		>
			<View style={styles.streakLeft}>
				<Text style={styles.streakNumber}>
					{index || index === 0 ? (index + 1).toString() : "0"}
				</Text>
				<TouchableOpacity style={styles.streakAvatar}>
					<Image
						style={styles.streakImg}
						source={data?.avatar || require("@/assets/images/avatar.png")}
						width={30}
						height={30}
						resizeMode="contain"
					/>
				</TouchableOpacity>
				<Text style={styles.streakName}>{data?.fullname || ""}</Text>
			</View>
			<View style={styles.streakRight}>
				<Spoint width={21} />
				<Text style={styles.streakRightNumber}>
					{data?.spoint ? formatNumberCurrency(data.spoint).toString() : "0000"}
				</Text>
			</View>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	streakContainer: {
		padding: 10,
		width: "100%",
		borderRadius: 16,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
		overflow: "hidden",
		justifyContent: "space-between",
	},
	streakNumber: {
		fontSize: 14,
		fontWeight: 600,
		color: "rgba(255, 255, 255, 1)",
	},
	streakAvatar: {
		borderRadius: 30,
		overflow: "hidden",
	},
	streakName: {
		fontSize: 14,
		fontWeight: 600,
		color: "rgba(255, 255, 255, 1)",
	},
	streakLeft: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: 6,
	},
	streakRight: {
		flexDirection: "row",
		gap: 4,
		alignItems: "center",
		paddingVertical: 8,
		paddingInline: 12,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 60,
	},
	streakRightNumber: {
		fontSize: 12,
		fontWeight: 600,
		color: "white",
	},
	streakImg: { height: 30, width: 30 },
});
