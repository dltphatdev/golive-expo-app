import userApi from "@/app/apis/user.api";
import Input from "@/components/Input";
import httpStatusCode from "@/constants/httpStatusCode";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
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
const formData = yup.object({
	forgot_password_code: yup
		.string()
		.required("Mã xác thực là bắt buộc")
		.max(6, "Mã xác thực cho phép tối đa 6 chữ số"),
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

export default function ResetPasswordScreen() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const insets = useSafeAreaInsets();
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			forgot_password_code: "",
			password: "",
			confirm_password: "",
		},
		resolver: yupResolver(formData) as Resolver<FormData>,
	});
	const onSubmit = async (
		data: Pick<FormData, "forgot_password_code" | "password">
	) => {
		setIsLoading(true);
		try {
			const res = await userApi.resetPassword(data);
			Alert.alert(
				"Thông báo làm mới mật khẩu",
				res.data.message,
				[
					{
						text: "OK",
						onPress: () => router.push("/(auth)/login"),
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
								onPress={() => router.push("/login")}
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
							<Text style={styles.title}>Làm mới mật khẩu Golive 👋</Text>
							<Text style={styles.subtitle}>
								Hãy cùng nâng cao sức khoẻ với Go Live App
							</Text>

							{/* Code */}
							<Controller
								control={control}
								name="forgot_password_code"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Mã xác nhận làm mới mật khẩu"
										icon="code"
										placeholder="Nhập mã xác nhận làm mới mật khẩu"
										onChangeText={onChange}
										value={value}
										keyboardType="numeric"
										autoCapitalize="none"
									/>
								)}
							/>
							{errors.forgot_password_code && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.forgot_password_code.message}
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
							<View>
								<TouchableOpacity
									style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
									onPress={handleSubmit(onSubmit)}
									disabled={isLoading}
								>
									{isLoading ? (
										<ActivityIndicator color="#fff" />
									) : (
										<Text style={styles.loginButtonText}>Lưu</Text>
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
});
