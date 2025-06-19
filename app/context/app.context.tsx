import { User } from "@/app/types/user";
import { getProfileFromLS } from "@/app/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

interface AppContextInterface {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	profile: User | null;
	setProfile: React.Dispatch<React.SetStateAction<User | null>>;
	reset: () => void;
}

// Tạo context
export const AppContext = createContext<AppContextInterface>({
	isAuthenticated: false,
	setIsAuthenticated: () => null,
	profile: null,
	setProfile: () => null,
	reset: () => null,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [profile, setProfile] = useState<User | null>(null);
	useEffect(() => {
		// Load từ AsyncStorage
		const loadAuth = async () => {
			const accessToken = await AsyncStorage.getItem("access_token");
			const profileData = await getProfileFromLS();

			if (accessToken && profileData) {
				setIsAuthenticated(true);
				setProfile(profileData);
			}
		};

		loadAuth();
	}, []);
	const reset = async () => {
		setIsAuthenticated(false);
		setProfile(null);
		await AsyncStorage.multiRemove(["access_token", "profile"]);
	};
	return (
		<AppContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				profile,
				setProfile,
				reset,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
