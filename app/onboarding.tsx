import { router } from "expo-router";
import {
	Button,
	ImageBackground,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";

export default function OnboardingScreen() {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ImageBackground
				source={require("../assets/images/onboarding.png")}
				resizeMode="cover"
				style={{ flex: 1 }}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Button title="Back" />
				</TouchableOpacity>
			</ImageBackground>
		</SafeAreaView>
	);
}
