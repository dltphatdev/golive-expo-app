import Constants from "expo-constants";

export const isRunningInBuild = Constants.appOwnership !== "expo";

const CONFIG = {
	SERVER_URL: "http://192.168.1.39:8080/",
	API_ENPOINT: "http://192.168.1.39:8080/api/",
	// SERVER_URL: "http://10.10.10.106:8080/",
	// API_ENPOINT: "http://10.10.10.106:8080/api/",
	ENPOINT_TIMEOUT: 10000,
} as const;

export default CONFIG;
