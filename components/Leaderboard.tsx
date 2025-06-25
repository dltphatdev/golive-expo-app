import { User } from "@/app/+types/user";
import { formatNumberCurrency, getCenteredList } from "@/app/+utils/common";
import Spoint from "@/assets/images/header-spoint.svg";

import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View } from "react-native";

interface Props {
	data?: User[];
}

export default function LeaderBoard({ data }: Props) {
	const sortTop3UserRankingSpoint = getCenteredList(data?.slice(0, 3) || []);

	return (
		<View style={styles.container}>
			{sortTop3UserRankingSpoint.map((user, index) => (
				<View key={user.id} style={styles.userItem}>
					{/* Rank badge */}
					<View
						style={[styles.rankBadge, index === 1 && styles.rankBadgeActive]}
					>
						<Text style={styles.rankText}>{index + 1}</Text>
					</View>

					{/* Avatar with glow */}
					<View
						style={[
							{ width: 80, height: 80, marginTop: 0 },
							index !== 1 && {
								...Platform.select({
									ios: {
										shadowColor: "rgba(110, 86, 33, 0.98)", // gold
										shadowOffset: { width: 0, height: 0 },
										shadowOpacity: 0.9,
										shadowRadius: 16,
									},
									android: {
										elevation: 15,
									},
								}),
							},
							index === 1 && styles.glowWrapper,
							{
								borderRadius: 999,
								alignItems: "center",
								justifyContent: "center",
							},
							index === 1 && { width: 112, height: 112, marginTop: -12 },
						]}
					>
						<View style={styles.avatar}>
							<Image
								source={
									user.avatar || require("@/assets/images/avatar-rank-demo.png")
								}
								style={styles.avatarImage}
							/>
						</View>
					</View>

					{/* Name */}
					<Text numberOfLines={2} ellipsizeMode="tail" style={styles.userName}>
						{user.fullname || ""}
					</Text>

					{/* Score + icon */}
					<View style={styles.scoreRow}>
						<Text style={styles.scoreText} numberOfLines={1}>
							{user.spoint
								? formatNumberCurrency(user.spoint).toString()
								: "0000"}
						</Text>
						<Spoint width={21} />
					</View>
				</View>
			))}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-end",
	},
	userItem: {
		alignItems: "center",
		marginHorizontal: 8,
		position: "relative",
	},
	rankBadge: {
		position: "absolute",
		top: 0,
		left: 12,
		backgroundColor: "#000",
		borderRadius: 999,
		width: 24,
		height: 24,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
	rankBadgeActive: {
		top: -12,
	},
	rankText: {
		color: "#fff",
		fontSize: 13,
		fontWeight: 400,
	},
	glowWrapper: {
		...Platform.select({
			ios: {
				shadowColor: "rgba(242, 210, 2, 1)", // gold
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.9,
				shadowRadius: 16,
			},
			android: {
				elevation: 15,
			},
		}),
	},
	avatar: {
		borderRadius: 999,
		overflow: "hidden",
		width: "100%",
		height: "100%",
	},
	avatarImage: {
		width: "100%",
		height: "100%",
	},
	userName: {
		color: "#fff",
		marginTop: 8,
		maxWidth: 100,
		fontSize: 16,
		textAlign: "center",
	},
	scoreRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 5,
		marginTop: 4,
	},
	scoreText: {
		color: "white", // yellow-400
		fontSize: 14,
		fontWeight: 600,
	},
});
