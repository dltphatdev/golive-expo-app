import stepApi from "@/app/+apis/step.api";
import { AppContext } from "@/app/+context/app.context";
import { GetStepRes } from "@/app/+types/step";
import { formatNumberCurrency } from "@/app/+utils/common";
import HeaderSpoint from "@/assets/images/header-spoint.svg";
import StrakeIcon from "@/assets/images/strake.svg";
import CONFIG from "@/constants/config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
	onSendData?: (data: GetStepRes) => void;
}

export default function Header({ onSendData }: Props) {
	const router = useRouter();
	const { profile } = useContext(AppContext);
	const getStepMutation = useQuery({
		queryKey: ["get_step"],
		queryFn: stepApi.getStep,
	});

	const dataStep = getStepMutation.data?.data.data;

	useEffect(() => {
		if (dataStep) {
			onSendData?.(dataStep);
		}
	}, [dataStep, onSendData]);

	const handlePressNavigateSetting = () => router.push("/(protected)/setting");
	return (
		<View style={styles.header}>
			<View style={styles.headerLeft}>
				<TouchableOpacity onPress={handlePressNavigateSetting}>
					<Image
						style={{ width: 30, height: 30, borderRadius: 30 }}
						source={
							profile?.avatar
								? { uri: `${CONFIG.SERVER_URL}image/${profile.avatar}` }
								: require("@/assets/images/noimage.png")
						}
						width={30}
					/>
				</TouchableOpacity>
				<View style={styles.headerStrake}>
					<StrakeIcon width={14} height={18} />
					<Text style={styles.headerStrakeText}>
						Chuỗi {dataStep?.lastStreakCount || 0} ngày liên tục
					</Text>
				</View>
			</View>
			<TouchableOpacity
				style={styles.headerRight}
				onPress={() => router.push("/(protected)/history")}
			>
				<HeaderSpoint width={21} />
				<Text style={styles.headerSpointNumber}>
					{formatNumberCurrency(dataStep?.stepLogToday.spoint_earned || 0)}
				</Text>
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
		gap: 5,
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
		paddingInline: 12,
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		borderRadius: 60,
	},
});
