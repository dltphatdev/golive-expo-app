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
	verify_code: yup
		.string()
		.required("Mã xác thực là bắt buộc")
		.max(6, "Mã xác thực cho phép tối đa 6 chữ số"),
});
type FormData = yup.InferType<typeof formData>;

export default function VerifyEmailScreen() {
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
			verify_code: "",
		},
		resolver: yupResolver(formData) as Resolver<FormData>,
	});
	const onSubmit = async (data: FormData) => {
		setIsLoading(true);
		try {
			const res = await userApi.verifyEmailUser(data);
			Alert.alert(
				"Thông báo xác thực",
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
							<Text style={styles.title}>Xác thực tài khoản Golive 👋</Text>
							<Text style={styles.subtitle}>
								Hãy cùng nâng cao sức khoẻ với Go Live App
							</Text>

							{/* Email */}
							<Controller
								control={control}
								name="verify_code"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Mã xác thực"
										icon="code"
										placeholder="Nhập mã xác thực"
										onChangeText={onChange}
										value={value}
										keyboardType="numeric"
										autoCapitalize="none"
									/>
								)}
							/>
							{errors.verify_code && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.verify_code.message}
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
										<Text style={styles.loginButtonText}>Xác thực</Text>
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
	signupContainer: {
		justifyContent: "center",
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
