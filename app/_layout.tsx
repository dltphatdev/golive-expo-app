import { AppProvider } from "@/app/+context/app.context";
import AuthListener from "@/components/AuthListener";
import TokenInitializer from "@/components/TokenInitializer";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 0,
		},
	},
});

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
	});

	if (!loaded) return null;

	return (
		<SafeAreaProvider>
			<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
				<QueryClientProvider client={queryClient}>
					<AppProvider>
						<TokenInitializer />
						<AuthListener />
						<Stack>
							<Stack.Screen name="index" options={{ headerShown: false }} />
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
							<Stack.Screen
								name="(protected)"
								options={{ headerShown: false }}
							/>
							<Stack.Screen name="+not-found" />
						</Stack>
						<StatusBar style="auto" />
					</AppProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</SafeAreaProvider>
	);
}
