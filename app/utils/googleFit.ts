import GoogleFit from "react-native-google-fit";

export const getStepsTodayAndroid = async () => {
	await GoogleFit.checkIsAuthorized();

	if (!GoogleFit.isAuthorized) {
		await GoogleFit.authorize();
	}

	const opt = {
		startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
		endDate: new Date().toISOString(),
	};

	const res = await GoogleFit.getDailyStepCountSamples(opt);
	const googleFitSteps = res.find((r) => r.source === "com.google.android.gms");

	const stepsToday = googleFitSteps?.steps?.[0]?.value ?? 0;
	return stepsToday;
};
