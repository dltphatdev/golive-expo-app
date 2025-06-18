import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
} from "react-native";

interface Props extends TextInputProps {
	labelText?: string;
	isPassword?: boolean;
	icon?: keyof typeof Ionicons.glyphMap;
}

export default function Input({ labelText, icon, isPassword, ...rest }: Props) {
	const [passwordVisible, setPasswordVisible] = useState(false);
	return (
		<View>
			{labelText && <Text style={styles.label}>{labelText}</Text>}
			<View style={styles.inputContainer}>
				{icon && (
					<Ionicons
						name={icon}
						size={20}
						color="gray"
						style={styles.iconLeft}
					/>
				)}
				<TextInput
					style={styles.input}
					secureTextEntry={isPassword && !passwordVisible}
					{...rest}
				/>
				{isPassword && (
					<TouchableOpacity
						onPress={() => setPasswordVisible(!passwordVisible)}
					>
						<Ionicons
							name={passwordVisible ? "eye" : "eye-off"}
							size={20}
							color="gray"
							style={styles.iconRight}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		fontSize: 18,
		marginBottom: 6,
		fontWeight: "700",
		color: "rgba(65, 65, 65, 1)",
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "rgba(30, 41, 64, 1)",
		borderRadius: 12,
		marginBottom: 16,
		paddingHorizontal: 14,
	},
	input: {
		flex: 1,
		paddingVertical: 20,
	},
	iconLeft: {
		marginRight: 8,
	},
	iconRight: {
		marginLeft: 8,
	},
});
