import * as yup from "yup";

export const loginSchema = yup.object({
	email: yup
		.string()
		.email("Email không hợp lệ")
		.required("Vui lòng nhập email"),
	password: yup
		.string()
		.min(6, "Mật khẩu tối thiểu 6 ký tự")
		.max(160, "Mật khẩu tối đa 160 ký tự")
		.required("Vui lòng nhập mật khẩu"),
});

export const registerSchema = yup.object({
	fullname: yup
		.string()
		.required("Vui lòng nhập họ tên")
		.min(2, "Họ tên tối thiểu 6 ký tự")
		.max(160, "Họ tên tối đa 160 ký tự"),
	email: yup
		.string()
		.email("Email không hợp lệ")
		.required("Vui lòng nhập email"),
	password: yup
		.string()
		.min(6, "Mật khẩu tối thiểu 6 ký tự")
		.max(160, "Mật khẩu tối đa 160 ký tự")
		.required("Vui lòng nhập mật khẩu"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("password")], "Mật khẩu không khớp")
		.required("Vui lòng xác nhận mật khẩu"),
	date_of_birth: yup.date().max(new Date(), "Ngày tháng năm sinh chưa hợp lệ"),
	phone: yup.string().required().max(10, "Số điện thoại chỉ có thể 10 số"),
	gender: yup
		.string()
		.oneOf(["Male", "Female"], "Giới tính không hợp lệ")
		.required("Vui lòng chọn giới tính"),
});

export const resetPasswordSchema = yup.object({
	forgot_password_code: yup
		.string()
		.required("Mã xác thực là bắt buộc")
		.max(6, "Mã xác thực cho phép tối đa 6 chữ số"),
	password: yup
		.string()
		.min(6, "Mật khẩu tối thiểu 6 ký tự")
		.max(160, "Mật khẩu tối đa 160 ký tự")
		.required("Vui lòng nhập mật khẩu"),
	confirm_password: yup
		.string()
		.oneOf([yup.ref("password")], "Mật khẩu không khớp")
		.required("Vui lòng xác nhận mật khẩu"),
});

export const forgotPasswordSchema = yup.object({
	email: yup
		.string()
		.email("Email không hợp lệ")
		.required("Vui lòng nhập email"),
});

export const verifyEmailSchema = yup.object({
	verify_code: yup
		.string()
		.required("Mã xác thực là bắt buộc")
		.max(6, "Mã xác thực cho phép tối đa 6 chữ số"),
});

export const updateProfileSchema = yup.object({
	avatar: yup
		.string()
		.transform((value) => (value === "" ? undefined : value))
		.max(1000, "Ảnh đại diện không vượt quá 1000 ký tự")
		.optional(),
	address: yup
		.string()
		.transform((value) => (value === "" ? undefined : value))
		.max(160, "Địa không được vượt quá 160 ký tự")
		.optional(),
	fullname: yup
		.string()
		.min(2, "Họ tên tối thiểu 6 ký tự")
		.max(160, "Họ tên tối đa 160 ký tự")
		.optional(),
	date_of_birth: yup
		.date()
		.max(new Date(), "Ngày tháng năm sinh chưa hợp lệ")
		.optional(),
	phone: yup.string().max(10, "Số điện thoại chỉ có thể 10 số").optional(),
});

export const supportSchema = yup.object({
	email: yup
		.string()
		.min(5, "Email phải có tối thiểu 5 ký tự")
		.max(160, "Email không được quá 160 ký tự")
		.email("Email không hợp lệ")
		.optional(),
	address: yup
		.string()
		.transform((value) => (value === "" ? undefined : value))
		.max(160, "Địa không được vượt quá 160 ký tự")
		.optional(),
	fullname: yup.string().max(160, "Họ tên tối đa 160 ký tự").optional(),
	phone: yup.string().max(10, "Số điện thoại chỉ có thể 10 số").optional(),
	content: yup
		.string()
		.max(2000, "Nội dung không được vượt quá 2000 ký tự")
		.optional(),
});
