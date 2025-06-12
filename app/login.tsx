import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function LoginScreen() {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [secure, setSecure] = useState(true);

	/*
  LOGIC LOGIN 

  const res = await fetch('https://api.com/login', {...});
  const data = await res.json();

  if (res.ok && data.token) {
    await AsyncStorage.setItem('token', data.token);
    router.replace('/(auth)/(tabs)/home'); // hoặc chỉ router.replace('/')
  } else {
    alert('Đăng nhập thất bại');
  }
  */

	return (
		<LinearGradient colors={["#0D57A2", "#7CACDE"]} style={styles.container}>
			<TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
				<Ionicons name="arrow-back" size={24} color="#fff" />
			</TouchableOpacity>
			<View style={styles.content}>
				<View style={styles.wrapper}>
					<View>
						{/* Logo */}
						<Image
							source={require("../assets/images/golive-logo.png")}
							style={styles.logo}
							resizeMode="contain"
						/>

						{/* Tiêu đề */}
						<Text style={styles.title}>Đăng nhập</Text>

						{/* Input SĐT */}
						<TextInput
							placeholder="Số điện thoại"
							placeholderTextColor="#ccc"
							style={styles.input}
							keyboardType="phone-pad"
							value={phone}
							onChangeText={setPhone}
						/>

						{/* Input Mật khẩu */}
						<View style={styles.passwordContainer}>
							<TextInput
								placeholder="Mật khẩu"
								placeholderTextColor="#ccc"
								secureTextEntry={secure}
								style={[styles.input, { flex: 1, marginBottom: 0 }]}
								value={password}
								onChangeText={setPassword}
							/>
							<Pressable
								onPress={() => setSecure(!secure)}
								style={styles.eyeIcon}
							>
								<Ionicons
									name={secure ? "eye-off" : "eye"}
									size={22}
									color="#ccc"
								/>
							</Pressable>
						</View>

						{/* Nhớ mật khẩu + Quên mật khẩu */}
						<View style={styles.row}>
							<TouchableOpacity
								style={styles.checkboxContainer}
								onPress={() => setRememberMe(!rememberMe)}
							>
								<View
									style={[
										styles.checkbox,
										rememberMe && styles.checkboxChecked,
									]}
								>
									{rememberMe && (
										<Ionicons name="checkmark" size={14} color="#fff" />
									)}
								</View>
								<Text style={styles.checkboxText}>Nhớ mật khẩu</Text>
							</TouchableOpacity>

							<TouchableOpacity>
								<Text style={styles.link}>Quên mật khẩu?</Text>
							</TouchableOpacity>
						</View>

						{/* Nút Đăng nhập */}
						<TouchableOpacity style={styles.button}>
							<Text style={styles.buttonText}>Đăng nhập</Text>
						</TouchableOpacity>
					</View>

					{/* Đăng ký */}
					<Text style={styles.footer}>
						Chưa có tài khoản? <Text style={styles.link}>Đăng ký</Text>
					</Text>
				</View>
			</View>
		</LinearGradient>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	wrapper: {
		flex: 1,
		justifyContent: "space-between",
		paddingHorizontal: 24,
		paddingBottom: 32,
	},
	logo: {
		height: 177,
		alignSelf: "center",
		marginBottom: 24,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
		marginBottom: 24,
	},
	input: {
		backgroundColor: "#2a3b4c",
		color: "#fff",
		borderRadius: 10,
		paddingHorizontal: 16,
		paddingVertical: 16,
		fontSize: 16,
		marginBottom: 16,
	},
	passwordContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	eyeIcon: {
		position: "absolute",
		right: 16,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 24,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#fff",
		marginRight: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	checkboxChecked: {
		backgroundColor: "#ff7043",
		borderColor: "#ff7043",
	},
	checkboxText: {
		color: "#fff",
		fontSize: 14,
	},
	link: {
		color: "#fff",
		textDecorationLine: "underline",
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "#ff7043",
		paddingVertical: 14,
		borderRadius: 12,
		alignItems: "center",
		marginBottom: 16,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	footer: {
		textAlign: "center",
		color: "#fff",
		fontSize: 14,
	},
	backButton: {
		paddingTop: 50,
		paddingInline: 24,
	},
});
