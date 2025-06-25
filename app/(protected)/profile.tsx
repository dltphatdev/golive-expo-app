import userApi from "@/app/+apis/user.api";
import { AppContext } from "@/app/+context/app.context";
import { BodyUserProfile } from "@/app/+types/user";
import { updateProfileSchema } from "@/app/+utils/validation";
import Input from "@/components/Input";
import CONFIG from "@/constants/config";
import httpStatusCode from "@/constants/httpStatusCode";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Alert,
	Image,
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

const formData = updateProfileSchema;
type FormData = yup.InferType<typeof formData>;

export default function ProfileScreen() {
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const { setProfile } = useContext(AppContext);
	const [isLoading, setIsLoading] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [tempDate, setTempDate] = useState<Date | null>(null);
	const [avatarUri, setAvatarUri] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		setError,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		defaultValues: {
			address: "",
			avatar: "",
			date_of_birth: new Date(1990, 0, 1),
			fullname: "",
			phone: "",
		},
		resolver: yupResolver(formData) as Resolver<FormData>,
	});

	const { data: profileData, refetch } = useQuery({
		queryKey: ["profile"],
		queryFn: userApi.getProfile,
	});
	const updateProfileMutation = useMutation({
		mutationFn: userApi.updateProfile,
	});
	const uploadAvatarMutation = useMutation({
		mutationFn: userApi.uploadAvatar,
	});

	const profile = profileData?.data.data;

	useEffect(() => {
		setValue("fullname", profile?.fullname || "");
		setValue("address", profile?.address || "");
		setValue("avatar", profile?.avatar || "");
		setValue("phone", profile?.phone || "");
		setValue(
			"date_of_birth",
			profile?.date_of_birth
				? new Date(profile.date_of_birth)
				: new Date(1990, 0, 1)
		);
	}, [profile, setValue]);
	const avatar = watch("avatar");
	const onSubmit = async (data: BodyUserProfile) => {
		setIsLoading(true);
		try {
			let avatarName = avatar;
			if (avatarUri) {
				const form = new FormData();
				form.append("image", {
					uri: avatarUri,
					name: avatarUri.split("/").pop(),
				} as any);
				const uploadRes = await uploadAvatarMutation.mutateAsync(form);
				avatarName = uploadRes.data.data.filename;
				setValue("avatar", avatarName);
			}
			const payload = {
				...data,
				date_of_birth: new Date(data.date_of_birth as Date).toISOString(),
				avatar: avatarName,
			};
			for (const key in payload) {
				if (
					payload[key as keyof typeof payload] === undefined ||
					payload[key as keyof typeof payload] === "" ||
					payload[key as keyof typeof payload] === null
				) {
					delete payload[key as keyof typeof payload];
				}
			}
			const res = await updateProfileMutation.mutateAsync(payload);
			setProfile(res.data.data);
			Alert.alert(
				res.data.message,
				"Thông báo cập nhật tài khoản",
				[
					{
						text: "OK",
						onPress: () => refetch,
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

	const handlePickImage = async () => {
		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permission.granted) {
			Alert.alert(
				"Permission denied",
				"You need to allow photo access.",
				[
					{
						text: "OK",
						onPress: () => setValue("avatar", ""),
					},
				],
				{ cancelable: false }
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
		});

		if (!result.canceled) {
			const uri = result.assets[0].uri;
			setAvatarUri(uri);
			const selected = result.assets[0];
			const fileUri = selected.uri;
			const fileInfo = await FileSystem.getInfoAsync(fileUri);

			const fileExt = fileUri.split(".").pop()?.toLowerCase();

			if (!["jpg", "jpeg", "png"].includes(fileExt || "")) {
				Alert.alert(
					"Lỗi",
					"Dung lượng tối đa 1MB. Định dạng: JPG, JPEG, PNG.",
					[
						{
							text: "OK",
							onPress: () => {
								setAvatarUri(null);
							},
						},
					],
					{ cancelable: false }
				);
				return;
			}

			if (!fileInfo.exists) {
				Alert.alert(
					"Thông báo",
					"File không tồn tại",
					[
						{
							text: "OK",
							onPress: () => {
								setAvatarUri(null);
							},
						},
					],
					{ cancelable: false }
				);
				return;
			}

			if (fileInfo.size && fileInfo.size > 1 * 1024 * 1024) {
				Alert.alert(
					"File quá lớn",
					"Dung lượng tối đa là 1MB",
					[
						{
							text: "OK",
							onPress: () => {
								setAvatarUri(null);
							},
						},
					],
					{ cancelable: false }
				);
				return;
			}
			let file = "";
			if (fileUri) {
				file = fileUri.split("/").pop() || "";
			}
			setValue("avatar", file);
			setAvatarUri(fileUri);
		}
	};

	console.log(`${CONFIG.SERVER_URL}image/${profile?.avatar}`);

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
								onPress={() => router.back()}
								style={styles.backButton}
							>
								<Ionicons name="arrow-back" size={24} color="white" />
							</TouchableOpacity>
							<Image source={require("@/assets/images/bg-auth.png")} />
						</View>

						{/* Nội dung chính */}
						<View style={styles.formContainer}>
							<Text style={styles.title}>
								Trang thông tin cá nhân Golive 👋
							</Text>

							{/* Avatar */}
							<View style={{ alignItems: "center" }}>
								<View style={styles.avatarWrapper}>
									<Image
										source={
											avatarUri
												? { uri: avatarUri }
												: profile?.avatar
												? { uri: `${CONFIG.SERVER_URL}image/${profile.avatar}` }
												: require("@/assets/images/profile.png")
										}
										style={styles.avatar}
									/>
									<TouchableOpacity
										style={styles.choosenFile}
										onPress={handlePickImage}
									>
										<Ionicons name="create-outline" size={20} color="white" />
									</TouchableOpacity>
								</View>
							</View>

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

							{/* Date of birth */}
							<Text
								style={{
									fontSize: 18,
									marginBottom: 6,
									fontWeight: "700",
									color: "rgba(65, 65, 65, 1)",
								}}
							>
								Ngày sinh
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

							<View>
								<TouchableOpacity
									style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
									onPress={handleSubmit(onSubmit)}
									disabled={isLoading}
								>
									{isLoading ? (
										<ActivityIndicator color="#fff" />
									) : (
										<Text style={styles.loginButtonText}>Cập nhật</Text>
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
	avatar: {
		width: "100%",
		height: "100%",
		borderRadius: 160,
	},
	choosenFile: {
		position: "absolute",
		bottom: 8,
		right: 8,
		backgroundColor: "#1976D2",
		borderRadius: 16,
		padding: 6,
		zIndex: 2,
	},
});
