import userApi from "@/app/+apis/user.api";
import { AppContext } from "@/app/+context/app.context";
import { getRefreshTokenFromLS } from "@/app/+utils/auth";
import httpStatusCode from "@/constants/httpStatusCode";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
	const router = useRouter();
	const { reset } = useContext(AppContext);
	const handleLogout = async () => {
		try {
			const refresh_token = await getRefreshTokenFromLS();
			const res = await userApi.logout({
				refresh_token: refresh_token as string,
			});
			Alert.alert(
				"Thông báo đăng xuất",
				res.data.message,
				[
					{
						text: "OK",
						onPress: reset,
					},
				],
				{ cancelable: false }
			);
		} catch (error: any) {
			if (error.status === httpStatusCode.UnprocessableEntity) {
				const formError = error.response?.data?.errors;
				if (formError) {
					Object.keys(formError).forEach((key) => {
						console.log(formError[key as keyof FormData]["msg"]);
					});
				}
			}
		}
	};
	return (
		<View style={{ marginTop: 50 }}>
			<TouchableOpacity onPress={() => router.back()}>
				<Text>Back</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={handleLogout}>
				<Text>Logout</Text>
			</TouchableOpacity>
			<Text>Trang profile</Text>
			<Text>Comming soon</Text>
		</View>
	);
}
