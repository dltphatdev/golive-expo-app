const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function withGoogleFit(config) {
	return withAndroidManifest(config, async (config) => {
		const appManifest = config.modResults;
		const permissions = appManifest.manifest["uses-permission"] || [];

		if (
			!permissions.some(
				(p) => p.$["android:name"] === "android.permission.ACTIVITY_RECOGNITION"
			)
		) {
			permissions.push({
				$: { "android:name": "android.permission.ACTIVITY_RECOGNITION" },
			});
		}

		appManifest.manifest["uses-permission"] = permissions;
		return config;
	});
};
