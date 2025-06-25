import AppleHealthKit from "react-native-health";

type HealthData = {
	steps: number;
	distance: number;
	calories: number;
	sleep: any[] | null;
	heartRate: any[] | null;
	weight: number | null;
	startTime: string | null;
	endTime: string | null;
};

const permissions = {
	permissions: {
		read: [
			AppleHealthKit.Constants.Permissions.StepCount,
			AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
			AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
			AppleHealthKit.Constants.Permissions.SleepAnalysis,
			AppleHealthKit.Constants.Permissions.HeartRate,
			AppleHealthKit.Constants.Permissions.Weight,
		],
		write: [],
	},
};

export const getAppleHealthDataIOS = async (): Promise<HealthData | null> => {
	return new Promise((resolve, reject) => {
		AppleHealthKit.initHealthKit(permissions, (err) => {
			if (err) {
				console.warn("HealthKit init error", err);
				reject(null);
				return;
			}

			const now = new Date();
			const startDate = new Date(now.setHours(0, 0, 0, 0)).toISOString();
			const endDate = new Date().toISOString();

			let steps = 0;
			let distance = 0;
			let calories = 0;
			let sleep: any[] | null = null;
			let heartRate: any[] | null = null;
			let weight: number | null = null;
			let startTime: string | null = null;
			let endTime: string | null = null;

			const tasks: Promise<void>[] = [
				new Promise((res) => {
					AppleHealthKit.getStepCount({ startDate, endDate }, (err, result) => {
						if (!err && result?.value) steps = result.value;
						res();
					});
				}),
				new Promise((res) => {
					AppleHealthKit.getDistanceWalkingRunning(
						{ startDate, endDate },
						(err, result) => {
							if (!err && result?.value) distance = result.value;
							res();
						}
					);
				}),
				new Promise((res) => {
					AppleHealthKit.getActiveEnergyBurned(
						{ startDate, endDate },
						(err, results) => {
							if (!err && results?.length)
								calories = results.reduce((sum, i) => sum + (i.value || 0), 0);
							res();
						}
					);
				}),
				new Promise((res) => {
					AppleHealthKit.getSleepSamples(
						{ startDate, endDate },
						(err, results) => {
							sleep = !err && results?.length ? results : null;
							res();
						}
					);
				}),
				new Promise((res) => {
					AppleHealthKit.getHeartRateSamples(
						{ startDate, endDate },
						(err, results) => {
							heartRate = !err && results?.length ? results : null;
							res();
						}
					);
				}),
				new Promise((res) => {
					AppleHealthKit.getWeightSamples(
						{ startDate, endDate },
						(err, results) => {
							if (!err && results?.length)
								weight = results[results.length - 1].value;
							res();
						}
					);
				}),
				new Promise((res) => {
					// dùng getSamples để lấy thời gian hoạt động bước chân
					AppleHealthKit.getSamples(
						{ startDate, endDate, type: "StepCount" as any },
						(err, results) => {
							if (!err && results?.length) {
								startTime = results[0].startDate;
								endTime = results[results.length - 1].endDate;
							}
							res();
						}
					);
				}),
			];

			Promise.all(tasks).then(() => {
				resolve({
					steps,
					distance,
					calories,
					sleep,
					heartRate,
					weight,
					startTime,
					endTime,
				});
			});
		});
	});
};
