import stepApi from "@/app/+apis/step.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";

export default function useStepSyncOnFocus() {
	const isSyncingRef = useRef(false);
	const updateStepMutation = useMutation({
		mutationFn: stepApi.updateStep,
	});

	useFocusEffect(
		useCallback(() => {
			const syncStep = async () => {
				if (isSyncingRef.current) return;
				isSyncingRef.current = true;
				try {
					const saved = await AsyncStorage.getItem("step_data");
					if (saved) {
						const parsed: {
							start_time: string;
							last_time: string;
							steps: number;
						} = JSON.parse(saved);
						await updateStepMutation.mutateAsync(parsed);
						await AsyncStorage.removeItem("step_data");
					}
				} catch (err) {
					console.error("❌ update step faild:", err);
				} finally {
					isSyncingRef.current = false;
				}
			};
			syncStep();
		}, [updateStepMutation])
	);
}
