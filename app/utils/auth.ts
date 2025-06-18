import { User } from "@/app/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessTokenFromLS = async () => {
	return (await AsyncStorage.getItem("access_token")) || "";
};

export const getRefreshTokenFromLS = async () => {
	return (await AsyncStorage.getItem("refresh_token")) || "";
};

export const setAccessTokenToLS = async (access_token: string) => {
	await AsyncStorage.setItem("access_token", access_token);
};

export const setRefreshTokenToLS = async (refresh_token: string) => {
	await AsyncStorage.setItem("refresh_token", refresh_token);
};

export const getProfileFromLS = async (): Promise<User | null> => {
	const result = await AsyncStorage.getItem("profile");
	return result ? JSON.parse(result) : null;
};

export const setProfileToLS = async (profile: User) => {
	await AsyncStorage.setItem("profile", JSON.stringify(profile));
};

export const clearLS = async () => {
	await AsyncStorage.multiRemove(["access_token", "refresh_token", "profile"]);
};
