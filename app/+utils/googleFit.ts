import GoogleFit, { BucketUnit, Scopes } from "react-native-google-fit";
type ActivitySampleWithActivity = {
	start: string;
	end: string;
	activity: string;
	steps?: number;
	distance?: number;
};

const getStepCount = async (startDate: string, endDate: string) => {
	const res = await GoogleFit.getDailyStepCountSamples({ startDate, endDate });
	const steps = res.find((r) => r.source === "com.google.android.gms");
	return steps?.steps?.[0]?.value ?? 0;
};

const getDistance = async (startDate: string, endDate: string) => {
	const res = await GoogleFit.getDailyDistanceSamples({ startDate, endDate });
	return res?.[0]?.distance ?? 0;
};

const getCalories = async (startDate: string, endDate: string) => {
	const res = await GoogleFit.getDailyCalorieSamples({ startDate, endDate });
	return res?.reduce((sum, item) => sum + (item.calorie || 0), 0);
};

const getSleep = async ({
	startDate,
	endDate,
	inLocalTimeZone = true,
}: {
	startDate: string;
	endDate: string;
	inLocalTimeZone?: boolean;
}) => {
	const res = await GoogleFit.getSleepSamples(
		{ startDate, endDate },
		inLocalTimeZone
	);
	return res?.length > 0 ? res : null;
};

const getHeartRate = async (startDate: string, endDate: string) => {
	const res = await GoogleFit.getHeartRateSamples({ startDate, endDate });
	return res?.length > 0 ? res : null;
};

const getWeight = async (startDate: string, endDate: string) => {
	const res = await GoogleFit.getWeightSamples({ startDate, endDate });
	return res?.[0]?.value ?? null;
};

const getStartEndTime = async (startDate: string, endDate: string) => {
	const samples = (await GoogleFit.getActivitySamples({
		startDate,
		endDate,
		bucketUnit: BucketUnit.MINUTE, // có thể không bắt buộc
		bucketInterval: 1,
	})) as unknown as ActivitySampleWithActivity[];

	// Lọc session đi bộ, chạy bộ
	const walkingSessions = samples.filter((s) =>
		["walking", "on_foot", "running"].includes(s.activity)
	);

	if (walkingSessions.length === 0) return { startTime: null, endTime: null };

	const startTime = new Date(walkingSessions[0].start);
	const endTime = new Date(walkingSessions[walkingSessions.length - 1].end);

	return {
		startTime: startTime.toISOString(),
		endTime: endTime.toISOString(),
	};
};

export const getGoogleFitDataAndroid = async () => {
	try {
		await GoogleFit.checkIsAuthorized();

		if (!GoogleFit.isAuthorized) {
			await GoogleFit.authorize({
				scopes: [
					Scopes.FITNESS_ACTIVITY_READ,
					Scopes.FITNESS_LOCATION_READ,
					Scopes.FITNESS_BODY_READ,
					Scopes.FITNESS_NUTRITION_READ,
					Scopes.FITNESS_SLEEP_READ,
					Scopes.FITNESS_HEART_RATE_READ,
				],
			});
		}

		const startDate = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
		const endDate = new Date().toISOString();

		const [
			steps,
			distance,
			calories,
			sleep,
			heartRate,
			weight,
			{ startTime, endTime },
		] = await Promise.all([
			getStepCount(startDate, endDate),
			getDistance(startDate, endDate),
			getCalories(startDate, endDate),
			getSleep({ startDate, endDate }),
			getHeartRate(startDate, endDate),
			getWeight(startDate, endDate),
			getStartEndTime(startDate, endDate),
		]);

		return {
			steps,
			distance,
			calories,
			sleep,
			heartRate,
			weight,
			startTime,
			endTime,
		};
	} catch (err) {
		console.warn("Google Fit error:", err);
		return null;
	}
};
