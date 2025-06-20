import { ErrorResponseApi } from "@/app/types/common";
import { getStepsTodayAndroid } from "@/app/utils/googleFit";
import { getStepsTodayIOS } from "@/app/utils/iosFit";
import httpStatusCode from "@/constants/httpStatusCode";
import axios, { AxiosError } from "axios";
import { Platform } from "react-native";

export function isAxiosError<TypeError>(
	error: unknown
): error is AxiosError<TypeError> {
	return axios.isAxiosError(error);
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

export const getStepsToday = async (): Promise<number> => {
	return Platform.OS === "ios"
		? await getStepsTodayIOS()
		: await getStepsTodayAndroid();
};
