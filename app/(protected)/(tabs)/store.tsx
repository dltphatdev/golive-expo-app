import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Button title="Quay lại" onPress={() => router.back()} />
			<Text>Trang cửa hàng</Text>
			<Button
				title="Setting"
				onPress={() => router.push("/(protected)/setting")}
			/>
		</View>
	);
}
