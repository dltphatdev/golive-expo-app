import {
	URL_LOGIN,
	URL_LOGOUT,
	URL_REFRESH_TOKEN,
	URL_REGISTER,
} from "@/app/apis/user.api";
import { ErrorResponseApi } from "@/app/types/common";
import { UserSuccessResponeApi } from "@/app/types/user";
import {
	clearLS,
	getAccessTokenFromLS,
	getRefreshTokenFromLS,
	setAccessTokenToLS,
	setProfileToLS,
	setRefreshTokenToLS,
} from "@/app/utils/auth";
import {
	isAxiosExpiredTokenError,
	isAxiosUnauthorizedError,
} from "@/app/utils/common";
import CONFIG from "@/constants/config";
import httpStatusCode from "@/constants/httpStatusCode";
import axios, {
	AxiosError,
	type AxiosInstance,
	type InternalAxiosRequestConfig,
} from "axios";

class HttpClient {
	accessToken: string = "";
	refreshToken: string = "";
	refreshTokenRequest: Promise<string> | null;
	instance: AxiosInstance;

	constructor() {
		this.refreshTokenRequest = null;
		this.instance = axios.create({
			baseURL: CONFIG.API_ENPOINT,
			timeout: CONFIG.ENPOINT_TIMEOUT,
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Add interceptors
		this.setupInterceptors();
	}

	async init() {
		this.accessToken = (await getAccessTokenFromLS()) || "";
		this.refreshToken = (await getRefreshTokenFromLS()) || "";
	}

	private setupInterceptors() {
		// Request interceptor
		this.instance.interceptors.request.use(
			(config) => {
				if (this.accessToken && config.headers) {
					config.headers.authorization = `Bearer ${this.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		// Response interceptor
		this.instance.interceptors.response.use(
			(response) => {
				const { url } = response.config;
				if (url === URL_LOGIN || url === URL_REGISTER) {
					const data = response.data as UserSuccessResponeApi;
					this.accessToken = data.data.access_token;
					this.refreshToken = data.data.refresh_token;
					setAccessTokenToLS(this.accessToken);
					setRefreshTokenToLS(this.refreshToken);
					setProfileToLS(data.data.user);
				} else if (url === URL_LOGOUT) {
					this.accessToken = "";
					this.refreshToken = "";
					clearLS();
				}
				return response;
			},
			async (error: AxiosError) => {
				const status = error.response?.status;
				const statusArr = [
					httpStatusCode.UnprocessableEntity,
					httpStatusCode.Unauthorized,
				];
				if (!statusArr.includes(status as 401 | 422)) {
					const data: any = error.response?.data;
					const message = data?.message || error.message;
					console.error(message);
				}

				if (
					isAxiosUnauthorizedError<
						ErrorResponseApi<{ name: string; message: string }>
					>(error)
				) {
					const config = error.response?.config;
					const url = config?.url;

					if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
						this.refreshTokenRequest = this.refreshTokenRequest
							? this.refreshTokenRequest
							: this.handleRefreshToken().finally(() => {
									setTimeout(() => {
										this.refreshTokenRequest = null;
									}, 10000);
							  });

						return this.refreshTokenRequest.then((access_token) => {
							if (config?.headers) config.headers.authorization = access_token;
							return this.instance({
								...config,
								headers: {
									...(config as InternalAxiosRequestConfig<any>).headers,
									authorization: access_token,
								},
							});
						});
					}

					clearLS();
					this.accessToken = "";
					this.refreshToken = "";
					console.error(
						error.response?.data?.data?.message || error.response?.data?.message
					);
				}

				return Promise.reject(error);
			}
		);
	}

	// You need to implement this method
	private async handleRefreshToken(): Promise<string> {
		// call refresh token API
		const res = await axios.post(URL_REFRESH_TOKEN, {
			refreshToken: this.refreshToken,
		});
		const newAccessToken = res.data.data.access_token;
		this.accessToken = newAccessToken;
		setAccessTokenToLS(newAccessToken);
		return newAccessToken;
	}
}

const http = new HttpClient();
export default http;
