import { AppContext } from "@/app/context/app.context";
import { useRouter } from "expo-router";
import { ReactNode, useContext, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
type Props = {
	children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
	const { isAuthenticated } = useContext(AppContext);
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, router]);
	// ✅ Chưa xác định login hay đang redirect
	if (isAuthenticated === null || isAuthenticated === undefined) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	return <>{children}</>;
}
