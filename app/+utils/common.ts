import { ErrorResponseApi } from "@/app/+types/common";

import httpStatusCode from "@/constants/httpStatusCode";
import axios, { AxiosError } from "axios";

export function isAxiosError<TypeError>(
	error: unknown
): error is AxiosError<TypeError> {
	// eslint-disable-next-line import/no-named-as-default-member
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

// export const getStepsToday = async (): Promise<number> => {
// 	return Platform.OS === "ios"
// 		? await getStepsTodayIOS()
// 		: await getGoogleFitDataAndroid();
// };
