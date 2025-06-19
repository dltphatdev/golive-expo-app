import userApi from "@/app/apis/user.api";
import { AppContext } from "@/app/context/app.context";
import Input from "@/components/Input";
import httpStatusCode from "@/constants/httpStatusCode";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useContext, useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Modal,
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
	fullname: yup
		.string()
		.required("Vui lòng nhập họ tên")
		.min(2, "Họ tên tối thiểu 6 ký tự")
		.max(160, "Họ tên tối đa 160 ký tự"),
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
	date_of_birth: yup.date().max(new Date(), "Ngày tháng năm sinh chưa hợp lệ"),
	phone: yup.string().required().max(10, "Số điện thoại chỉ có thể 10 số"),
	gender: yup
		.string()
		.oneOf(["Male", "Female"], "Giới tính không hợp lệ")
		.required("Vui lòng chọn giới tính"),
});
type FormData = yup.InferType<typeof formData>;

export default function RegisterSreen() {
	const { setIsAuthenticated, setProfile } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [tempDate, setTempDate] = useState<Date | null>(null);
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			email: "",
			password: "",
			confirm_password: "",
			date_of_birth: new Date(1990, 0, 1),
			fullname: "",
			phone: "",
			gender: "Male",
		},
		resolver: yupResolver(formData) as Resolver<FormData>,
	});

	const onSubmit = async (
		data: Pick<
			FormData,
			"email" | "fullname" | "phone" | "date_of_birth" | "password" | "gender"
		>
	) => {
		setIsLoading(true);
		try {
			const payload = {
				...data,
				date_of_birth: new Date(data.date_of_birth as Date),
			};
			const res = await userApi.register(payload);
			setIsAuthenticated(true);
			setProfile(res.data.data.user);
			Alert.alert(
				res.data.message,
				"Vui lòng kiểm tra email để xác thực tài khoản.",
				[
					{
						text: "OK",
						onPress: () => router.push("/(protected)/verify-email"),
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
							<Text style={styles.title}>Đăng ký tài khoản Golive 👋</Text>
							<Text style={styles.subtitle}>
								Hãy cùng nâng cao sức khoẻ với Go Live App
							</Text>

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

							{/* date_of_birth */}
							<Text
								style={{
									fontSize: 18,
									marginBottom: 6,
									fontWeight: "700",
									color: "rgba(65, 65, 65, 1)",
								}}
							>
								Ngày tháng năm sinh
							</Text>
							<Controller
								control={control}
								name="date_of_birth"
								render={({ field: { onChange, value } }) => (
									<>
										<TouchableOpacity
											onPress={() => {
												setTempDate(value || new Date(1990, 0, 1));
												setShowDatePicker(true);
											}}
											style={styles.dateOfBirthTouchableOpacity}
										>
											<Ionicons
												name="calendar"
												size={20}
												style={{ marginRight: 8 }}
											/>
											<Text>
												{value
													? moment(value).format("DD/MM/YYYY")
													: "Chọn ngày sinh"}
											</Text>
										</TouchableOpacity>

										{/* Modal cho iOS */}
										{Platform.OS === "ios" && (
											<Modal
												transparent
												visible={showDatePicker}
												animationType="slide"
												onRequestClose={() => setShowDatePicker(false)}
											>
												<TouchableOpacity
													onPress={() => setShowDatePicker(false)}
													style={styles.modalDateOfBirthTouchableOpacity}
													activeOpacity={1}
												>
													<View style={styles.boxDateOfBirthLabel}>
														<Text style={styles.dateOfBirthLabel}>
															Chọn ngày sinh
														</Text>

														<DateTimePicker
															value={tempDate || new Date()}
															mode="date"
															display="spinner"
															maximumDate={new Date()}
															onChange={(e, selectedDate) => {
																if (selectedDate) setTempDate(selectedDate);
															}}
														/>

														<TouchableOpacity
															onPress={() => {
																if (tempDate) {
																	onChange(tempDate);
																}
																setShowDatePicker(false);
															}}
															style={
																styles.dateOfBirthTouchableOpacityContainerConfirm
															}
														>
															<Text
																style={
																	styles.dateOfBirthTouchableOpacityContainerConfirmLabel
																}
															>
																Xác nhận
															</Text>
														</TouchableOpacity>
													</View>
												</TouchableOpacity>
											</Modal>
										)}

										{/* Android dùng trực tiếp */}
										{Platform.OS === "android" && showDatePicker && (
											<DateTimePicker
												value={value || new Date()}
												mode="date"
												display="default"
												maximumDate={new Date()}
												onChange={(e, selectedDate) => {
													setShowDatePicker(false);
													if (selectedDate) {
														onChange(selectedDate);
													}
												}}
											/>
										)}
									</>
								)}
							/>

							{errors.date_of_birth && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.date_of_birth.message}
								</Text>
							)}

							{/* Gender */}
							<Text style={styles.genderLabel}>Giới tính</Text>
							<Controller
								control={control}
								name="gender"
								render={({ field: { onChange, value } }) => (
									<View style={{ flexDirection: "row", marginBottom: 12 }}>
										{[
											{ label: "Nam", value: "Male" },
											{ label: "Nữ", value: "Female" },
										].map((item) => (
											<TouchableOpacity
												key={item.value}
												onPress={() => onChange(item.value)}
												style={styles.genderTouchableOpacity}
											>
												<View style={styles.genderRadioOutner}>
													{value === item.value && (
														<View style={styles.genderRadioInner} />
													)}
												</View>
												<Text>{item.label}</Text>
											</TouchableOpacity>
										))}
									</View>
								)}
							/>
							{errors.gender && (
								<Text style={{ color: "red", marginBottom: 12 }}>
									{errors.gender.message}
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
										<Text style={styles.loginButtonText}>Đăng ký</Text>
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
	dateOfBirthTouchableOpacity: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "rgba(30, 41, 64, 1)",
		borderRadius: 12,
		padding: 20,
		marginBottom: 12,
	},
	modalDateOfBirthTouchableOpacity: {
		flex: 1,
		backgroundColor: "#00000055",
		justifyContent: "flex-end",
	},
	boxDateOfBirthLabel: {
		backgroundColor: "#fff",
		padding: 16,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
	},
	dateOfBirthLabel: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 10,
	},
	dateOfBirthTouchableOpacityContainerConfirm: {
		backgroundColor: "#246BFD",
		borderRadius: 8,
		padding: 12,
		marginTop: 12,
	},
	dateOfBirthTouchableOpacityContainerConfirmLabel: {
		color: "#fff",
		textAlign: "center",
		fontWeight: "600",
	},
	genderLabel: {
		fontSize: 18,
		marginBottom: 6,
		fontWeight: "700",
		color: "rgba(65, 65, 65, 1)",
	},
	genderTouchableOpacity: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 20,
	},
	genderRadioOutner: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#444",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 6,
	},
	genderRadioInner: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: "#246BFD",
	},
});
