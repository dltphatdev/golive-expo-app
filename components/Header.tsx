import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import MessageSvg from "../assets/images/message-icon.svg";

interface Props {
	headerTitle?: string;
}
export default function Header({ headerTitle }: Props) {
	return (
		<View style={styles.header}>
			<View style={styles.headerStart}>
				<View style={styles.headerIcon}>
					<Ionicons
						name="chevron-back"
						size={20}
						color="white"
						onPress={() => router.back()}
					/>
				</View>
				<Text style={styles.headerLabel}>{headerTitle}</Text>
			</View>
			<MessageSvg width={24} height={24} color="white" />
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 36,
		marginBottom: 40,
	},
	headerStart: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 14,
	},
	headerIcon: {
		padding: 3,
		borderWidth: 2,
		borderColor: "rgba(255, 255, 255, 0.1)",
		alignItems: "center",
		borderRadius: 8,
	},
	headerLabel: { color: "white", fontSize: 17, fontWeight: "500" },
});
