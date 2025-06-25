import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
	data: {
		labelName: string;
		items: {
			icon: React.ReactNode;
			name: string;
			path?: string;
		}[];
	}[];
}

export default function MenuOption({ data }: Props) {
	const router = useRouter();
	return (
		<View style={styles.container}>
			{data.map((item, index) => {
				const marginBottomNumber = index !== data.length - 1 ? 16 : 0;
				return (
					<View key={index} style={{ marginBottom: marginBottomNumber }}>
						<Text style={styles.menuOptionLabel}>{item.labelName}</Text>
						<LinearGradient
							colors={["#4A499A", "#717099"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
							style={styles.menuOptionContent}
						>
							{item.items.map((itm, i) => {
								const borderBottom = i !== item.items.length - 1 ? 1 : 0;
								return (
									<View
										key={i}
										style={[
											styles.menuOptionItem,
											{
												borderBottomColor: "rgba(48, 48, 48, 1)",
												borderBottomWidth: borderBottom,
											},
										]}
									>
										<View style={styles.menuOptionItemLeft}>
											{itm.icon}
											<Text style={styles.menuOptionText}>{itm.name}</Text>
										</View>
										<TouchableOpacity
											onPress={() => router.push(itm.path || "/")}
										>
											<FontAwesome5
												name="chevron-right"
												size={14}
												color="rgba(255, 255, 255, 0.9)"
											/>
										</TouchableOpacity>
									</View>
								);
							})}
						</LinearGradient>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 16,
	},
	menuOptionLabel: {
		fontSize: 18,
		fontWeight: 700,
		color: "rgba(255, 255, 255, 0.9)",
		marginBottom: 16,
	},
	menuOptionContent: {
		borderRadius: 16,
	},
	menuOptionItem: {
		paddingInline: 24,
		paddingVertical: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	menuOptionItemLeft: {
		flexDirection: "row",
		gap: 18,
	},
	menuOptionText: {
		fontSize: 14,
		fontWeight: 400,
		color: "rgba(255, 255, 255, 0.85)",
	},
});
