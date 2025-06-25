import { ErrorResponseApi } from "@/app/+types/common";

import httpStatusCode from "@/constants/httpStatusCode";
import axios, { AxiosError } from "axios";

export function isAxiosError<TypeError>(
	error: unknown
): error is AxiosError<TypeError> {
	// eslint-disable-next-line import/no-named-as-default-member
	return axios.isAxiosError(error);
}
export function formatNumberCurrency(currency: number) {
	return Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocicalStyle(value: number) {
	return Intl.NumberFormat("en", {
		notation: "compact",
		maximumFractionDigits: 1,
	})
		.format(value)
		.replace(".", ",")
		.toLocaleLowerCase();
}

export function isAxiosUnprocessableEntityError<UnprocessableEntityError>(
	error: unknown
): error is AxiosError<UnprocessableEntityError> {
	return (
		isAxiosError(error) &&
		error.response?.status === httpStatusCode.UnprocessableEntity
	);
}

export function isAxiosUnauthorizedError<UnauthorizedError>(
	error: unknown
): error is AxiosError<UnauthorizedError> {
	return (
		isAxiosError(error) &&
		error.response?.status === httpStatusCode.Unauthorized
	);
}

export function isAxiosExpiredTokenError<ExpiredTokenError>(
	error: unknown
): error is AxiosError<ExpiredTokenError> {
	return (
		isAxiosUnauthorizedError<
			ErrorResponseApi<{ name: string; message: string }>
		>(error) && error.response?.data?.data?.name === "EXPIRED_TOKEN"
	);
}

export function formatedTime(isoDate?: string) {
	const date = isoDate ? new Date(isoDate) : null;
	return date
		? date.toLocaleString("vi-VN", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				timeZone: "Asia/Ho_Chi_Minh",
		  })
		: "";
}

export function formatedDate(isoDate?: string) {
	const date = isoDate ? new Date(isoDate) : null;
	return date
		? date.toLocaleString("vi-VN", {
				timeZone: "UTC",
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
		  })
		: "";
}

// export const getStepsToday = async (): Promise<number> => {
// 	return Platform.OS === "ios"
// 		? await getStepsTodayIOS()
// 		: await getGoogleFitDataAndroid();
// };

export function getActiveDuration(
	start: string | Date,
	end: string | Date
): string {
	const startTime = new Date(start);
	const endTime = new Date(end);

	if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
		return "Thời gian không hợp lệ";
	}

	const diff = endTime.getTime() - startTime.getTime();

	if (diff <= 0) return "00p";

	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

	if (hours > 0) {
		return `${hours}h${minutes}p`;
	} else {
		return `${minutes}p`;
	}
}

export function getCenteredList<T>(list: T[]): T[] {
	if (list.length === 0) return [];

	const result: T[] = [];
	const centerIndex = Math.floor(list.length / 2);

	result[centerIndex] = list[0]; // spoint cao nhất ở giữa

	let left = centerIndex - 1;
	let right = centerIndex + 1;
	let i = 1;

	while (i < list.length) {
		if (left >= 0) {
			result[left--] = list[i++];
		}
		if (i < list.length && right < list.length) {
			result[right++] = list[i++];
		}
	}

	return result;
}
