import HeaderSpoint from "@/assets/images/header-spoint.svg";
import StrakeIcon from "@/assets/images/strake.svg";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HeaderOther() {
	const router = useRouter();
	return (
		<View style={styles.header}>
			<View style={styles.headerLeft}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} color="white" />
				</TouchableOpacity>
				<View style={styles.headerStrake}>
					<StrakeIcon width={14} height={18} />
					<Text style={styles.headerStrakeText}>Chuỗi 2 ngày liên tục</Text>
				</View>
			</View>
			<TouchableOpacity
				style={styles.headerRight}
				onPress={() => router.push("/(protected)/history")}
			>
				<HeaderSpoint width={21} />
				<Text style={styles.headerSpointNumber}>3.034</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	headerStrake: {
		flexDirection: "row",
		gap: 9,
		alignItems: "center",
		paddingVertical: 8,
		paddingInline: 14,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 60,
	},
	headerStrakeText: {
		fontSize: 12,
		fontWeight: 600,
		color: "white",
	},
	headerSpointNumber: {
		fontSize: 12,
		fontWeight: 600,
		color: "white",
	},
	headerRight: {
		flexDirection: "row",
		gap: 4,
		alignItems: "center",
		paddingVertical: 8,
		paddingInline: 14,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 60,
	},
});
