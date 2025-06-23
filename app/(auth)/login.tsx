import userApi from "@/app/+apis/user.api";
import { AppContext } from "@/app/+context/app.context";
import { loginSchema } from "@/app/+utils/validation";
import Input from "@/components/Input";
import httpStatusCode from "@/constants/httpStatusCode";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
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

const formData = loginSchema;
type FormData = yup.InferType<typeof formData>;

export default function LoginScreen() {
	const router = useRouter();
	const { setIsAuthenticated, setProfile } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const insets = useSafeAreaInsets();

	const [rememberMe, setRememberMe] = useState(false);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(formData) as Resolver<FormData>,
	});

	const onSubmit = async (data: Pick<FormData, "email" | "password">) => {
		setIsLoading(true);
		try {
			const payload = rememberMe
				? {
						...data,
						remember_me: rememberMe,
				  }
				: data;
			const res = await userApi.login(payload);
			setIsAuthenticated(true);
			setProfile(res.data.data.user);
			Alert.alert(
				"Thông báo đăng nhập",
				res.data.message,
				[
					{
						text: "OK",
						onPress: () => router.push("/(protected)/(tabs)"),
					},
				],
				{ cancelable: false }
			);
		} catch (error: any) {
			if (error.status === httpStatusCode.UnprocessableEntity) {
				const formError = error.response?.data?.errors;
				if (formError) {
					Object.keys(formError).forEach((key) => {
						setError(key as keyof FormData, {
							message: formError[key as keyof FormData]["msg"],
							type: "Server",
						});
					});
				}
			}
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
					}}
					keyboardShouldPersistTaps="handled"
				>
					<View
						style={[
							styles.container,
							{ paddingTop: insets.top, paddingBottom: insets.bottom + 24 },
						]}
					>
						<View>
							<TouchableOpacity
								onPress={() => router.push("/onboarding")}
								style={styles.backButton}
							>
								<Ionicons name="arrow-back" size={24} color="white" />
							</TouchableOpacity>
							<Image
								source={require("../../assets/images/bg-auth.png")}
								style={{ height: 240, objectFit: "contain" }}
							/>
						</View>

						{/* Nội dung chính */}
						<View style={styles.formContainer}>
							<Text style={styles.title}>Đăng nhập tài khoản Golive 👋</Text>
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
							{/* Nhớ mật khẩu + Quên mật khẩu */}
							<View style={styles.rememberContainer}>
								<TouchableOpacity
									onPress={() => setRememberMe(!rememberMe)}
									style={styles.rememberTouch}
								>
									<View
										style={[
											styles.rememberRectangle,
											rememberMe && styles.rememerCheckbox,
										]}
									>
										{rememberMe && <Text style={styles.rememberTick}>✓</Text>}
									</View>
									<Text style={styles.checkboxText}>Nhớ mật khẩu</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => router.push("/forgot-password")}
								>
									<Text style={styles.forgotText}>Quên mật khẩu?</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.signupContainer}>
								{/* Đăng ký */}
								<View style={styles.signupRow}>
									<Text style={styles.normalText}>Bạn chưa có tài khoản? </Text>
									<TouchableOpacity onPress={() => router.push("/register")}>
										<Text style={styles.signupText}>Đăng ký ngay!</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity
									style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
									onPress={handleSubmit(onSubmit)}
									disabled={isLoading}
								>
									{isLoading ? (
										<ActivityIndicator color="#fff" />
									) : (
										<Text style={styles.loginButtonText}>Đăng nhập</Text>
									)}
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
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
		padding: 8,
		borderRadius: 100,
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
	rememberContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	rememberTouch: { flexDirection: "row", alignItems: "center" },
	forgotText: {
		color: "#246BFD",
		fontWeight: "500",
	},
	signupContainer: {
		flex: 1,
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
	rememberRectangle: {
		width: 19,
		height: 19,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 1,
		marginRight: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	rememerCheckbox: {
		backgroundColor: "#246BFD",
		borderColor: "#246BFD",
	},
	rememberTick: {
		color: "#fff",
		fontSize: 14,
	},
	checkboxText: {
		color: "rgba(30, 41, 64, 1)",
		fontSize: 14,
		fontWeight: "500",
	},
});
