import { SuccessResponseApi } from "@/app/+types/common";
import { UpdateStepReqBody } from "@/app/+types/step";
import http from "@/app/+utils/http";

const stepApi = {
	updateStep(body: UpdateStepReqBody) {
		return http.instance.put<SuccessResponseApi<{ totalSpoint: number }>>(
			"/step/update",
			body
		);
	},
};

export default stepApi;
