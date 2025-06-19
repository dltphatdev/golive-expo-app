import ProtectedRoute from "@/components/ProtectedRoute";
import { Stack } from "expo-router";

export default function ProtectedLayout() {
	return (
		<ProtectedRoute>
			<Stack />
		</ProtectedRoute>
	);
}
