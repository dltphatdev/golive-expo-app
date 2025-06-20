import { getStepsToday } from "@/app/utils/common";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
	const [steps, setSteps] = useState(0);
	useEffect(() => {
		const fetchSteps = async () => {
			try {
				const stepCount = await getStepsToday();
				setSteps(stepCount);
			} catch (error) {
				console.log("Lỗi khi lấy bước chân:", error);
			}
		};

		fetchSteps();
	}, []);
	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<Text>Page Home 123</Text>
			<Text>Số bước hôm nay:</Text>
			<Text>{steps} bước</Text>
		</View>
	);
}
