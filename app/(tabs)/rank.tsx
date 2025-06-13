import Header from "@/components/Header";

import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	Image,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

const data = [
	{
		id: "1",
		name: "Phat",
		score: 10000,
		rank: 1,
		avatar: require("../../assets/images/react-logo.png"),
	},
	{
		id: "2",
		name: "Phi",
		score: 9000,
		rank: 2,
		avatar: require("../../assets/images/react-logo.png"),
	},
	{
		id: "3",
		name: "Thanh",
		score: 8000,
		rank: 3,
		avatar: require("../../assets/images/react-logo.png"),
	},
	{
		id: "4",
		name: "Mr A",
		rank: 2,
		avatar: require("../../assets/images/react-logo.png"),
		score: 7000,
	},
	{
		id: "5",
		name: "Mr B",
		rank: 3,
		avatar: require("../../assets/images/react-logo.png"),
		score: 6000,
	},
	{
		id: "6",
		name: "Ms C",
		rank: 4,
		avatar: require("../../assets/images/react-logo.png"),
		score: 5000,
	},
	{
		id: "7",
		name: "Ms D",
		rank: 5,
		avatar: require("../../assets/images/react-logo.png"),
		score: 6000,
	},
];

const tabScores = [
	{
		id: 1,
		score: "10.000",
		label: "Thành viên",
	},
	{
		id: 2,
		score: "10.000",
		label: "S Point",
	},
	{
		id: 3,
		score: "3.000",
		label: "Bước",
	},
];

export default function RankScreen() {
	return (
		<SafeAreaView style={styles.container}>
			<LinearGradient
				colors={["#1E70C1", "#73AEE1", "#E1B7C1"]}
				style={[styles.gradient, StyleSheet.absoluteFill]}
				start={{ x: 0.5, y: 0 }}
				end={{ x: 0.5, y: 1 }}
			>
				<ScrollView
					style={styles.content}
					contentContainerStyle={{ paddingBottom: 140 }}
				>
					{/* Header */}
					<Header headerTitle="Bảng xếp hạng" />

					{/* Podium */}
					<View style={styles.podium}>
						{data.slice(0, 3).map((item, index) => {
							const marginTop = index === 1 ? 0 : 26;
							const paddingLeft = index === 1 ? 2 : 0;
							const paddingRight = index === 1 ? 2 : 0;
							return (
								<View
									key={item.id}
									style={[
										styles.podiumItem,
										{ marginTop, paddingLeft, paddingRight },
									]}
								>
									<View style={styles.podiumAvatar}>
										<Image
											source={item.avatar}
											style={styles.podiumAvatarImg}
										/>
									</View>
									<Text style={styles.podiumName}>{item.name}</Text>
									<View style={styles.podiumScore}>
										<Text style={styles.podiumTextScore}>
											{item.score} S Point
										</Text>
									</View>
								</View>
							);
						})}
					</View>

					{/* Stats */}
					<View style={styles.statBar}>
						<View>
							<Image source={require("../../assets/images/2.png")} />
						</View>
						<View>
							<Image source={require("../../assets/images/1.png")} />
						</View>
						<View>
							<Image source={require("../../assets/images/3.png")} />
						</View>
					</View>

					{/* Tab score */}
					<View style={styles.tabScore}>
						{tabScores.map((item, index) => {
							const borderColor = index === 1 ? "#F5F5F5" : "";
							const borderLeftWidth = index === 1 ? 1 : 0;
							const borderRightWidth = index === 1 ? 1 : 0;
							return (
								<View
									key={item.id}
									style={[
										styles.tabScoreItem,
										{ borderColor, borderLeftWidth, borderRightWidth },
									]}
								>
									<Text style={styles.tabScoreNumber}>{item.score}</Text>
									<Text style={styles.tabScoreLabel}>{item.label}</Text>
								</View>
							);
						})}
					</View>

					{/* Ranking list */}
					<View>
						{data.slice(3).map((item, index) => {
							return (
								<View key={index} style={styles.listRankItem}>
									<View style={styles.rankNumber}>
										<Text>{item.rank}</Text>
									</View>
									<View style={styles.rankAvatar}>
										<Image style={styles.rankAvatarImg} source={item.avatar} />
									</View>
									<View style={styles.rankInfo}>
										<Text style={styles.rankName}>{item.name}</Text>
										<Text>{item.score} S Point</Text>
									</View>
								</View>
							);
						})}
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	gradient: { flex: 1 },
	content: { flex: 1, padding: 20 },
	podium: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	podiumItem: {
		alignItems: "center",
		gap: 12,
	},
	podiumAvatar: {
		width: 52,
		height: 52,
		borderWidth: 3,
		borderColor: "white",
		borderRadius: "100%",
	},
	podiumAvatarImg: {
		width: "100%",
		height: "100%",
	},
	podiumName: {
		fontSize: 18,
		color: "white",
		fontWeight: "bold",
	},
	podiumScore: {
		backgroundColor: "rgba(255,255,255,0.1)",
		borderRadius: 8,
		paddingInline: 16,
		paddingVertical: 10,
	},
	podiumTextScore: {
		color: "white",
		fontSize: 12,
		fontWeight: "500",
	},
	statBar: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "flex-end",
		marginTop: -10,
	},
	tabScore: {
		flexDirection: "row",
		borderRadius: 12,
		backgroundColor: "white",
		justifyContent: "center",
		gap: 8,
		marginBottom: 14,
	},
	tabScoreItem: {
		alignItems: "center",
		paddingVertical: 30,

		paddingInline: 28,
		gap: 4,
	},
	tabScoreNumber: {
		color: "#1D1D1D",
		fontSize: 16,
		fontWeight: "bold",
	},
	tabScoreLabel: {
		color: "#1D1D1D",
		fontSize: 14,
	},
	listRankItem: {
		flexDirection: "row",
		gap: 12,
		marginBottom: 12,
		paddingInline: 20,
		paddingVertical: 16,
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.875)",
		borderRadius: 12,
	},
	rankNumber: {
		borderWidth: 2,
		borderColor: "#A9A9A9",
		color: "#100445",
		fontWeight: "bold",
		paddingInline: 15,
		paddingVertical: 10,
		justifyContent: "center",
		alignContent: "center",
		borderRadius: 32,
	},
	rankAvatar: {
		borderRadius: "100%",
		width: 55,
		height: 55,
		objectFit: "cover",
	},
	rankInfo: {
		gap: 4,
	},
	rankName: {
		fontSize: 16,
		color: "#1D1D1D",
		fontWeight: "bold",
	},
	rankScore: {
		fontSize: 14,
		color: "#B4B4B4",
	},
	rankAvatarImg: {
		width: "100%",
		height: "100%",
		objectFit: "cover",
	},
});
