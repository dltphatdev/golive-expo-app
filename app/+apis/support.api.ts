import { CreateSupportReqBody } from "@/app/+types/support";
import http from "@/app/+utils/http";

const supportApi = {
	create(body: CreateSupportReqBody) {
		return http.instance.post<{ message: string }>("/support", body);
	},
};

export default supportApi;
