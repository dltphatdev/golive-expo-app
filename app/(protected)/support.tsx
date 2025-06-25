import supportApi from "@/app/+apis/support.api";
import { supportSchema } from "@/app/+utils/validation";
import Input from "@/components/Input";
import httpStatusCode from "@/constants/httpStatusCode";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Alert,
	Image,
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

const formData = supportSchema;
type FormData = yup.InferType<typeof formData>;
export default function SupportScreen() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const {
		control,
		handleSubmit,
		setError,
		reset,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: "",
			content: "",
			fullname: "",
			phone: "",
			address: "",
		},
		resolver: yupResolver(formData) as Resolver<FormData>,
	});

	const createSupportMutation = useMutation({
		mutationFn: supportApi.create,
	});

	const onSubmitForm = handleSubmit(async (data) => {
		setIsLoading(true);
		try {
			const payload = data;
			for (const key in payload) {
				if (
					payload[key as keyof typeof payload] === undefined ||
					payload[key as keyof typeof payload] === "" ||
					payload[key as keyof typeof payload] === null
				) {
					delete payload[key as keyof typeof payload];
				}
			}
			await createSupportMutation.mutateAsync(payload);

			Alert.alert(
				"Thông báo hỗ trợ khách hàng",
				"Chúng tôi đã nhận được thông tin từ bạn và sẽ liên hệ với bạn trong thời gian sớm nhất có thể",
				[
					{
						text: "OK",
						onPress: () => reset(),
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
	});

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			// keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
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
								onPress={() => router.back()}
								style={styles.backButton}
							>
								<Ionicons name="arrow-back" size={24} color="white" />
							</TouchableOpacity>
							<Image source={require("@/assets/images/bg-auth.png")} />
						</View>

						{/* Nội dung chính */}
						<View style={styles.formContainer}>
							<Text style={styles.title}>Trang hỗ trợ khách hàng</Text>

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

							{/* Fullname */}
							<Controller
								control={control}
								name="fullname"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Họ và tên"
										icon="person"
										placeholder="Họ và tên"
										onChangeText={onChange}
										value={value}
										autoCapitalize="words"
									/>
								)}
							/>
							{errors.fullname && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.fullname.message}
								</Text>
							)}

							{/* Address */}
							<Controller
								control={control}
								name="address"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Địa chỉ"
										icon="location-outline"
										placeholder="Nhập địa chỉ"
										onChangeText={onChange}
										value={value}
										keyboardType="default"
										autoCapitalize="none"
									/>
								)}
							/>
							{errors.address && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.address.message}
								</Text>
							)}

							{/* Phone */}
							<Controller
								control={control}
								name="phone"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Số điện thoại"
										icon="call"
										placeholder="Nhập số điện thoại"
										onChangeText={onChange}
										value={value}
										keyboardType="phone-pad"
									/>
								)}
							/>
							{errors.phone && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.phone.message}
								</Text>
							)}

							{/* Content */}
							<Controller
								control={control}
								name="content"
								render={({ field: { onChange, value } }) => (
									<Input
										labelText="Nội dung"
										icon="book"
										placeholder="Nhập nội dung"
										onChangeText={onChange}
										value={value}
										keyboardType="default"
										multiline
										numberOfLines={4}
									/>
								)}
							/>
							{errors.content && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.content.message}
								</Text>
							)}

							<View>
								<TouchableOpacity
									style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
									onPress={onSubmitForm}
									disabled={isLoading}
								>
									{isLoading ? (
										<ActivityIndicator color="#fff" />
									) : (
										<Text style={styles.loginButtonText}>Gửi</Text>
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
		marginBottom: 12,
	},
	loginButtonText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	loginButton: {
		backgroundColor: "#246BFD",
		borderRadius: 12,
		paddingVertical: 20,
		alignItems: "center",
		marginTop: 12,
	},
	avatarWrapper: {
		width: 160,
		height: 160,
		position: "relative",
	},
});
