import userApi from "@/app/apis/user.api";
import Input from "@/components/Input";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as yup from "yup";

const formData = yup.object({
	// name: yup.string().required("Vui lòng nhập họ tên"),
	email: yup
		.string()
		.email("Email không hợp lệ")
		.required("Vui lòng nhập email"),
	password: yup
		.string()
		.min(6, "Mật khẩu tối thiểu 6 ký tự")
		.max(160, "Mật khẩu tối đa 160 ký tự")
		.required("Vui lòng nhập mật khẩu"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("password")], "Mật khẩu không khớp")
		.required("Vui lòng xác nhận mật khẩu"),
});
type FormData = yup.InferType<typeof formData>;
export default function RegisterSreen() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const insets = useSafeAreaInsets();
	// const [rememberMe, setRememberMe] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: "",
			password: "",
			confirm_password: "",
		},
		resolver: yupResolver(formData),
	});
	const onSubmit = async (data: { email: string; password: string }) => {
		setIsLoading(true);
		try {
			const res = await userApi.register(data);
			Alert.alert("Thông báo", res.data.message);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
					}}
					keyboardShouldPersistTaps="handled"
				>
					<View style={[styles.container, { paddingTop: insets.top }]}>
						<View>
							<TouchableOpacity
								onPress={() => router.push("/login")}
								style={styles.backButton}
							>
								<Ionicons name="arrow-back" size={24} color="white" />
							</TouchableOpacity>
							<Image
								source={require("../assets/images/bg-auth.png")}
								style={{ height: 240, objectFit: "contain" }}
							/>
						</View>

						{/* Nội dung chính */}
						<View style={styles.formContainer}>
							<Text style={styles.title}>Đăng ký tài khoản 👋</Text>
							<Text style={styles.subtitle}>
								Hãy cùng nâng cao sức khoẻ với Go Live App
							</Text>
							{/* Email */}
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Email"
										icon="mail"
										placeholder="Nhập email"
										onChangeText={onChange}
										value={value}
										keyboardType="email-address"
										autoCapitalize="none"
									/>
								)}
							/>
							{errors.email && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.email.message}
								</Text>
							)}
							{/* Mật khẩu */}
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Mật khẩu"
										icon="lock-closed"
										placeholder="Nhập mật khẩu"
										onChangeText={onChange}
										value={value}
										autoCapitalize="none"
										isPassword
									/>
								)}
							/>
							{errors.password && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.password.message}
								</Text>
							)}
							<Controller
								control={control}
								name="confirm_password"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Xác nhận mật khẩu"
										icon="lock-closed"
										placeholder="Xác nhận mật khẩu"
										onChangeText={onChange}
										value={value}
										autoCapitalize="none"
										isPassword
									/>
								)}
							/>
							{errors.confirm_password && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.confirm_password.message}
								</Text>
							)}
							<View style={styles.signupContainer}>
								<TouchableOpacity
									style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
									onPress={handleSubmit(onSubmit)}
									disabled={isLoading}
								>
									{isLoading ? (
										<ActivityIndicator color="#fff" />
									) : (
										<Text style={styles.loginButtonText}>Đăng ký</Text>
									)}
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
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
		// paddingInline: 24,
	},
	signupRow: {
		flexDirection: "row",
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
