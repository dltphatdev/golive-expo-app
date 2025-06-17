import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const [rememberMe, setRememberMe] = useState(false);
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View style={[styles.container, { paddingTop: insets.top }]}>
			{/* Nút Back */}
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
				></Image>
			</View>

			{/* Banner */}
			{/* <View style={styles.banner} /> */}

			{/* Nội dung chính */}
			<View style={styles.formContainer}>
				<Text style={styles.title}>Xin chào 👋</Text>
				<Text style={styles.subtitle}>
					Hãy cùng nâng cao sức khoẻ với Go Live App
				</Text>

				{/* Số điện thoại */}
				<Text style={styles.label}>Số điện thoại</Text>
				<View style={styles.inputContainer}>
					<Ionicons
						name="call"
						size={20}
						color="gray"
						style={styles.iconLeft}
					/>
					<TextInput
						style={styles.input}
						value={phone}
						onChangeText={setPhone}
						keyboardType="phone-pad"
						placeholder="0967xxxxxx"
					/>
				</View>

				{/* Mật khẩu */}
				<Text style={styles.label}>Mật khẩu</Text>
				<View style={styles.inputContainer}>
					<Ionicons
						name="lock-closed"
						size={20}
						color="gray"
						style={styles.iconLeft}
					/>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						secureTextEntry={!showPassword}
						placeholder="Nhập mật khẩu"
					/>
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Ionicons
							name={showPassword ? "eye" : "eye-off"}
							size={20}
							color="gray"
							style={styles.iconRight}
						/>
					</TouchableOpacity>
				</View>

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
					<TouchableOpacity>
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
		backgroundColor: "#246BFD", // Màu nền banner
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
	label: {
		fontSize: 18,
		marginBottom: 6,
		fontWeight: "700",
		color: "rgba(65, 65, 65, 1)",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "rgba(30, 41, 64, 1)",
		borderRadius: 12,
		marginBottom: 16,
		paddingHorizontal: 14,
	},
	input: {
		flex: 1,
		paddingVertical: 20,
	},
	iconLeft: {
		marginRight: 8,
	},
	iconRight: {
		marginLeft: 8,
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
