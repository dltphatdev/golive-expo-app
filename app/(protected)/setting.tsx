import userApi from "@/app/+apis/user.api";
import { AppContext } from "@/app/+context/app.context";
import { getRefreshTokenFromLS } from "@/app/+utils/auth";
import ProfileButton from "@/assets/images/profile-btn.svg";
import HeaderOther from "@/components/HeaderOther";
import MenuOption from "@/components/MenuOption";
import httpStatusCode from "@/constants/httpStatusCode";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext } from "react";
import {
	Alert,
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const menus = [
	{
		labelName: "Thông tin",
		items: [
			{
				icon: (
					<FontAwesome5
						name="file"
						size={16}
						color="rgba(255, 255, 255, 0.9)"
					/>
				),
				name: "Đơn hàng của tôi",
			},
			{
				icon: (
					<FontAwesome5
						name="wallet"
						size={16}
						color="rgba(255, 255, 255, 0.9)"
					/>
				),
				name: "Điểm của tôi",
			},
			{
				icon: (
					<FontAwesome5
						name="heart"
						size={16}
						color="rgba(255, 255, 255, 0.9)"
					/>
				),
				name: "Đã yêu thích",
			},
			{
				icon: (
					<FontAwesome5
						name="star"
						size={16}
						color="rgba(255, 255, 255, 0.9)"
					/>
				),
				name: "Đánh giá của tôi",
			},
		],
	},
	{
		labelName: "Ứng dụng",
		items: [
			{
				icon: (
					<FontAwesome5
						name="book"
						size={16}
						color="rgba(255, 255, 255, 0.9)"
					/>
				),
				name: "Hướng dẫn sử dụng",
			},
			{
				icon: (
					<FontAwesome5
						name="info-circle"
						size={16}
						color="rgba(255, 255, 255, 0.9)"
					/>
				),
				name: "Chính sách bảo mật",
			},
			{
				icon: (
					<FontAwesome5
						name="info-circle"
						size={16}
						color="rgba(255, 255, 255, 0.9)"
					/>
				),
				name: "Điều khoản sử dụng",
			},
		],
	},
];

export default function SettingScreen() {
	const router = useRouter();
	const { reset, profile } = useContext(AppContext);

	const logoutMutation = useMutation({
		mutationFn: userApi.logout,
	});
	const handleLogout = async () => {
		try {
			const refresh_token = await getRefreshTokenFromLS();
			const res = await logoutMutation.mutateAsync({
				refresh_token: refresh_token as string,
			});
			Alert.alert(
				"Thông báo đăng xuất",
				res.data.message,
				[
					{
						text: "OK",
						onPress: reset,
					},
				],
				{ cancelable: false }
			);
		} catch (error: any) {
			if (error.status === httpStatusCode.UnprocessableEntity) {
				const formError = error.response?.data?.errors;
				if (formError) {
					Object.keys(formError).forEach((key) => {
						console.log(formError[key as keyof FormData]["msg"]);
					});
				}
			}
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={["rgba(33, 124, 197, 1)", "rgba(30, 105, 134, 1)"]}
				style={[styles.gradient, StyleSheet.absoluteFill]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
			>
				<ScrollView
					style={styles.content}
					contentContainerStyle={{ paddingBottom: 35 }}
				>
					{/* Header */}
					<HeaderOther />

					{/* Card Profile */}
					<LinearGradient
						colors={["#4A499A", "#717099"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.cardProfile}
					>
						<TouchableOpacity
							style={styles.profileButton}
							onPress={() => router.push("/(protected)/profile")}
						>
							<ProfileButton width={24} height={24} />
						</TouchableOpacity>
						<Image
							source={require("@/assets/images/profile.png")}
							style={styles.profileAvatar}
							width={64}
							height={64}
						/>
						<View style={styles.profileInfo}>
							<Text style={styles.profileFullName} numberOfLines={1}>
								{profile?.fullname || ""}
							</Text>
							<View style={styles.boxProfileBottom}>
								<Text style={styles.profilePhone}>{profile?.phone || ""}</Text>
								<View style={styles.profileVerify}>
									{profile?.verify === "Verified" ? (
										<Text style={styles.profileVerifyText}>Đã xác thực</Text>
									) : (
										<Text
											style={{
												fontSize: 14,
												color: "rgb(212, 37, 37)",
												fontWeight: 700,
											}}
										>
											Chưa xác thực
										</Text>
									)}
								</View>
							</View>
							<TouchableOpacity
								style={{ flexDirection: "row", gap: 8 }}
								onPress={handleLogout}
							>
								<Text style={{ color: "white", fontSize: 14 }}>Đăng xuất</Text>
								<Ionicons name="log-out-outline" size={22} color="white" />
							</TouchableOpacity>
						</View>
					</LinearGradient>

					{/* Card menu option */}
					<MenuOption data={menus} />
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: { flex: 1 },
	gradient: { flex: 1 },
	content: { flex: 1, paddingTop: 50, paddingInline: 10 },
	cardProfile: {
		position: "relative",
		flex: 1,
		borderRadius: 16,
		padding: 16,
		marginTop: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	profileAvatar: {
		width: 64,
		borderRadius: 64,
		overflow: "hidden",
	},
	profileFullName: {
		fontSize: 16,
		fontWeight: 700,
		color: "rgba(255, 255, 255, 0.85)",
		textTransform: "capitalize",
	},
	profileInfo: {
		marginTop: 16,
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
	},
	boxProfileBottom: {
		flexDirection: "row",
		gap: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	profilePhone: {
		color: "rgba(255, 255, 255, 0.9)",
		fontSize: 16,
		fontWeight: 700,
	},
	profileVerify: {
		borderColor: "rgba(82, 196, 26, 1)",
		borderWidth: 1,
		paddingVertical: 4,
		paddingInline: 8,
		borderRadius: 8,
	},
	profileVerifyText: {
		fontSize: 14,
		color: "rgba(82, 196, 26, 1)",
		fontWeight: 700,
	},
	profileButton: {
		position: "absolute",
		right: 16,
		top: 16,
	},
});
