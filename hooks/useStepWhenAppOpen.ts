import getMockStepData from "@/app/+utils/getMockStepData";
import { getGoogleFitDataAndroid } from "@/app/+utils/googleFit";
import { getAppleHealthDataIOS } from "@/app/+utils/iosFit";
import { isRunningInBuild } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Platform } from "react-native";

export default function useStepWhenAppOpen() {
	useEffect(() => {
		(async function () {
			let steps = 0;
			if (!isRunningInBuild) {
				steps = getMockStepData();
			} else {
				if (Platform.OS === "ios") {
					const data = await getAppleHealthDataIOS();
					steps = data?.steps || 0;
				} else if (Platform.OS === "android") {
					const data = await getGoogleFitDataAndroid();
					steps = data?.steps || 0;
				}
			}
			const start = new Date();
			start.setHours(0, 0, 0, 0);
			const payload = {
				steps,
				start_time: start.toISOString(),
				last_time: new Date().toISOString(),
			};
			await AsyncStorage.setItem("step_data", JSON.stringify(payload));
		})();
	}, []);
}
