import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Linking } from "react-native";

export default function VerifyEmailScreen() {
	const router = useRouter();

	useEffect(() => {
		const handleDeepLink = (event: { url: string }) => {
			const url = event.url;
			const token = url.split("token=")[1];
			console.log("✅ Received verify token:", token);

			// TODO: Gọi API verify
			// await api.verifyEmail(token)
			// router.push("/login") hoặc thông báo xác minh thành công
		};

		Linking.addEventListener("url", handleDeepLink);

		// Check nếu app mở từ deep link khi đang đóng
		Linking.getInitialURL().then((url) => {
			if (url) handleDeepLink({ url });
		});

		return () => {
			Linking.removeAllListeners("url");
		};
	}, []);

	return null; // hoặc loading UI
}
