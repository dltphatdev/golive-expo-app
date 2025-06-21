import AppleHealthKit, {
	HealthInputOptions,
	HealthPermission,
} from "react-native-health";

export const getStepsTodayIOS = async (): Promise<number> => {
	const options = {
		permissions: {
			read: [
				AppleHealthKit.Constants.Permissions.StepCount as HealthPermission,
			],
			write: [], // ✅ phải có write (dù là rỗng)
		},
	};

	return new Promise((resolve, reject) => {
		AppleHealthKit.initHealthKit(options, (err) => {
			if (err) {
				reject("HealthKit init failed: " + JSON.stringify(err));
				return;
			}

			const today = new Date();
			const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
			const endOfDay = new Date().toISOString();

			const opts: HealthInputOptions = {
				startDate: startOfDay,
				endDate: endOfDay,
			};

			AppleHealthKit.getStepCount(opts, (err, results) => {
				if (err) {
					reject("getStepCount failed: " + JSON.stringify(err));
				} else {
					resolve(results.value ?? 0);
				}
			});
		});
	});
};
