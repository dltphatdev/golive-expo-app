import Spoint from "@/assets/images/header-spoint.svg";

import { Image } from "expo-image";
import { Platform, StyleSheet, Text, View } from "react-native";
const users = [
	{
		name: "Brooklyn Sim...",
		score: 1200,
		image: require("@/assets/images/avatar-rank-demo.png"),
		rank: 1,
	},
	{
		name: "Bradley Henry",
		score: 987,
		image: require("@/assets/images/avatar-rank-demo.png"),
		rank: 2,
	},
	{
		name: "Guy Hawkins",
		score: 900,
		image: require("@/assets/images/avatar-rank-demo.png"),
		rank: 3,
	},
];

const getSizeByRankStyle = (rank: number) => {
	switch (rank) {
		case 1:
			return { width: 112, height: 112, marginTop: -12 }; // large + lifted
		case 2:
		case 3:
			return { width: 75, height: 75, marginTop: 0 };
		default:
			return { width: 75, height: 75 };
	}
};
const sorted = [
	users.find((u) => u.rank === 2)!,
	users.find((u) => u.rank === 1)!,
	users.find((u) => u.rank === 3)!,
];
export default function LeaderBoard() {
	return (
		<View style={styles.container}>
			{sorted.map((user) => (
				<View key={user.rank} style={styles.userItem}>
					{/* Rank badge */}
					<View
						style={[
							styles.rankBadge,
							user.rank === 1 && styles.rankBadgeActive,
						]}
					>
						<Text style={styles.rankText}>{user.rank}</Text>
					</View>

					{/* Avatar with glow */}
					<View
						style={[
							getSizeByRankStyle(user.rank),
							user.rank === 1 && styles.glowWrapper,
							{
								borderRadius: 999,
								alignItems: "center",
								justifyContent: "center",
							},
						]}
					>
						<View style={styles.avatar}>
							<Image source={user.image} style={styles.avatarImage} />
						</View>
					</View>

					{/* Name */}
					<Text numberOfLines={1} ellipsizeMode="tail" style={styles.userName}>
						{user.name}
					</Text>

					{/* Score + icon */}
					<View style={styles.scoreRow}>
						<Text style={styles.scoreText} numberOfLines={1}>
							{user.score}
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
		fontSize: 12,
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
	},
	scoreRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		marginTop: 4,
	},
	scoreText: {
		color: "white", // yellow-400
		fontSize: 18,
		fontWeight: 600,
	},
});
