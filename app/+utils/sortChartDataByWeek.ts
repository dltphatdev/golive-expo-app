import { ChartStep } from "@/app/+types/step";

function removeVietnameseTones(str: string): string {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D");
}

export function sortChartDataByWeek(data: ChartStep[]): ChartStep[] {
	const weekOrder = [
		"thu hai",
		"thu ba",
		"thu tu",
		"thu nam",
		"thu sau",
		"thu bay",
		"chu nhat",
	];

	return [...data].sort((a, b) => {
		const aKey = removeVietnameseTones(a.date.toLowerCase());
		const bKey = removeVietnameseTones(b.date.toLowerCase());

		const indexA = weekOrder.indexOf(aKey);
		const indexB = weekOrder.indexOf(bKey);

		// fallback nếu không tìm thấy trong weekOrder
		if (indexA === -1 || indexB === -1) return 0;

		return indexA - indexB;
	});
}
