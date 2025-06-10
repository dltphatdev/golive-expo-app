import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function RankScreen() {
	return (
		<View>
			<Button title="Quay lại" onPress={() => router.back()} />
			<Text>Trang Bảng Xếp hạng</Text>
		</View>
	);
}
