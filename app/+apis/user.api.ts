import { SuccessResponseApi } from "@/app/+types/common";
import {
	BodyUserProfile,
	ChangePasswordUserReqBody,
	GetListRankSpointUser,
	LoginReqBody,
	RegisterReqBody,
	User,
	UserSuccessResponeApi,
} from "@/app/+types/user";
import http from "@/app/+utils/http";

export const URL_LOGIN = "user/login";
export const URL_LOGOUT = "user/logout";
export const URL_REFRESH_TOKEN = "user/refresh-token";
export const URL_REGISTER = "user/register";

const userApi = {
	login(body: LoginReqBody) {
		return http.instance.post<UserSuccessResponeApi>(URL_LOGIN, body);
	},
	register(body: RegisterReqBody) {
		return http.instance.post<UserSuccessResponeApi>(URL_REGISTER, body);
	},
	verifyEmailUser(body: { verify_code: string }) {
		return http.instance.post<{ message: string }>("user/verify-email", body);
	},
	logout(body: { refresh_token: string }) {
		return http.instance.post<{ message: string }>(URL_LOGOUT, body);
	},
	getUserDetail(id: string) {
		return http.instance.get<SuccessResponseApi<User>>(`user/detail/${id}`);
	},
	updateProfile(body: BodyUserProfile) {
		return http.instance.patch<SuccessResponseApi<User>>("user/profile", body);
	},
	getProfile() {
		return http.instance.get<SuccessResponseApi<User>>("user/me");
	},
	resetPassword(body: { forgot_password_code: string; password: string }) {
		return http.instance.post<{ message: string }>("user/reset-password", body);
	},
	getListRankSpointUser() {
		return http.instance.get<SuccessResponseApi<GetListRankSpointUser>>(
			"user/list-rank"
		);
	},
	uploadAvatar(body: FormData) {
		return http.instance.post<
			SuccessResponseApi<{
				url: string;
				filename: string;
				type: "image" | "video" | "file";
			}>
		>("user/upload-avatar", body, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
	changePasswordUser(body: ChangePasswordUserReqBody) {
		return http.instance.put<{ message: string }>("user/change-password", body);
	},
	forgotPassword(body: { email: string }) {
		return http.instance.post<{ message: string }>(
			"user/forgot-password",
			body
		);
	},
};

export default userApi;
