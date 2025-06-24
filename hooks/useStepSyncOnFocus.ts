import stepApi from "@/app/+apis/step.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function useStepSyncOnFocus() {
	useFocusEffect(
		useCallback(() => {
			const syncStep = async () => {
				const saved = await AsyncStorage.getItem("step_data");
				if (saved) {
					try {
						const parsed: {
							start_time: string;
							last_time: string;
							steps: number;
						} = JSON.parse(saved);
						await stepApi.updateStep(parsed);
						// console.log("upload step ok");
						await AsyncStorage.removeItem("step_data");
					} catch (err) {
						console.error("❌ update step thất bại:", err);
					}
				}
			};
			syncStep();
		}, [])
	);
}
