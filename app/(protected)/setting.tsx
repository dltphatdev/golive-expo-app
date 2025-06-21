import userApi from "@/app/+apis/user.api";
import { AppContext } from "@/app/+context/app.context";
import { getRefreshTokenFromLS } from "@/app/+utils/auth";

import httpStatusCode from "@/constants/httpStatusCode";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";

export default function SettingScreen() {
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
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Button title="Quay lại" onPress={() => router.back()} />
			<Text>Setting</Text>
			<TouchableOpacity onPress={handleLogout}>
				<Text>Logout</Text>
			</TouchableOpacity>
		</View>
	);
}
