import { SuccessResponseApi } from "@/app/types/common";

export type UserVerifyStatus = "Unverified" | "Verified" | "Banned";

export interface User {
	id: number;
	email: string;
	fullname?: string;
	verify: UserVerifyStatus;
	avatar?: string;
	address?: string;
	phone?: string;
	date_of_birth?: string;
	created_at?: string;
	updated_at?: string;
}

export type UserSuccessResponeApi = SuccessResponseApi<{
	access_token: string;
	refresh_token: string;
	expires_access_token: number;
	expires_refresh_token: number;
	user: User;
}>;

export type RefreshTokenReponse = SuccessResponseApi<{
	access_token: string;
	refresh_token: string;
	user: User;
}>;

export interface ChangePasswordUserReqBody {
	old_password?: string;
	password?: string;
}

export interface BodyUserProfile {
	avatar?: string;
	date_of_birth?: string;
	fullname?: string;
	phone?: string;
	address?: string;
	password?: string;
}
export interface ResetPasswordReqBody {
	id: number;
	password: string;
}
