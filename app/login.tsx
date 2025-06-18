import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const [rememberMe, setRememberMe] = useState(false);

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			<View>
				<TouchableOpacity
					onPress={() => router.push("/onboarding")}
					style={styles.backButton}
				>
					<Ionicons name="arrow-back" size={24} color="white" />
				</TouchableOpacity>
				<Image
					source={require("../assets/images/bg-auth.png")}
					style={{ height: 280, objectFit: "contain" }}
				/>
			</View>

			{/* Nội dung chính */}
			<View style={styles.formContainer}>
				<Text style={styles.title}>Xin chào 👋</Text>
				<Text style={styles.subtitle}>
					Hãy cùng nâng cao sức khoẻ với Go Live App
				</Text>
				{/* Email */}
				<Input
					labelText="Email"
					placeholder="example@gmail.com"
					icon="mail"
				></Input>
				{/* Mật khẩu */}
				<Input
					labelText="Mật khẩu"
					placeholder="Nhập mật khẩu"
					icon="lock-closed"
					isPassword
				></Input>
				{/* Nhớ mật khẩu + Quên mật khẩu */}
				<View style={styles.row}>
					<TouchableOpacity
						onPress={() => setRememberMe(!rememberMe)}
						style={styles.checkboxRow}
					>
						<View
							style={[
								styles.checkboxBox,
								rememberMe && styles.checkboxBoxChecked,
							]}
						>
							{rememberMe && <Text style={styles.checkboxTick}>✓</Text>}
						</View>
						<Text style={styles.checkboxText}>Nhớ mật khẩu</Text>
					</TouchableOpacity>

					<TouchableOpacity>
						<Text style={styles.forgotText}>Quên mật khẩu?</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.signupContainer}>
				{/* Đăng ký */}
				<View style={styles.signupRow}>
					<Text style={styles.normalText}>Bạn chưa có tài khoản? </Text>
					<TouchableOpacity onPress={() => router.push("/register")}>
						<Text style={styles.signupText}>Đăng ký ngay!</Text>
					</TouchableOpacity>
				</View>

				{/* Nút đăng nhập */}
				<TouchableOpacity style={styles.loginButton}>
					<Text style={styles.loginButtonText}>Đăng nhập</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	backButton: {
		position: "absolute",
		top: 14,
		left: 14,
		zIndex: 10,
		backgroundColor: "#00000044",
		padding: 8,
		borderRadius: 100,
	},
	banner: {
		height: 200,
		backgroundColor: "#246BFD",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	formContainer: {
		flex: 1,
		paddingHorizontal: 24,
		marginTop: -80,
		backgroundColor: "#fff",
		paddingTop: 40,
	},
	title: {
		fontSize: 26,
		fontWeight: "600",
		marginBottom: 6,
	},
	subtitle: {
		color: "#888",
		marginBottom: 20,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	forgotText: {
		color: "#246BFD",
		fontWeight: "500",
	},
	signupContainer: {
		flex: 1,
		paddingInline: 24,
		justifyContent: "center",
	},
	signupRow: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	normalText: {
		color: "#444",
	},
	signupText: {
		color: "#246BFD",
		fontWeight: "500",
	},
	loginButton: {
		backgroundColor: "#246BFD",
		borderRadius: 12,
		paddingVertical: 20,
		alignItems: "center",
	},
	loginButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	checkboxRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkboxBox: {
		width: 19,
		height: 19,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 1,
		marginRight: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	checkboxBoxChecked: {
		backgroundColor: "#246BFD",
		borderColor: "#246BFD",
	},
	checkboxTick: {
		color: "#fff",
		fontSize: 14,
	},
	checkboxText: {
		color: "rgba(30, 41, 64, 1)",
		fontSize: 14,
		fontWeight: "500",
	},
});
