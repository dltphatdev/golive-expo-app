import getMockStepData from "@/app/+utils/getMockStepData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function useMockStepWhenAppOpen() {
	useEffect(() => {
		const save = async () => {
			const steps = getMockStepData();
			const start = new Date();
			start.setHours(0, 0, 0, 0);
			const payload = {
				steps,
				start_time: start.toISOString(),
				last_time: new Date().toISOString(),
			};
			await AsyncStorage.setItem("step_data", JSON.stringify(payload));
		};

		save();
	}, []);
}
