import { User } from "@/app/+types/user";
import { getAccessTokenFromLS, getProfileFromLS } from "@/app/+utils/auth";
import { createContext, useEffect, useState } from "react";

interface AppContextInterface {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	profile: User | null;
	setProfile: React.Dispatch<React.SetStateAction<User | null>>;
	reset: () => void;
	isInitializing: boolean;
}

export const AppContext = createContext<AppContextInterface>({
	isAuthenticated: false,
	setIsAuthenticated: () => null,
	profile: null,
	setProfile: () => null,
	reset: () => null,
	isInitializing: true,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [profile, setProfile] = useState<User | null>(null);
	const [isInitializing, setIsInitializing] = useState(true);
	useEffect(() => {
		// Load từ AsyncStorage
		async function loadAuth() {
			const [accessToken, profileData] = await Promise.all([
				getAccessTokenFromLS(),
				getProfileFromLS(),
			]);
			if (accessToken && profileData) {
				setIsAuthenticated(true);
				setProfile(profileData);
			}
			setIsInitializing(false);
		}
		loadAuth();
	}, []);
	const reset = async () => {
		setIsAuthenticated(false);
		setProfile(null);
	};
	return (
		<AppContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				profile,
				setProfile,
				reset,
				isInitializing,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
